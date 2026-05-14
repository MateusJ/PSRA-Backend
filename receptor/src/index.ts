import "dotenv/config";
import express from "express";
import { initMqtt } from "./mqtt/handler";
import { userRouter } from "./routes/userRoutes";
import { prisma } from "./lib/prisma";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/usuarios", userRouter);

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
