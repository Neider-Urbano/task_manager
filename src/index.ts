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
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Task Manager API</title>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7fc;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            flex-direction: column;
            padding: 20px;
            text-align: center;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #2b3e56;
          }
          p {
            font-size: 1.1rem;
            text-align: center;
            line-height: 1.6;
            max-width: 600px;
            margin-bottom: 30px;
            color: #555;
          }
          .btn {
            display: inline-block;
            padding: 12px 25px;
            font-size: 1rem;
            color: #fff;
            background-color: #007bff;
            border: none;
            border-radius: 8px;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s ease;
          }
          .btn:hover {
            background-color: #0056b3;
          }
          footer {
            position: absolute;
            bottom: 20px;
            font-size: 0.9rem;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div>
          <h1>Task Manager API</h1>
          <p>
            Task Manager es una aplicación de gestión de tareas que permite a los usuarios crear, leer,
            actualizar y eliminar tareas. Los usuarios también pueden marcar las tareas como completadas o
            pendientes, todo a través de una interfaz intuitiva y moderna.
          </p>
          <p>
            Explora la documentación de la API para obtener más detalles sobre cómo interactuar con ella.
          </p>
          <a href="/api-docs" class="btn">Ir a la documentación de la API</a>
        </div>
        <footer>
          <p>&copy; 2024 Task Manager. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  `);
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
