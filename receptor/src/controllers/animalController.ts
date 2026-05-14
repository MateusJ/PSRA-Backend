import { Request, Response } from "express";
import {
  createAnimal as createAnimalService,
  deleteAnimal as deleteAnimalService,
  getAnimalById,
  getAnimais as getAnimaisService,
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
    const animal = await getAnimalById(req.params.id);
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

export async function getAnimais(req: Request, res: Response) {
  try {
    const animais = await getAnimaisService();
    return res.json(animais);
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
