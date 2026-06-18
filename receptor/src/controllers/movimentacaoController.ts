import { Request, Response } from "express";
import { getPagination } from "../lib/pagination";
import {
  createMovimentacao as createMovimentacaoService,
  deleteMovimentacao as deleteMovimentacaoService,
  getMovimentacaoById,
  getMovimentacoes as getMovimentacoesService,
  getMovimentacoesPendentesTotal as getMovimentacoesPendentesTotalService,
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
    const userId = (req as Request & { userId?: string }).userId;
    const movimentacao = await getMovimentacaoById(userId, req.params.id);
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
    const userId = (req as Request & { userId?: string }).userId;
    const pagination = getPagination(req.query as Record<string, unknown>);
    const { data, total } = await getMovimentacoesService(userId, pagination);
    return res.json({
      data,
      page: pagination.page,
      pageSize: pagination.pageSize,
      total,
    });
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

export async function getMovimentacoesPendentes(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const total = await getMovimentacoesPendentesTotalService(userId);
    return res.json({ total });
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
