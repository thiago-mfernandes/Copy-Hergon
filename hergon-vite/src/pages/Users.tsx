import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";

import { usePagination } from "@/hooks/usePagination";
import { useWideVersion } from "@/hooks/useWideVersion";
import { UserServices } from "@/services/http/users/UserServices";
import { UserData } from "@/contexts/Auth/interfaces";

import { FaPlus } from "react-icons/fa";

import { 
  Flex, 
  Menu,  
  VStack, 
} from "@chakra-ui/react";


import { Breadcrumb } from "@/components/Breadcrumb";
import { Grid } from "@/components/Grid";
import { HamburguerMenu } from "@/components/HamburguerMenu";
import { Header } from "@/components/Header";
import { MenuButton, MenuList } from "@/components/OverlayMenu";
import { PageContainer } from "@/components/PageContainer";
import { Pagination } from "@/components/Pagination";
import { RenderIf } from "@/components/RenderIf";
import { Sidebar } from "@/components/Sidebar";
import { Spinner } from "@/components/Spinner";
import { useUserModal } from "@/components/Modals/UserModal/hooks/useUserModal";
import * as S from "@/components/Table";
import { TableActionButton, EditButton, DeleteButton } from "@/components/Button";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import { UserModal } from "@/components/Modals/UserModal";
import { MenuItem } from "@/components/Button/MenuItem";
import { Button } from "@/components/Button/Button";
import { useUserStore } from "@/components/Modals/UserModal/store/useUserStore";
import { useDeleteStore } from "@/components/Modals/DeleteModal/store/useDeleteStore";

export function Users() {
  
  const { isWideVersion } = useWideVersion();
  const [search, setSearch] = useState(""); 

  const { userToEdit, setUserToEdit, onOpen } = useUserStore();

  const { onDeleteModalOpen } = useDeleteStore();

  const { data, isLoading } = useQuery({
    queryKey: ['usersData'],
    queryFn: UserServices.getUsersWithFilteredInfo,
  });  
  
  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);

  //used to trucate texts inside <TableRow />
  const { pathname } = useLocation();


  const { removeUser } = useUserModal();
  
  return(
    <>
      <RenderIf conditional={isWideVersion}>
        <HamburguerMenu />
      </RenderIf>
      <PageContainer>
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
                    <MenuList px="2">
                      <VStack spacing="2">
                        <MenuItem
                          textColor="white" 
                          backgroundColor="green.500" 
                          icon={FaPlus}
                          onClick={() => [
                            setUserToEdit(undefined),
                            onOpen(),
                          ]} 
                        >
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
                      onClick={() => [
                        setUserToEdit(undefined),
                        onOpen(),
                      ]}                   
                    >
                      Adicionar Usuário
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
                    <S.Th>Nome</S.Th>
                    <S.Th>Email</S.Th>
                    <S.Th>Área</S.Th>
                    <S.Th>Permissão</S.Th>
                    <S.Th>Empresa</S.Th>
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
                      <S.Tr key={item.id}>
                        <S.RenderCell data={item} pathname={pathname} />
                        <S.TdActions>
                          <Menu>
                            <TableActionButton />
                            <MenuList padding="2">
                              <VStack spacing="2">
                                <EditButton
                                  onClick={() => [
                                    setUserToEdit(item),
                                    onOpen()
                                  ]}
                                />
                                <DeleteButton 
                                  onClick={() => [
                                    setUserToEdit(item),
                                    onDeleteModalOpen()
                                  ]} 
                                  width="100%" 
                                />          
                              </VStack>
                            </MenuList>
                          </Menu> 
                        </S.TdActions>
                      </S.Tr>
                    ))
                  }
                </S.Tbody>
              </S.Table>

              <UserModal />

              {
              //Verificar se dataEdit.id é valido antes de renderizar o componente
              userToEdit?.id && (
                  <DeleteModal 
                    modalTitle="Excluir Usuário"
                    idToDelete={userToEdit.id}
                    removeFunction={removeUser}
                  />
                )
              }

            </S.TableBox>

            <Pagination
              currentItems={currentItems}
              data={data}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />

          </S.TableContainer>
        </Grid>
      </PageContainer>
    </>
  )
}