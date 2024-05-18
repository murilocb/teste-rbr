"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import {
  fetchEmployees,
  Employee,
  deleteEmployee,
  fetchEmployeeById,
} from "../../api/employee";
import AddEmployee from "../../pages/add-employee";
import EditEmployee from "../../pages/edit-employee";

export default function EmployeeTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentEmployees, setCurrentEmployees] = useState<Employee[]>([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState<string>("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const getEmployees = async () => {
      try {
        setLoading(true);
        const data = await fetchEmployees();
        setCurrentEmployees(data);
        setLoading(false);
      } catch (error) {
        toast({ title: "Failed to fetch employees:", status: "error" });
        setLoading(false);
      }
    };
    getEmployees();
  }, [toast]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenModal = (employeeId: string) => {
    setEditingEmployeeId(employeeId);
    setIsOpenEdit(true);
  };

  const handleCloseModal = () => {
    setIsOpenEdit(false);
    setEditingEmployeeId("");
  };

  const handleEmployeeAdded = async (newEmployee: Employee) => {
    setCurrentEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    setIsOpen(false);
  };

  const handleEmployeeUpdated = async (updatedEmployeeId: string) => {
    try {
      const updatedEmployee = await fetchEmployeeById(updatedEmployeeId);
      setCurrentEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === updatedEmployeeId ? updatedEmployee : employee
        )
      );
    } catch (error) {
      toast({ title: "Failed to update employee:", status: "error" });
      console.error("Failed to update employee:", error);
    }
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      await deleteEmployee(employeeId);
      const updatedEmployees = await fetchEmployees();
      setCurrentEmployees(updatedEmployees);
    } catch (error) {
      toast({ title: "Failed to delete employee:", status: "error" });
      console.error("Failed to delete employee:", error);
    }
  };

  type SortKey = "name" | "position" | "department";

  const handleSort = (key: SortKey) => {
    let sortedData = [...currentEmployees];
    if (sortKey === key) {
      sortedData.reverse();
    } else {
      sortedData.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    }
    setCurrentEmployees(sortedData);
    setSortKey(key);
  };

  const filteredEmployees = searchTerm
    ? currentEmployees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentEmployees;

  return (
    <Box mx="auto" maxWidth="800px">
      <Box mb={4} display="flex" justifyContent="space-between">
        <Input
          placeholder="Buscar Funcionário"
          value={searchTerm}
          onChange={handleSearch}
          width="300px"
        />
        <Button colorScheme="teal" onClick={() => setIsOpen(true)}>
          Adicionar Funcionário
        </Button>
      </Box>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Button onClick={() => handleSort("name")}>Nome</Button>
              </Th>
              <Th>
                <Button onClick={() => handleSort("position")}>Cargo</Button>
              </Th>
              <Th>
                <Button onClick={() => handleSort("department")}>
                  Departamento
                </Button>
              </Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEmployees.length === 0 ? (
              <Tr>
                <Td colSpan={4}>Nenhum funcionário encontrado.</Td>
              </Tr>
            ) : (
              filteredEmployees.map((employee) => (
                <Tr key={employee._id}>
                  <Td>{employee.name}</Td>
                  <Td>{employee.position}</Td>
                  <Td>{employee.department}</Td>
                  <Td>
                    <Button
                      mr={2}
                      colorScheme="blue"
                      onClick={() => handleOpenModal(employee._id)}
                    >
                      Editar
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeleteEmployee(employee._id)}
                    >
                      Excluir
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      )}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center" alignItems="center">
            <AddEmployee
              onClose={() => setIsOpen(false)}
              onEmployeeAdded={handleEmployeeAdded}
            />
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" mr={5} onClick={() => setIsOpen(false)}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenEdit} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <EditEmployee
              employeeId={editingEmployeeId}
              onClose={handleCloseModal}
              onEmployeeUpdated={handleEmployeeUpdated}
            />
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" mr={5} onClick={handleCloseModal}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
