import { Request, Response } from "express";
import EmployeeService from "../services/employee.Service";
import { IEmployee } from "../models/employee";

class EmployeeController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const employees = await EmployeeService.getAllEmployees();
      return res.status(200).json(employees);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const employee = await EmployeeService.getEmployeeById(req.params.id);
      if (!employee) {
        return res.status(404).send("Funcionário não encontrado");
      }
      return res.status(200).json(employee);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const employeeData: IEmployee = req.body;
      const newEmployee = await EmployeeService.createEmployee(employeeData);
      return res.status(201).json(newEmployee);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedEmployee = await EmployeeService.updateEmployee(
        req.params.id,
        req.body
      );
      if (!updatedEmployee) {
        return res.status(404).send("Funcionário não encontrado");
      }
      return res.status(200).json(updatedEmployee);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deletedEmployee = await EmployeeService.deleteEmployee(
        req.params.id
      );
      if (!deletedEmployee) {
        return res.status(404).send("Funcionário não encontrado");
      }
      return res.status(200).send("Funcionário excluído com sucesso");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}

export default EmployeeController;
