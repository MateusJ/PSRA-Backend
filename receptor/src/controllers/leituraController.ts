import { Request, Response } from "express";
import { getPagination } from "../lib/pagination";
import {
  createLeitura as createLeituraService,
  deleteLeitura as deleteLeituraService,
  getLeituraById,
  getLeituraSerie as getLeituraSerieService,
  getLeituras as getLeiturasService,
  getLeiturasRecentes as getLeiturasRecentesService,
  updateLeitura as updateLeituraService,
} from "../services/leituraService";
import { ServiceError } from "../services/serviceError";

export async function createLeitura(req: Request, res: Response) {
  try {
    const leitura = await createLeituraService(req.body);
    return res.status(201).json(leitura);
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

export async function getLeitura(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const leitura = await getLeituraById(userId, req.params.id);
    return res.json(leitura);
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

export async function getLeituras(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const pagination = getPagination(req.query as Record<string, unknown>);
    const { data, total } = await getLeiturasService(userId, pagination);
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

export async function getLeituraSerie(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const serie = await getLeituraSerieService(
      userId,
      typeof req.query.janela === "string" ? req.query.janela : undefined,
      typeof req.query.intervalo === "string" ? req.query.intervalo : undefined,
    );
    return res.json(serie);
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

export async function getLeiturasRecentes(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const recentes = await getLeiturasRecentesService(
      userId,
      typeof req.query.limit === "string" ? req.query.limit : undefined,
    );
    return res.json(recentes);
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

export async function updateLeitura(req: Request, res: Response) {
  try {
    const leitura = await updateLeituraService(req.params.id, req.body);
    return res.json(leitura);
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

export async function deleteLeitura(req: Request, res: Response) {
  try {
    const leitura = await deleteLeituraService(req.params.id);
    return res.json(leitura);
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
