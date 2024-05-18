import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { fetchEmployeeById, updateEmployee, Employee } from "../api/employee";

export default function EditEmployee({
  employeeId,
  onClose,
  onEmployeeUpdated,
}: any) {
  const [formData, setFormData] = useState<Employee | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const employee = await fetchEmployeeById(employeeId);
      setFormData(employee);
    };
    fetchData();
  }, [employeeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      await updateEmployee(formData._id, formData);
      toast({ title: "Funcionário atualizado", status: "success" });
      onEmployeeUpdated(formData._id);
      onClose();
    } catch (error) {
      toast({ title: "Erro ao atualizar funcionário", status: "error" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box p={8}>
      <Heading mb={8}>Editar Funcionário</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb={4} isRequired>
          <FormLabel>Nome</FormLabel>
          <Input
            name="name"
            value={formData?.name || ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="role" mb={4} isRequired>
          <FormLabel>Cargo</FormLabel>
          <Input
            name="position"
            value={formData?.position || ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="department" mb={4} isRequired>
          <FormLabel>Departamento</FormLabel>
          <Input
            name="department"
            value={formData?.department || ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="startDate" mb={4} isRequired>
          <FormLabel>Data de Admissão</FormLabel>
          <Input
            name="admissionDate"
            value={
              formData?.admissionDate ? formatDate(formData.admissionDate) : ""
            }
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          Atualizar
        </Button>
      </form>
    </Box>
  );
}
