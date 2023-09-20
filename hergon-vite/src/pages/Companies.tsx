import { useQuery } from "react-query";
import { usePagination } from "@/hooks/usePagination";
import { useWideVersion } from "@/hooks/useWideVersion";
import { CompanieServices, CompaniesData } from "@/services/http/companies/CompanieServices";

import { FaPlus } from "react-icons/fa";

import {
  Flex,
  Menu,
  VStack,
} from "@chakra-ui/react";

import {
  DeleteButton,
  EditButton,
  TableActionButton
} from "@/components/Button";

import { MenuButton, MenuList } from "@/components/OverlayMenu";
import { RenderIf } from "@/components/RenderIf";
import { Pagination } from "@/components/Pagination";
import { Spinner } from "@/components/Spinner";
import * as S from "@/components/Table";
import { useCompaniesModal } from "@/components/Modals/CompaniesModal/hooks/useCompaniesModal";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import { CompaniesModal } from "@/components/Modals/CompaniesModal";
import { Button } from "@/components/Button/Button";
import { MenuItem } from "@/components/Button/MenuItem";
import { useCompanieStore } from "@/components/Modals/CompaniesModal/store/useCompanieStore";
import { useDeleteStore } from "@/components/Modals/DeleteModal/store/useDeleteStore";
import { Checkbox } from "@/components/Checkbox";
import { useCheckbox } from "@/components/Checkbox/hooks/useCheckbox";
import { useDeleteManyStore } from "@/components/Modals/DeleteManyModal/store/useDeleteManyStore";
import { DeleteManyModal } from "@/components/Modals/DeleteManyModal";
import { useCheckboxStore } from "@/components/Checkbox/store/useCheckboxStore";
import { useSearchInputStore } from "@/hooks/useSearchInputStore";


export function Companies() {

  const { isWideVersion } = useWideVersion();
  const { search, setSearch } = useSearchInputStore();
  
  const { companieToEdit, setCompanieToEdit, onOpen } = useCompanieStore();
  
  const { onDeleteModalOpen } = useDeleteStore();
  const { onDeleteManyModalOpen } = useDeleteManyStore();

  const { data, isLoading } = useQuery({
    queryKey: ['companiesData'],
    queryFn: CompanieServices.getAll
  });
  
  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);
  
  const { removeCompany, removeAllCompany } = useCompaniesModal();

  const { selectedCheckbox, selectAllCheckbox, setSelectedCheckbox } = useCheckboxStore();
  
  const {
    handleCheckboxIsChecked,
    handleCheckboxIsUncheck,
    handleSelectAllChange,
  } = useCheckbox(currentItems); 


  return (
    <S.TableContainer>
      <S.TableHeader title="Lista de Empresas">
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
                      setCompanieToEdit(undefined);
                      onOpen();
                    }}
                  >
                    Adicionar Empresa
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
                  setCompanieToEdit(undefined);
                  onOpen();
                }}
              >
                Adicionar Empresa
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
                ? <Spinner /> //case true
                : currentItems.length === 0 //if
                  ? //case true
                  <S.EmptyTable />
                  :  //case false
                  currentItems?.filter((item: CompaniesData) => {
                    if (search === "") {
                      return currentItems;
                    } else if (item.companyName.includes(search)) {
                      return currentItems;
                    }
                  }).map((item: CompaniesData, index: number) => (
                    <S.Tr 
                      key={item.id} 
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
                      <S.TableData data-label="ID" isId>{item.id}</S.TableData>
                      <S.TableData data-label="Empresa">{item.companyName}</S.TableData>
                      <S.Actions>
                        <Menu>
                          <TableActionButton />
                          <MenuList padding="2">
                            <VStack spacing="2">
                              <EditButton
                                onClick={() => {
                                  setCompanieToEdit(item);
                                  onOpen();
                                }}
                              />
                              <DeleteButton
                                onClick={() => {
                                  setCompanieToEdit(item);
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

        <CompaniesModal />

        {
          //Verificar se dataEdit.id é valido antes de renderizar o componente
          companieToEdit?.id && (
            <DeleteModal
              idToDelete={companieToEdit.id}
              modalTitle="Excluir Empresa"
              removeFunction={removeCompany}
            />
          )
        }

        <DeleteManyModal 
          allIdToDelete={selectedCheckbox} 
          removeFunction={removeAllCompany}
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

