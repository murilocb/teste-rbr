import Employee, { IEmployee } from "../models/employee";

class EmployeeRepository {
  public async findAll(): Promise<IEmployee[]> {
    return await Employee.find();
  }

  public async findById(id: string): Promise<IEmployee | null> {
    return await Employee.findById(id);
  }

  public async create(employee: IEmployee): Promise<IEmployee> {
    return await Employee.create(employee);
  }

  public async updateById(
    id: string,
    employee: Partial<IEmployee>
  ): Promise<IEmployee | null> {
    return await Employee.findByIdAndUpdate(id, employee, {
      new: true,
      runValidators: true,
    });
  }

  public async deleteById(id: string): Promise<IEmployee | null> {
    return await Employee.findByIdAndDelete(id);
  }
}

export default new EmployeeRepository();
