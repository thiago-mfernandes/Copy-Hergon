import { Breadcrumb } from "@/components/Breadcrumb";
import { HamburguerMenu } from "@/components/HamburguerMenu";
import { Sidebar } from "@/components/Sidebar";
import { useWideVersion } from "@/hooks/useWideVersion";
import { Flex, Text } from "@chakra-ui/react";

export function RegisterCompany() {

  const { isWideVersion } = useWideVersion();

  return (
    <>
      {
        isWideVersion && <HamburguerMenu />
      }
      <Flex direction="row" height="100vh">
        <Sidebar />
        <Breadcrumb />
        <Text>Pagina Formulário de Cadastro de Empresas</Text>
      </Flex>
    </>
  )
}