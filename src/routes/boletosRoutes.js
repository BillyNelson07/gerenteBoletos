import { Router } from "express";
import {
  atualizarStatus,
  criar,
  carregarTodos,
  carregarPorId,
  deletar,
} from "../controllers/boletoController.js";
import { autenticarToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/:id", autenticarToken, carregarPorId);
router.get("/", autenticarToken, carregarTodos);
router.post("/", autenticarToken, criar);
router.put("/:id", autenticarToken, atualizarStatus);
router.delete("/:id", autenticarToken, deletar);

export default router;
