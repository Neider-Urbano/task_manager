import { Router } from "express";
import { login } from "../controllers/authController";
import { asyncHandler } from "./../middlewares/asyncHandler";

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to the application
 *     description: Authenticates the user and generates a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login, returns the JWT token.
 *       401:
 *         description: Invalid credentials.
 */
router.post("/login", asyncHandler(login));

export default router;
