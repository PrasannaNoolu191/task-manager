import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import path from "path";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "..", "images")));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.get("/", (_req, res) => {
  res.send("API is running...");
});

export default app;
// in package.json
// "scripts": {
//   "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
// },
