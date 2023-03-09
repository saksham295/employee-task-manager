import { Router } from "express";
import {
  createTask,
  deleteTask,
  readTasks,
  updateTask,
} from "../controllers/task.js";
const router = Router();

router.post("/create", createTask);
router.get("/read", readTasks);
router.put("/update", updateTask);
router.delete("/delete", deleteTask);

export default router;
