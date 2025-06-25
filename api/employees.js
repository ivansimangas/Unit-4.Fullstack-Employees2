import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees.js";

const router = express.Router();

function isPositiveInteger(value) {
  return /^\d+$/.test(value);
}

// GET /employees - get all employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

// POST /employees - create new employee
router.post("/", async (req, res, next) => {
  try {
    const { name, birthday, salary } = req.body;
    if (!req.body || !name || !birthday || salary == null) {
      return res.status(400).send("Missing required fields");
    }
    const newEmployee = await createEmployee({ name, birthday, salary });
    res.status(201).json(newEmployee);
  } catch (err) {
    next(err);
  }
});

// GET /employees/:id - get employee by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isPositiveInteger(id)) {
      return res.status(400).send("Invalid ID");
    }
    const employee = await getEmployee(Number(id));
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

// DELETE /employees/:id - delete employee by id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isPositiveInteger(id)) {
      return res.status(400).send("Invalid ID");
    }
    const deleted = await deleteEmployee(Number(id));
    if (!deleted) {
      return res.status(404).send("Employee not found");
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// PUT /employees/:id - update employee by id
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!req.body) {
      return res.status(400).send("Missing request body");
    }
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || salary == null) {
      return res.status(400).send("Missing required fields");
    }
    if (!isPositiveInteger(id)) {
      return res.status(400).send("Invalid ID");
    }
    const updated = await updateEmployee({
      id: Number(id),
      name,
      birthday,
      salary,
    });
    if (!updated) {
      return res.status(404).send("Employee not found");
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;
