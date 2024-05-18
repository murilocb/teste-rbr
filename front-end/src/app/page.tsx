import { Box, Heading } from "@chakra-ui/react";
import EmployeeTable from "../app/components/EmployeeTable";

export default function Home() {
  return (
    <Box p={8}>
      <Heading mb={8} textAlign="center">
        Dashboard de Funcionários
      </Heading>
      <EmployeeTable />
    </Box>
  );
}
