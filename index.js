import express from "express";
const app = express();

app.use(express.json());

import employeeRoutes from "./routes/employee.js";
import taskRoutes from "./routes/task.js";

app.use("/employee", employeeRoutes);
app.use("/task", taskRoutes);

const port = 4000;
app.listen(port, () => console.log("Server listening on port " + port));
