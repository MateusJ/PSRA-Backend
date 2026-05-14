import { Request, Response } from "express";
import {
  createLeitura as createLeituraService,
  deleteLeitura as deleteLeituraService,
  getLeituraById,
  getLeituras as getLeiturasService,
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
    const leitura = await getLeituraById(req.params.id);
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
    const leituras = await getLeiturasService();
    return res.json(leituras);
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
