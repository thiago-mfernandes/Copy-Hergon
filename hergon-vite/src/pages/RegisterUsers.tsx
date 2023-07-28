import { HamburguerMenu } from "@/components/HamburguerMenu";
import { PageContainer } from "@/components/PageContainer";
import { RenderIf } from "@/components/RenderIf";
import { Sidebar } from "@/components/Sidebar";
import { useWideVersion } from "@/hooks/useWideVersion";
import { Text } from "@chakra-ui/react";

export function RegisterUser() {
  
  const { isWideVersion } = useWideVersion();
  
  return(
    <>
      <RenderIf conditional={isWideVersion}>
        <HamburguerMenu />
      </RenderIf>
      <PageContainer>
        <Sidebar />
        <Text>Pagina Formulário de Registro do Usuario</Text>
      </PageContainer>
    </>
  )
}