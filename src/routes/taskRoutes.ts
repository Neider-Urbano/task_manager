import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import { validateTask } from "../middlewares/validation";
import { asyncHandler } from "../middlewares/asyncHandler";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task with title, description, and completed status.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       400:
 *         description: Invalid request data.
 */
router.post("/tasks", authenticate, validateTask, asyncHandler(createTask));

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Returns a list of tasks, with an option to filter by completed or pending status.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: completed
 *         in: query
 *         description: Filter tasks by completed status (true or false)
 *         required: false
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: A list of tasks.
 *       400:
 *         description: Invalid query parameter.
 */
router.get("/tasks", authenticate, asyncHandler(getTasks));

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     description: Fetch a single task by its unique ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the task to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task details.
 *       404:
 *         description: Task not found.
 */
router.get("/tasks/:id", authenticate, asyncHandler(getTaskById));

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update the title, description, or completed status of an existing task.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the task to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Invalid request data.
 *       404:
 *         description: Task not found.
 */
router.put("/tasks/:id", authenticate, validateTask, asyncHandler(updateTask));

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task by its ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the task to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       404:
 *         description: Task not found.
 */
router.delete("/tasks/:id", authenticate, asyncHandler(deleteTask));

export default router;
