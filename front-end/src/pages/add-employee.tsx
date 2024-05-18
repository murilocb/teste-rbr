import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { addEmployee, Employee } from "../api/employee";

interface AddEmployeeProps {
  onClose: () => void;
  onEmployeeAdded: (newEmployee: Employee) => void;
}

export default function AddEmployee({
  onClose,
  onEmployeeAdded,
}: AddEmployeeProps) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEmployee = await addEmployee({
        name,
        position,
        department,
        admissionDate,
      });
      toast({ title: "Funcionário adicionado", status: "success" });
      onEmployeeAdded(newEmployee);
      onClose();
    } catch (error) {
      toast({ title: "Erro ao adicionar funcionário", status: "error" });
    }
  };

  return (
    <Box
      p={8}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Heading mb={8}>Adicionar Funcionário</Heading>
      <VStack
        as="form"
        onSubmit={handleSubmit}
        spacing={4}
        width="100%"
        maxW="md"
      >
        <FormControl id="name" isRequired>
          <FormLabel>Nome</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl id="role" isRequired>
          <FormLabel>Cargo</FormLabel>
          <Input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </FormControl>
        <FormControl id="department" isRequired>
          <FormLabel>Departamento</FormLabel>
          <Input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </FormControl>
        <FormControl id="startDate" isRequired>
          <FormLabel>Data de Admissão</FormLabel>
          <Input
            type="date"
            value={admissionDate}
            onChange={(e) => setAdmissionDate(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          Adicionar
        </Button>
      </VStack>
    </Box>
  );
}
