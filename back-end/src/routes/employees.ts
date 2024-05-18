import express, { Router, Request, Response } from "express";
import EmployeeController from "../controllers/employee.Controller";

const router: Router = express.Router();

router.get("/employees", (req: Request, res: Response) => {
  EmployeeController.getAll(req, res);
});

router.get("/employees/:id", (req: Request, res: Response) => {
  EmployeeController.getById(req, res);
});

router.post("/employees", (req: Request, res: Response) => {
  EmployeeController.create(req, res);
});

router.put("/employees/:id", (req: Request, res: Response) => {
  EmployeeController.update(req, res);
});

router.delete("/employees/:id", (req: Request, res: Response) => {
  EmployeeController.delete(req, res);
});

export default router;
