import { Router } from "express";
// import BoletoController from "../controllers/boletoController.js";

const router = Router();

router.get("/", BoletoController.listar);
router.get("/:id", BoletoController.buscarPorId);
router.post("/", BoletoController.criar);
router.put("/:id", BoletoController.atualizar);
router.delete("/:id", BoletoController.deletar);

export default router;
