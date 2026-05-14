import { Router } from "express";
import {
  createSaude,
  deleteSaude,
  getSaude,
  getSaudes,
  updateSaude,
} from "../controllers/saudeController";

const saudeRouter = Router();

saudeRouter.post("/", createSaude);
saudeRouter.get("/", getSaudes);
saudeRouter.get("/:id", getSaude);
saudeRouter.put("/:id", updateSaude);
saudeRouter.delete("/:id", deleteSaude);

export { saudeRouter };
