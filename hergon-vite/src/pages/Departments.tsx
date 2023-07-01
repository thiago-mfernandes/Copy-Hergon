import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";

import { usePagination } from "@/hooks/usePagination";
import { api } from "@/services/axios";

import { Flex, Menu, VStack } from "@chakra-ui/react";
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
import * as S from "@/components/Table";
import { useWideVersion } from "@/hooks/useWideVersion";

interface DepartmentsData {
  id: number;
  company: string;
  departmentName: string;
}

export function Departments() {
  
  const { isWideVersion } = useWideVersion();

  const [search, setSearch] = useState("");

  async function getDepartments(){
    const { data } = await api.get<DepartmentsData[]>("/departments");
    return data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ['departmentsData'],
    queryFn: getDepartments
  });

  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);

  //used to trucate texts inside <TableRow />
  const { pathname } = useLocation();
  
  return(
    <>
      <RenderIf conditional={isWideVersion}>
        <HamburguerMenu />
      </RenderIf>
      
      <Flex direction="row" height="100vh" padding="1rem 1rem 0">
        <Sidebar />
        {/**daqui para baixo */}
        {/*<Text>Página de Setores</Text>*/}
        <Grid>
          <RenderIf conditional={isWideVersion}>
            <Breadcrumb />
          </RenderIf>
          
          <RenderIf conditional={!isWideVersion}>
            <Header />
          </RenderIf>

          <S.TableContainer>
            <S.TableHeader title="Lista de Setores">
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
                            Adicionar Setor
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
                      Adicionar Setor
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
                    <S.Th>Empresas</S.Th>
                    <S.Th>Setor</S.Th>
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
                    currentItems?.filter((item: DepartmentsData) => {
                      if (search === "") {
                        return currentItems;
                      } else if (item.departmentName.includes(search)) {
                        return currentItems;
                      }
                    }).map((item: DepartmentsData) => (
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