import { RenderIf } from "@/components/RenderIf";
import * as S from "@/components/Table";
import { Flex, Heading, Menu, VStack, Text } from "@chakra-ui/react";
import { MenuButton, MenuList } from "@/components/OverlayMenu";
import { MenuItem } from "@/components/Button/MenuItem";
import { MdUpload } from "react-icons/md";
import { Button } from "@/components/Button/Button";
import { UploadCard } from "@/components/Cards/UploadCard";
import uploadInstructions from "@/mocks/uploadInstructions.json";
import { DownloadModelo } from "@/components/Button/DownloadModelo";
import { useWideVersion } from "@/hooks/useWideVersion";

export function Uploads(){

  const { isWideVersion } = useWideVersion();

  return(
    <S.TableContainer>
      <S.TableHeader title="Cadastrar em massa">
        <S.TableActions>
          <RenderIf conditional={!isWideVersion}>
            <Menu>
              <MenuButton />
              <MenuList px="2">
                <VStack spacing="2">
                  <DownloadModelo />
                  <MenuItem
                    textColor="white" 
                    backgroundColor="blue.300"
                    icon={MdUpload}
                    //onClick={() => {}}
                  >
                    Upload
                  </MenuItem>
                </VStack>
              </MenuList>
            </Menu>
          </RenderIf>
          <RenderIf conditional={isWideVersion}>
            <Flex>
              <DownloadModelo />
              <Button
                textColor="white" 
                backgroundColor="blue.300"
                icon={MdUpload}
                //onClick={() => {}}
              >
                Upload
              </Button>
            </Flex>
          </RenderIf>
        </S.TableActions>
      </S.TableHeader>

      <S.TableBox>
        <VStack spacing="2" alignItems="flex-start" pb="8">
          <Heading
            color="gray.800"
            fontSize={{ base: "lg", lg: "2xl" }}
            whiteSpace="normal"             
          >
            Cadastre Setores, Áreas e Funções de uma única vez.
          </Heading>
          <Text color="gray.800" whiteSpace="normal">
            Leia atentamente nossas orientações para o preenchimento dos dados:
          </Text>
        </VStack>

        <Text color="gray.800" whiteSpace="normal">
          1. Baixe o modelo de preenchimento no botão verde.
        </Text>

        <Flex 
          width="100%" 
          py="6"
          flexDirection={{ base: "column", lg: "row"}}
          justifyContent={{ lg: "space-between"}}
        >
          {
            uploadInstructions.map((item) => (
              <UploadCard 
                key={item.id}
                description={item.description}
                img={item.img}
                title={item.title}
              />
            ))
          }
        </Flex>

        <VStack spacing="2" alignItems="flex-start">
          <Text color="gray.800" whiteSpace="normal">
            2. Após preencher corretamente os dados, salve seu arquivo em sua máquina local.
          </Text>
          <Text color="gray.800" whiteSpace="normal">
            3. Clique no botão azul UPLOAD, selecione o arquivo preenchido e clique em selecionar.
          </Text>
        </VStack>
      </S.TableBox>
    </S.TableContainer>
  )
}