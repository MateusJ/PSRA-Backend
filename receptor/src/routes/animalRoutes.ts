import { Router } from "express";
import {
  createAnimal,
  deleteAnimal,
  getAnimal,
  getAnimais,
  updateAnimal,
} from "../controllers/animalController";

const animalRouter = Router();

animalRouter.post("/", createAnimal);
animalRouter.get("/", getAnimais);
animalRouter.get("/:id", getAnimal);
animalRouter.put("/:id", updateAnimal);
animalRouter.delete("/:id", deleteAnimal);

export { animalRouter };
