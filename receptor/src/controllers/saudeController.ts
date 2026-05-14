import { Request, Response } from "express";
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
    const saude = await getSaudeById(req.params.id);
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
    const saudes = await getSaudesService();
    return res.json(saudes);
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
