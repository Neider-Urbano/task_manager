import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password123") {
    const token = generateToken("adminUserId");
    return res.status(200).json({ token });
  }

  return res.status(401).json({ error: "Invalid username or password" });
};
