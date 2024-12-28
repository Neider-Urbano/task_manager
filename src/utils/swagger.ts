import swaggerJSDoc from "swagger-jsdoc";
const PORT = process.env.PORT ?? 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description:
        "API for managing tasks, including create, read, update, and delete operations.",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
      },
    ],
  },
  apis: ["./src/routes/taskRoutes.ts", "./src/routes/authRoutes.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
