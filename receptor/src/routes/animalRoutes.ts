import { Router } from "express";
import {
  createAnimal,
  deleteAnimal,
  getAnimal,
  getAnimalRastreabilidade,
  getAnimalRota,
  getAnimais,
  getAnimaisAtivos,
  updateAnimal,
} from "../controllers/animalController";

const animalRouter = Router();

animalRouter.post("/", createAnimal);
animalRouter.get("/ativos", getAnimaisAtivos);
animalRouter.get("/", getAnimais);
animalRouter.get("/:id/rastreabilidade", getAnimalRastreabilidade);
animalRouter.get("/:id/rota", getAnimalRota);
animalRouter.get("/:id", getAnimal);
animalRouter.put("/:id", updateAnimal);
animalRouter.delete("/:id", deleteAnimal);

export { animalRouter };
