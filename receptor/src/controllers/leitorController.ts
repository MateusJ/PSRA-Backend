import { Request, Response } from "express";
import {
  createLeitor as createLeitorService,
  deleteLeitor as deleteLeitorService,
  getLeitorById,
  getLeitores as getLeitoresService,
  updateLeitor as updateLeitorService,
} from "../services/leitorService";
import { ServiceError } from "../services/serviceError";

export async function createLeitor(req: Request, res: Response) {
  try {
    const leitor = await createLeitorService(req.body);
    return res.status(201).json(leitor);
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

export async function getLeitor(req: Request, res: Response) {
  try {
    const leitor = await getLeitorById(req.params.id);
    return res.json(leitor);
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

export async function getLeitores(req: Request, res: Response) {
  try {
    const leitores = await getLeitoresService();
    return res.json(leitores);
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

export async function updateLeitor(req: Request, res: Response) {
  try {
    const leitor = await updateLeitorService(req.params.id, req.body);
    return res.json(leitor);
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

export async function deleteLeitor(req: Request, res: Response) {
  try {
    const leitor = await deleteLeitorService(req.params.id);
    return res.json(leitor);
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
