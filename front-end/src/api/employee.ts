export type Employee = {
  _id: string;
  name: string;
  position: string;
  department: string;
  admissionDate: string;
};

const API_URL = process.env.API_URL as string;

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return response.json();
};

export const fetchEmployeeById = async (id: string): Promise<Employee> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch employee");
  }
  return response.json();
};

export const addEmployee = async (
  employee: Omit<Employee, "_id">
): Promise<Employee> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error("Failed to add employee");
  }
  return response.json();
};

export const updateEmployee = async (
  id: string,
  employee: Employee
): Promise<Employee> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error("Failed to update employee");
  }
  return response.json();
};

export const deleteEmployee = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
};
