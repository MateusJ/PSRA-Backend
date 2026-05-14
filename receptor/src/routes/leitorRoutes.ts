import { Router } from "express";
import {
  createLeitor,
  deleteLeitor,
  getLeitor,
  getLeitores,
  updateLeitor,
} from "../controllers/leitorController";

const leitorRouter = Router();

leitorRouter.post("/", createLeitor);
leitorRouter.get("/", getLeitores);
leitorRouter.get("/:id", getLeitor);
leitorRouter.put("/:id", updateLeitor);
leitorRouter.delete("/:id", deleteLeitor);

export { leitorRouter };
