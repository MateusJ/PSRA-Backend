import { Request, Response } from "express";
import { getPagination } from "../lib/pagination";
import {
  createPropriedade as createPropriedadeService,
  deletePropriedade as deletePropriedadeService,
  getPropriedadeById,
  getPropriedades as getPropriedadesService,
  updatePropriedade as updatePropriedadeService,
} from "../services/propriedadeService";
import { ServiceError } from "../services/serviceError";

export async function createPropriedade(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const propriedade = await createPropriedadeService(userId, req.body);
    return res.status(201).json(propriedade);
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

export async function getPropriedade(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const propriedade = await getPropriedadeById(userId, req.params.id);
    return res.json(propriedade);
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

export async function getPropriedades(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const pagination = getPagination(req.query as Record<string, unknown>);
    const { data, total } = await getPropriedadesService(userId, pagination);
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

export async function updatePropriedade(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const propriedade = await updatePropriedadeService(
      userId,
      req.params.id,
      req.body,
    );
    return res.json(propriedade);
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

export async function deletePropriedade(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const propriedade = await deletePropriedadeService(userId, req.params.id);
    return res.json(propriedade);
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
