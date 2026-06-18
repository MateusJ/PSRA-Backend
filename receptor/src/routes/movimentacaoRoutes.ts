import { Router } from "express";
import {
  createMovimentacao,
  deleteMovimentacao,
  getMovimentacao,
  getMovimentacoes,
  getMovimentacoesPendentes,
  updateMovimentacao,
} from "../controllers/movimentacaoController";

const movimentacaoRouter = Router();

movimentacaoRouter.post("/", createMovimentacao);
movimentacaoRouter.get("/pendentes", getMovimentacoesPendentes);
movimentacaoRouter.get("/", getMovimentacoes);
movimentacaoRouter.get("/:id", getMovimentacao);
movimentacaoRouter.put("/:id", updateMovimentacao);
movimentacaoRouter.delete("/:id", deleteMovimentacao);

export { movimentacaoRouter };
