import { Router } from "express";
import Task from "../database/models/TaskModel";

const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).send(tasks);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .post(async (req, res) => {
    const task = req.body;
    if (!task || !task.title)
      return res.status(400).send("Task title is required.");
    try {
      const createdTask = await Task.create(task);
      res.status(201).send(createdTask);
    } catch (error) {
      res.status(500).send(error);
    }
  });

router
  .route("/:id")
  .put(async (req, res) => {
    const taskId = req.params.id;
    if (!req.body) return res.status(400).send("Empty request body.");
    const { title, description } = req.body;

    try {
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { title, description },
        { new: true }
      );
      if (!updatedTask) return res.status(404).send("Task not found");
      res.status(202).send(updatedTask);
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .delete(async (req, res) => {
    const taskId = req.params.id;
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) return res.status(404).send("Task not found");
      res.status(200).send(deletedTask);
    } catch (error) {
      res.status(500).send(error);
    }
  });

router.patch("/:id/complete", async (req, res) => {
  const taskId = req.params.id;
  const completed =
    typeof req.body.completed === "boolean" ? req.body.completed : true;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed },
      { new: true }
    );
    if (!updatedTask) return res.status(404).send("Task not found");
    res.status(202).send(updatedTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
