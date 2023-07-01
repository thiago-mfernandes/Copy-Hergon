import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { css } from "@emotion/react";

import { usePagination } from "@/hooks/usePagination";
import { api } from "@/services/axios";
import { Flex, Menu, VStack } from "@chakra-ui/react";

import { BsPrinterFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { MdCloudDownload } from "react-icons/md";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Grid } from "@/components/Grid";
import { HamburguerMenu } from "@/components/HamburguerMenu";
import { Header } from "@/components/Header";
import { MenuButton, MenuList } from "@/components/OverlayMenu";
import { Pagination } from "@/components/Pagination";
import { RenderIf } from "@/components/RenderIf";
import { Sidebar } from "@/components/Sidebar";
import { Button, MenuItem } from "@/components/Button";
import { Spinner } from "@/components/Spinner";
import * as S from "@/components/Table";
import { useWideVersion } from "@/hooks/useWideVersion";


//preparar a refatoracao de css por este modelo:
const container = css({
  display: 'flex',
  flexDirection: 'row',
  height: "100vh",
  padding: "1rem 1rem 0"
})
// isso aqui nao funciona nesse css
// padding: {{ base: "", lg: "1rem 1rem 0"}},

export interface WorkstationData {
  id: number;
  company: string;
  department: string;
  area: string;
  role: string;
}

export function Workstations() {

  const { isWideVersion } = useWideVersion();

  const [search, setSearch] = useState("");

  //função para pegar os dados
  async function getWorkstations() {
    const { data } = await api.get<WorkstationData[]>("/workstations");
    return data;
  }

  //query que obtem os dados na chave ['...'] através da fn getWorkstations
  const { data, isLoading } = useQuery({
    queryKey: ['workstationData'],
    queryFn: getWorkstations
  })

  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);
  

  //used to trucate texts inside <TableRow />
  const { pathname } = useLocation();

  return (
    <>
      <RenderIf conditional={isWideVersion}>
        <HamburguerMenu />
      </RenderIf>

      {/**direction="row" height="100vh" */}
      <Flex css={container}>

        <Sidebar />
        <Grid>
          <RenderIf conditional={isWideVersion}>
            <Breadcrumb />
          </RenderIf>
          
          <RenderIf conditional={!isWideVersion}>
            <Header />
          </RenderIf>

          <S.TableContainer>
            <S.TableHeader title="Funções Cadastradas">
              <S.TableActions>
                <RenderIf conditional={isWideVersion}>
                  <Menu>
                    <MenuButton />
                    <MenuList>
                      <VStack spacing="2">
                        <MenuItem 
                          textColor="white" 
                          backgroundColor="blue.300"
                          icon={MdCloudDownload}                        
                        >
                          Adicionar em Massa
                        </MenuItem>
                        <MenuItem 
                          textColor="white" 
                          backgroundColor="green.500"
                          icon={FaPlus}                        
                        >
                          Adicionar Função
                        </MenuItem>
                        <MenuItem 
                          textColor="white" 
                          backgroundColor="green.500"
                          icon={FaPlus}                        
                        >
                          Relatório PGR
                        </MenuItem>
                        <MenuItem 
                          textColor="white" 
                          backgroundColor="green.500"
                          icon={BsPrinterFill}                        
                        >
                          Gerar Relatório
                        </MenuItem>
                      </VStack>
                    </MenuList>
                  </Menu>
                </RenderIf>
                <RenderIf conditional={!isWideVersion}>
                  <Flex>
                    <Button 
                      textColor="white" 
                      backgroundColor="blue.300" 
                      icon={MdCloudDownload}>
                        Adicionar em Massa
                    </Button>
                    <Button 
                      textColor="white" 
                      backgroundColor="green.500" 
                      icon={FaPlus}>
                        Adicionar Função
                    </Button>
                    <Button 
                      textColor="white" 
                      backgroundColor="green.500" 
                      icon={FaPlus}>
                        Relatório PGR
                    </Button>
                    <Button 
                      textColor="white" 
                      backgroundColor="green.500" 
                      icon={BsPrinterFill}>
                        Gerar Relatório
                    </Button>
                  </Flex>
                </RenderIf>
              </S.TableActions>
            </S.TableHeader>

            <S.TableControllers
              search={search}
              setSearch={setSearch}
              setItemPerPage={setItemPerPage}
            />
            <S.TableBox>
              <S.Table>
                <S.Thead>
                  <S.Tr>
                    <S.ThId />
                    <S.Th>Empresa</S.Th>
                    <S.Th>Setor</S.Th>
                    <S.Th>Área</S.Th>
                    <S.Th>Função</S.Th>
                    <S.ThActions />
                  </S.Tr>
                </S.Thead>
                <S.Tbody>
                  {
                    isLoading //if
                    ? <Spinner/> //case true
                    : currentItems.length === 0 //if
                      ? //case true
                      <S.EmptyTable />
                      
                      : //case false
                      currentItems?.filter((item: WorkstationData) => {
                        if (search === "") {
                          return currentItems;
                        } else if (item.role.includes(search)) {
                          return currentItems;
                        }
                      }).map((item: WorkstationData) => (
                        <S.TableRow 
                          key={item.id} 
                          item={item} 
                          pathname={pathname}
                        />
                      ))
                  }
                </S.Tbody>
              </S.Table>
            </S.TableBox>

            <Pagination
              currentItems={currentItems}
              data={data}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </S.TableContainer>
        </Grid>
      </Flex>
    </>
  )
}