import { Router } from "express";
import {
  createLeitura,
  deleteLeitura,
  getLeitura,
  getLeituraSerie,
  getLeituras,
  getLeiturasRecentes,
  updateLeitura,
} from "../controllers/leituraController";

const leituraRouter = Router();

leituraRouter.post("/", createLeitura);
leituraRouter.get("/serie", getLeituraSerie);
leituraRouter.get("/recentes", getLeiturasRecentes);
leituraRouter.get("/", getLeituras);
leituraRouter.get("/:id", getLeitura);
leituraRouter.put("/:id", updateLeitura);
leituraRouter.delete("/:id", deleteLeitura);

export { leituraRouter };
