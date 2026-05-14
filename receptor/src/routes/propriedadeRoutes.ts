import { Router } from "express";
import {
  createPropriedade,
  deletePropriedade,
  getPropriedade,
  getPropriedades,
  updatePropriedade,
} from "../controllers/propriedadeController";

const propriedadeRouter = Router();

propriedadeRouter.post("/", createPropriedade);
propriedadeRouter.get("/", getPropriedades);
propriedadeRouter.get("/:id", getPropriedade);
propriedadeRouter.put("/:id", updatePropriedade);
propriedadeRouter.delete("/:id", deletePropriedade);

export { propriedadeRouter };
