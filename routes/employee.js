import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  readEmployees,
  updateEmployee,
} from "../controllers/employee.js";
const router = Router();

router.post("/create", createEmployee);
router.get("/read", readEmployees);
router.put("/update", updateEmployee);
router.delete("/delete", deleteEmployee);

export default router;
