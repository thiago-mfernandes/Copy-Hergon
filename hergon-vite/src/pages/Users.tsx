import { Breadcrumb } from "@/components/Breadcrumb";
import { Button, MenuItem } from "@/components/Button";
import { Grid } from "@/components/Grid";
import { HamburguerMenu } from "@/components/HamburguerMenu";
import { Header } from "@/components/Header";
import { AddUserModal } from "@/components/Modals/AddUserModal";
import { MenuButton, MenuList } from "@/components/OverlayMenu";
import { Pagination } from "@/components/Pagination";
import { RenderIf } from "@/components/RenderIf";
import { Sidebar } from "@/components/Sidebar";
import { Spinner } from "@/components/Spinner";
import * as S from "@/components/Table";
import { useAuth } from "@/contexts/Auth";
import { UserData } from "@/contexts/Auth/interfaces";
import { usePagination } from "@/hooks/usePagination";
import { useWideVersion } from "@/hooks/useWideVersion";
import { api } from "@/services/axios";
import { Flex, Menu, VStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";



export function Users() {
  
  const { isWideVersion } = useWideVersion();
  const [search, setSearch] = useState("");
   

  async function getUsers(){
    const { data } = await api.get<UserData[]>("/users");
    //pegando somente os dados que vou usar na tabela
    const filteredUsers = data.map(({ id, name, email, area, roles }) => 
      ({ id, name, email, area, roles}));
    //console.log(filteredUsers);
    return filteredUsers;
  }  


  const { data, isLoading } = useQuery({
    queryKey: ['usersData'],
    queryFn: getUsers
  });

  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);

  //used to trucate texts inside <TableRow />
  const { pathname } = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return(
    <>
      {
        isWideVersion && <HamburguerMenu />
      }
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
            <S.TableHeader title="Lista de Usuários">
              <S.TableActions>
                <RenderIf conditional={isWideVersion}>
                  <Menu>
                    <MenuButton />
                    <MenuList>
                      <VStack spacing="2">
                        <MenuItem
                          onClick={onOpen}
                          textColor="white" 
                          backgroundColor="green.500" 
                          icon={FaPlus}>
                            Adicionar Usuário
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
                      onClick={onOpen}                   
                    >
                      Adicionar Usuário
                    </Button>
                  </Flex>
                </RenderIf>
              </S.TableActions>
            </S.TableHeader>

            <AddUserModal 
              isOpen={isOpen} 
              onClose={onClose} 
              //companiesById={companiesById}
            />

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
                    <S.Th>Nome</S.Th>
                    <S.Th>Email</S.Th>
                    <S.Th>Área</S.Th>
                    <S.Th>Permissão</S.Th>
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
                    currentItems?.filter((item: UserData) => {
                      if (search === "") {
                        return currentItems;
                      } else if (item.name.includes(search)) {
                        return currentItems;
                      }
                    }).map((item: UserData) => (
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