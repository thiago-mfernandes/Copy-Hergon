import { Dispatch, SetStateAction } from "react";
import { Flex, Text, Select } from "@chakra-ui/react";

interface SelectedRowsProps {
  setItemPerPage: Dispatch<SetStateAction<number>>
}

export function SelectedRows({ setItemPerPage }: SelectedRowsProps) {
  return (
    <Flex
      alignItems="center"
      justifyContent={{ base: "flex-start", lg: "flex-end"}}
      width="100%"
    >
      <Text
        fontWeight="600"
        color="gray.600"
        fontSize="0.75rem"
      >
        Exibir
      </Text>
      <Select 
        width="80px"
        margin="0 8px"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setItemPerPage(Number(e.target.value))}
      >
        <option value={5}>05</option>
        <option value={10} defaultValue={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </Select>
      <Text
        fontWeight="600"
        color="gray.600"
        fontSize="0.75rem"
      >
        resultados por página.
      </Text>
    </Flex>
  )
}