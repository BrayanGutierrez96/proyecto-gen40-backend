import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
  try {
    const token = req.headers["authorization"].slice(7);
    if (token == "" || token == undefined) {
      res.status(401).json({ mensaje: "No autorizado" });
    }
    jwt.verify(token, process.env.SECRET_KEY_TOKEN, (error, decoded) => {
      if (error) return res.status(401).json({ mensaje: "No autorizado" });
      next();
    });
  } catch (error) {
    res.status(401).json({ mensaje: "No autorizado" });
  }
};
