import { HamburguerMenu } from "@/components/HamburguerMenu";
import { PageContainer } from "@/components/PageContainer";
import { RenderIf } from "@/components/RenderIf";
import { Sidebar } from "@/components/Sidebar";
import { useWideVersion } from "@/hooks/useWideVersion";
import { Text } from "@chakra-ui/react";

export function Records(){
  
  const { isWideVersion } = useWideVersion();
  
  return(
    <>
      <RenderIf conditional={isWideVersion}>
        <HamburguerMenu />
      </RenderIf>
      <PageContainer>
        <Sidebar />
        <Text>Pagina cadastros</Text>
      </PageContainer>
    </>
  )
}