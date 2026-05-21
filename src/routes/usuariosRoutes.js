import { Router } from "express";
import {
  criarUsuario,
  loginUsuario,
} from "../controllers/usuarioController.js";

const router = Router();

router.post("/registro", criarUsuario);
router.post("/login", loginUsuario);

export default router;
