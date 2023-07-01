import { SelectedRows } from "@/components/SelectedRows";
import { InputSearchPlaceholderDinamicText } from "@/utils/InputSearchPlaceholderDinamicText";
import { Flex, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";

interface TableControllersProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setItemPerPage: Dispatch<SetStateAction<number>>;
}

export function TableControllers({ 
  search, 
  setSearch, 
  setItemPerPage 
} : TableControllersProps) {

  const { pathname } = useLocation();

  return (
    <Flex 
      gridColumn="1/3"  
      flexDirection={{ base: "column", lg: "row"}}
      alignItems="flex-start" 
      justifyContent="space-between"
      marginTop="6"
      padding="0 24px 24px"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="gray.50"
    >
      <Input
        //disabled
        variant="outline"
        size="md"
        name="search"
        id="search"
        type="text"
        placeholder={InputSearchPlaceholderDinamicText(String(pathname))}
        value={search} //for state of Search
        onChange={(e) => setSearch(e.target.value)} //to change State of search
        gridColumn="1/3"
        backgroundColor="transparent"
        marginBottom={{ base: "4", lg: "0" }}
      />
      <SelectedRows setItemPerPage={setItemPerPage} />
    </Flex>
  );
}