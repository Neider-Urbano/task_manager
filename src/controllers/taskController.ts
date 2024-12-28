import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Task from "../models/Task";
import { ITask } from "../interfaces/Task";

export const createTask = async (
  req: Request,
  res: Response
): Promise<Response<ITask>> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { title, description, completed } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      completed,
    });

    await newTask.save();
    return res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

export const getTasks = async (
  req: Request,
  res: Response
): Promise<Response<ITask[]>> => {
  try {
    const { completed } = req.query;

    const query = completed ? { completed: completed === "true" } : {};
    const tasks = await Task.find(query);

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

export const getTaskById = async (
  req: Request,
  res: Response
): Promise<Response<ITask>> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<Response<ITask>> => {
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<Response<ITask>> => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};
