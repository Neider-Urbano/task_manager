import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateTask = [
  check("title").notEmpty().withMessage("Title is required"),
  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  check("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
