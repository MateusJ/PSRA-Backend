import { Request, Response } from "express";
import {
  createMovimentacao as createMovimentacaoService,
  deleteMovimentacao as deleteMovimentacaoService,
  getMovimentacaoById,
  getMovimentacoes as getMovimentacoesService,
  updateMovimentacao as updateMovimentacaoService,
} from "../services/movimentacaoService";
import { ServiceError } from "../services/serviceError";

export async function createMovimentacao(req: Request, res: Response) {
  try {
    const movimentacao = await createMovimentacaoService(req.body);
    return res.status(201).json(movimentacao);
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(error.status).json({
        message: error.message,
        errors: error.details,
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMovimentacao(req: Request, res: Response) {
  try {
    const movimentacao = await getMovimentacaoById(req.params.id);
    return res.json(movimentacao);
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(error.status).json({
        message: error.message,
        errors: error.details,
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMovimentacoes(req: Request, res: Response) {
  try {
    const movimentacoes = await getMovimentacoesService();
    return res.json(movimentacoes);
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(error.status).json({
        message: error.message,
        errors: error.details,
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateMovimentacao(req: Request, res: Response) {
  try {
    const movimentacao = await updateMovimentacaoService(
      req.params.id,
      req.body,
    );
    return res.json(movimentacao);
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(error.status).json({
        message: error.message,
        errors: error.details,
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteMovimentacao(req: Request, res: Response) {
  try {
    const movimentacao = await deleteMovimentacaoService(req.params.id);
    return res.json(movimentacao);
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(error.status).json({
        message: error.message,
        errors: error.details,
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
