import { Link, Icon, HTMLChakraProps } from "@chakra-ui/react";
import { MdDownload } from "react-icons/md";

export function DownloadModelo({ ...rest }: HTMLChakraProps<"a">) {
  return (
    <Link
      textColor="white" 
      backgroundColor="green.500"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      borderRadius="md"
      width={{ base: "100%", lg: "unset" }}
      px="4"
      py={{ base:"4", lg: "2"}}
      boxShadow="xl"
      marginLeft={{ lg: "2"}}
      fontWeight="semibold"
      _hover={{ opacity: "0.8" }}
      href="src/assets/uploadshergon.xlsx"
      download 
      {...rest}
    >
      <Icon as={MdDownload} fontSize="16" marginRight="2" />
      Modelo
    </Link>
  );
}