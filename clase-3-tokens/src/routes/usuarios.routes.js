import { Router } from "express";
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.get("/usuarios", obtenerUsuarios);
router.get("/usuarios/:id", obtenerUsuario);
router.post("/usuarios", crearUsuario);
router.put("/usuarios/:id", actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);
router.post("/login", loginUsuario);

export default router;
