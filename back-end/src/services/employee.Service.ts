import EmployeeRepository from "../repository/employee.Repository";
import { IEmployee } from "../models/employee";

class EmployeeService {
  public async getAllEmployees(): Promise<IEmployee[]> {
    return await EmployeeRepository.findAll();
  }

  public async getEmployeeById(id: string): Promise<IEmployee | null> {
    return await EmployeeRepository.findById(id);
  }

  public async createEmployee(employeeData: IEmployee): Promise<IEmployee> {
    return await EmployeeRepository.create(employeeData);
  }

  public async updateEmployee(
    id: string,
    employeeData: Partial<IEmployee>
  ): Promise<IEmployee | null> {
    return await EmployeeRepository.updateById(id, employeeData);
  }

  public async deleteEmployee(id: string): Promise<IEmployee | null> {
    return await EmployeeRepository.deleteById(id);
  }
}

export default new EmployeeService();
