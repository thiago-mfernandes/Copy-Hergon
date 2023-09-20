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


import { MenuButton, MenuList } from "@/components/OverlayMenu";
import { Pagination } from "@/components/Pagination";
import { RenderIf } from "@/components/RenderIf";
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
import { Checkbox } from "@/components/Checkbox";
import { useCheckbox } from "@/components/Checkbox/hooks/useCheckbox";
import { useDeleteManyStore } from "@/components/Modals/DeleteManyModal/store/useDeleteManyStore";
import { useCheckboxStore } from "@/components/Checkbox/store/useCheckboxStore";
import { DeleteManyModal } from "@/components/Modals/DeleteManyModal";
import { useSearchInputStore } from "@/hooks/useSearchInputStore";

export function Users() {
  
  const { isWideVersion } = useWideVersion();
  const { search, setSearch } = useSearchInputStore();

  const { userToEdit, setUserToEdit, onOpen } = useUserStore();

  const { onDeleteModalOpen } = useDeleteStore();
  const { onDeleteManyModalOpen } = useDeleteManyStore();

  const { data, isLoading } = useQuery({
    queryKey: ['usersData'],
    queryFn: UserServices.getUsersWithFilteredInfo,
  });  
  
  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);
  
  const { removeUser, removeAllUsers } = useUserModal();

  const { selectedCheckbox, selectAllCheckbox, setSelectedCheckbox } = useCheckboxStore();

  const {
    handleCheckboxIsChecked,
    handleCheckboxIsUncheck,
    handleSelectAllChange,
  } = useCheckbox(currentItems);
  
  return(
    <S.TableContainer>
      <S.TableHeader title="Lista de Usuários">
        <S.TableActions>
          <RenderIf conditional={!isWideVersion}>
            <Menu>
              <MenuButton />
              <MenuList px="2">
                <VStack spacing="2">
                  <MenuItem
                    textColor="white" 
                    backgroundColor="green.500" 
                    icon={FaPlus}
                    onClick={() => {
                      setUserToEdit(undefined);
                      onOpen();
                    }} 
                  >
                    Adicionar Usuário
                  </MenuItem>
                </VStack>
              </MenuList>
            </Menu>
          </RenderIf>
          <RenderIf conditional={isWideVersion}>
            <Flex>
              <Button
                textColor="white" 
                backgroundColor="green.500"
                icon={FaPlus} 
                onClick={() => {
                  setUserToEdit(undefined);
                  onOpen();
                }}                   
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
            <S.Tr justifyContent="space-between" disableRowStyles>
              <Checkbox 
                isChecked={selectAllCheckbox}
                onChange={handleSelectAllChange}
              />
              <S.ThId />
              <S.Th>Nome</S.Th>
              <S.Th>Email</S.Th>
              <S.Th>Área</S.Th>
              <S.Th>Permissão</S.Th>
              <S.Th>Empresa</S.Th>
              <S.Actions>
                <Menu>
                  <TableActionButton />
                  <MenuList padding="2">
                    <VStack spacing="2">
                      <DeleteButton
                        title={
                          selectedCheckbox.length == 0
                          ? "Selecione Itens"
                          : "Excluir Selecionados"
                        }
                        onClick={() => {
                          //setar no estado os checkbox selecionados
                          setSelectedCheckbox(selectedCheckbox);
                          onDeleteManyModalOpen();
                        }}
                        width="100%"
                        isDisabled={selectedCheckbox.length > 0 || selectAllCheckbox ? false : true}
                      />
                    </VStack>
                  </MenuList>
                </Menu>
              </S.Actions>
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
              }).map((item: UserData, index: number) => (
                <S.Tr 
                  key={item.id}
                  justifyContent="flex-start" 
                  indexPosition={index}
                >
                  <Checkbox
                    isChecked={selectedCheckbox.includes(item.id as never)}
                    value={item.id}
                    onChange={(event) => {
                      if(event.target.checked == true) {
                        handleCheckboxIsChecked(item.id as string);
                      } else {
                        handleCheckboxIsUncheck(item.id as string);
                      }
                    }}
                  />
                  <S.TableData data-label="ID" isId>
                    {item.id}
                  </S.TableData>
                  <S.TableData data-label="Nome">
                    {item.name}
                  </S.TableData>
                  <S.TableData data-label="Email">
                    {item.email}
                  </S.TableData>
                  <S.TableData data-label="Área">
                    {item.area}
                  </S.TableData>
                  <S.TableData data-label="Permissão">
                    {item.role}
                  </S.TableData>
                  <S.TableData data-label="Empresa">
                    {item.company}
                  </S.TableData>
                  <S.Actions>
                    <Menu>
                      <TableActionButton />
                      <MenuList padding="2">
                        <VStack spacing="2">
                          <EditButton
                            onClick={() => {
                              setUserToEdit(item);
                              onOpen();
                            }}
                          />
                          <DeleteButton 
                            onClick={() => {
                              setUserToEdit(item);
                              onDeleteModalOpen();
                            }} 
                            width="100%" 
                          />          
                        </VStack>
                      </MenuList>
                    </Menu> 
                  </S.Actions>
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

        <DeleteManyModal 
          allIdToDelete={selectedCheckbox} 
          removeFunction={removeAllUsers}
        />

      </S.TableBox>

      <Pagination
        currentItems={currentItems}
        data={data}
        handlePageClick={handlePageClick}
        pageCount={pageCount}
      />

    </S.TableContainer>
  )
}