import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

import { usePagination } from "@/hooks/usePagination";
import { api } from "@/services/axios";

import { Flex, Menu, VStack, Box } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

import { HamburguerMenu } from "@/components/HamburguerMenu";
import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { RenderIf } from "@/components/RenderIf";
import { Sidebar } from "@/components/Sidebar";
import { Spinner } from "@/components/Spinner";
import { Button, MenuItem } from "@/components/Button";
import { Grid } from "@/components/Grid";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MenuButton, MenuList } from "@/components/OverlayMenu";
import * as S from "@/components/Table"
import { useWideVersion } from "@/hooks/useWideVersion";


interface AreaData {
  id: number;
  area: string;
  departmentName: string;
  numberOfEmployees: number;
}

export function Areas() {
  
  const { isWideVersion } = useWideVersion();

  const [search, setSearch] = useState("");

  async function getAreas(){
    const { data } = await api.get<AreaData[]>("/areas");
    return data;
  }
  
  const { data, isLoading } = useQuery({
    queryKey: ['areasData'],
    queryFn: getAreas
  })

  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);

  //used to trucate texts inside <TableRow />
  const { pathname } = useLocation();
  
  return(
    <Box>
      <RenderIf conditional={isWideVersion}>
        <HamburguerMenu />
      </RenderIf>

      <Flex direction="row" height="100vh" padding="1rem 1rem 0">
        <Sidebar />
        
        <Grid>
          <RenderIf conditional={isWideVersion}>
            <Breadcrumb />
          </RenderIf>
          
          <RenderIf conditional={!isWideVersion}>
            <Header />
          </RenderIf>

          <S.TableContainer>
            <S.TableHeader title="Lista de Áreas">
              <S.TableActions>
                <RenderIf conditional={isWideVersion}>
                  <Menu>
                    <MenuButton />
                    <MenuList>
                      <VStack spacing="2">
                        <MenuItem
                          textColor="white" 
                          backgroundColor="green.500" 
                          icon={FaPlus}>
                            Adicionar Empresa
                        </MenuItem>
                      </VStack>
                    </MenuList>
                  </Menu>
                </RenderIf>
                <RenderIf conditional={!isWideVersion}>
                  <Flex>
                    <Button
                      textColor="white" 
                      backgroundColor="green.500"
                      icon={FaPlus}                    
                    >
                      Adicionar Área
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
                    <S.Th>Área</S.Th>
                    <S.Th>Setor</S.Th>
                    <S.Th>Nº de Funcionários</S.Th>
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
                      currentItems?.filter((item: AreaData) => {
                        if (search === "") {
                          return currentItems;
                        } else if (item.area.includes(search)) {
                          return currentItems;
                        }
                      }).map((item: AreaData) => (
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
    </Box>
  )
}