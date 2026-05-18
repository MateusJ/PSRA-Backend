import "dotenv/config";
import cors from "cors";
import express from "express";
import { initMqtt } from "./mqtt/handler";
import { userRouter } from "./routes/userRoutes";
import { animalRouter } from "./routes/animalRoutes";
import { leitorRouter } from "./routes/leitorRoutes";
import { leituraRouter } from "./routes/leituraRoutes";
import { movimentacaoRouter } from "./routes/movimentacaoRoutes";
import { propriedadeRouter } from "./routes/propriedadeRoutes";
import { saudeRouter } from "./routes/saudeRoutes";
import { prisma } from "./lib/prisma";
import { authMiddleware } from "./middleware/auth";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/usuario", userRouter);
app.use("/propriedade", authMiddleware, propriedadeRouter);
app.use("/leitor", authMiddleware, leitorRouter);
app.use("/animal", authMiddleware, animalRouter);
app.use("/leitura", authMiddleware, leituraRouter);
app.use("/saude", authMiddleware, saudeRouter);
app.use("/movimentacao", authMiddleware, movimentacaoRouter);

async function testPrisma(): Promise<void> {
  try {
    const count = await prisma.usuario.count();
    console.log(`Prisma test: usuario count = ${count}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Prisma test failed:", message);
  }
}

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
  testPrisma();
});

initMqtt();
