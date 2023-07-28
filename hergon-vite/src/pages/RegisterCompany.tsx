import { Breadcrumb } from "@/components/Breadcrumb";
import { HamburguerMenu } from "@/components/HamburguerMenu";
import { PageContainer } from "@/components/PageContainer";
import { RenderIf } from "@/components/RenderIf";
import { Sidebar } from "@/components/Sidebar";
import { useWideVersion } from "@/hooks/useWideVersion";
import { Text } from "@chakra-ui/react";

export function RegisterCompany() {

  const { isWideVersion } = useWideVersion();

  return (
    <>
      <RenderIf conditional={isWideVersion}>
        <HamburguerMenu />
      </RenderIf>
      <PageContainer>
        <Sidebar />
        <Breadcrumb />
        <Text>Pagina Formulário de Cadastro de Empresas</Text>
      </PageContainer>
    </>
  )
}