import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { getAccessToken } from "../libs/accessToken.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({ mensaje: "No hay usuarios" });
    res.json({ mensaje: "Usuarios encontrados", users });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: passwordHash });
    const newUser = await user.save();
    if (!newUser)
      return res.status(400).json({ mensaje: "Error al crear el usuario" });
  
    const token = await getAccessToken(newUser._id);
    res.set("Authorization", `Bearer ${token}`);

    res.json({ mensaje: "Usuario creado correctamente", user: newUser });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(404).json({ mensaje: "email o password incorrecto" });
    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch)
      return res.status(404).json({ mensaje: "email o password incorrecto" });
      
    const token = await getAccessToken(userFound._id);
    res.set("Authorization", `Bearer ${token}`);

    res.status(200).json({ mensaje: "Usuario autenticado", user: userFound });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "");
    res.status(200).json({ mensaje: "Usuario desconectado" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
