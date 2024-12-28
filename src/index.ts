import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import swaggerUi from "swagger-ui-express";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import { swaggerSpec } from "./utils/swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use("/api", taskRoutes);
app.use("/api", authRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
