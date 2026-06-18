import { Request, Response } from "express";
import { getPagination } from "../lib/pagination";
import {
  createAnimal as createAnimalService,
  deleteAnimal as deleteAnimalService,
  getAnimalById,
  getAnimalRastreabilidade as getAnimalRastreabilidadeService,
  getAnimalRota as getAnimalRotaService,
  getAnimais as getAnimaisService,
  getAnimaisAtivosTotal as getAnimaisAtivosTotalService,
  updateAnimal as updateAnimalService,
} from "../services/animalService";
import { ServiceError } from "../services/serviceError";

export async function createAnimal(req: Request, res: Response) {
  try {
    const animal = await createAnimalService(req.body);
    return res.status(201).json(animal);
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

export async function getAnimal(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const animal = await getAnimalById(userId, req.params.id);
    return res.json(animal);
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

export async function getAnimaisAtivos(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const total = await getAnimaisAtivosTotalService(userId);
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

export async function getAnimalRastreabilidade(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const rastreio = await getAnimalRastreabilidadeService(
      userId,
      req.params.id,
    );
    return res.json(rastreio);
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

export async function getAnimalRota(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const rota = await getAnimalRotaService(userId, req.params.id);
    return res.json(rota);
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

export async function getAnimais(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const pagination = getPagination(req.query as Record<string, unknown>);
    const { data, total } = await getAnimaisService(userId, pagination);
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

export async function updateAnimal(req: Request, res: Response) {
  try {
    const animal = await updateAnimalService(req.params.id, req.body);
    return res.json(animal);
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

export async function deleteAnimal(req: Request, res: Response) {
  try {
    const animal = await deleteAnimalService(req.params.id);
    return res.json(animal);
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
