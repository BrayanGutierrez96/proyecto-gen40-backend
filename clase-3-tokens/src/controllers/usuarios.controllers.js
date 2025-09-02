import Usuario from "../schemas/usuario.schema.js";
import bcrypt from "bcryptjs";

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    if (!usuarios)
      return res.status(404).json({ mensaje: "No se encontraron usuarios" });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioEncontrado = await Usuario.findById(id);
    if (!usuarioEncontrado)
      return res.status(404).json({ mensaje: "No se encontro el usuario" });
    res.status(200).json(usuarioEncontrado);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, password, nombreUsuario, edad } =
      req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const usuario = {
      nombre,
      apellido,
      correo,
      password: passwordHash,
      nombreUsuario,
      edad,
    };

    const nuevoUsuario = new Usuario(usuario);
    const usuarioCreado = await nuevoUsuario.save();

    if (!usuarioCreado)
      return res.status(400).json({ mensaje: "No se pudo crear el usuario" });

    res.json(usuarioCreado);
  } catch (error) {
    console.log(error);
    if (error.code === 11000)
      return res
        .status(400)
        .json({ mensaje: "fallo al crear usuario", error: error.keyValue });
    res.status(500).json({ mensaje: error._message });
  }
};

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, password, nombreUsuario, edad } = req.body;
  const usuario = { nombre, apellido, correo, password, nombreUsuario, edad };
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, usuario);
    if (!usuarioActualizado)
      return res.status(404).json({ mensaje: "No se encontro el usuario" });
    res.status(200).json({ mensaje: "Usuario actualizado" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioElminido = await Usuario.findByIdAndDelete(id);
    if (!usuarioElminido)
      return res.status(404).json({ mensaje: "No se encontro el usuario" });
    res.status(200).json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const usuarioEncontrado = await Usuario.findOne({correo});
    if(!usuarioEncontrado)return res.status(400).json({mensaje:"Email o contraseña incorrectos"});

    const compararPassword = await bcrypt.compare( password, usuarioEncontrado.password);
    if(!compararPassword)return res.status(400).json({mensaje:"Email o contraseña incorrectos"});

    res.status(200).json({mensaje:"Usuario logueado"})
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: error.message });
  }
};
