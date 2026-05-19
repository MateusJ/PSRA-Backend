import { Request, Response } from "express";
import { getPagination } from "../lib/pagination";
import {
  createSaude as createSaudeService,
  deleteSaude as deleteSaudeService,
  getSaudeById,
  getSaudes as getSaudesService,
  updateSaude as updateSaudeService,
} from "../services/saudeService";
import { ServiceError } from "../services/serviceError";

export async function createSaude(req: Request, res: Response) {
  try {
    const saude = await createSaudeService(req.body);
    return res.status(201).json(saude);
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

export async function getSaude(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const saude = await getSaudeById(userId, req.params.id);
    return res.json(saude);
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

export async function getSaudes(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const pagination = getPagination(req.query as Record<string, unknown>);
    const { data, total } = await getSaudesService(userId, pagination);
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

export async function updateSaude(req: Request, res: Response) {
  try {
    const saude = await updateSaudeService(req.params.id, req.body);
    return res.json(saude);
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

export async function deleteSaude(req: Request, res: Response) {
  try {
    const saude = await deleteSaudeService(req.params.id);
    return res.json(saude);
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
