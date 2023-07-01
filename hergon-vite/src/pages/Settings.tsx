import { HamburguerMenu } from "@/components/HamburguerMenu";
import { Sidebar } from "@/components/Sidebar";
import { useWideVersion } from "@/hooks/useWideVersion";
import { Flex, Text } from "@chakra-ui/react";

export function Settings(){
  
  const { isWideVersion } = useWideVersion();
  
  return(
    <>
      {
        isWideVersion && <HamburguerMenu />
      }
      <Flex direction="row" height="100vh">
        <Sidebar />
        <Text>Pagina configuracoes</Text>
      </Flex>
    </>
  )
}