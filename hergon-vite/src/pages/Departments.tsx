import { useQuery } from "react-query";

import { usePagination } from "@/hooks/usePagination";
import { useWideVersion } from "@/hooks/useWideVersion";
import { DepartmentServices, DepartmentsData } from "@/services/http/departments/DepartmentServices";

import { FaPlus } from "react-icons/fa";

import {
  Flex,
  Menu,
  VStack,
} from "@chakra-ui/react";

import { Pagination } from "@/components/Pagination";
import { RenderIf } from "@/components/RenderIf";
import { Spinner } from "@/components/Spinner";
import { MenuButton, MenuList } from "@/components/OverlayMenu";
import * as S from "@/components/Table";
import { DepartmentModal } from "@/components/Modals/DepartmentsModal";
import { useDepartmentModal } from "@/components/Modals/DepartmentsModal/hooks/useDepartmentModal";
import { MenuItem } from "@/components/Button/MenuItem";
import { Button } from "@/components/Button/Button";
import { TableActionButton } from "@/components/Button/TableActionButton";
import { EditButton } from "@/components/Button/EditButton";
import { DeleteButton } from "@/components/Button";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import { useDepartmentStore } from "@/components/Modals/DepartmentsModal/store/useDepartmentStore";
import { useDeleteStore } from "@/components/Modals/DeleteModal/store/useDeleteStore";
import { Checkbox } from "@/components/Checkbox";
import { useCheckbox } from "@/components/Checkbox/hooks/useCheckbox";
import { useCheckboxStore } from "@/components/Checkbox/store/useCheckboxStore";
import { useDeleteManyStore } from "@/components/Modals/DeleteManyModal/store/useDeleteManyStore";
import { DeleteManyModal } from "@/components/Modals/DeleteManyModal";
import { useSearchInputStore } from "@/hooks/useSearchInputStore";

export function Departments() {

  const { isWideVersion } = useWideVersion();
  const { search, setSearch } = useSearchInputStore();

  const { departmentToEdit, onOpen, setDepartmentToEdit } = useDepartmentStore();
  const { onDeleteModalOpen } = useDeleteStore();
  const { onDeleteManyModalOpen } = useDeleteManyStore();

  const { data, isLoading } = useQuery({
    queryKey: ['departmentsData'],
    queryFn: DepartmentServices.getAll
  });

  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);

  const { removeDepartment, removeAllDepartment } = useDepartmentModal();

  const { selectedCheckbox, selectAllCheckbox, setSelectedCheckbox } = useCheckboxStore();

  const {
    handleCheckboxIsChecked,
    handleCheckboxIsUncheck,
    handleSelectAllChange,
  } = useCheckbox(currentItems);

  return (
    <S.TableContainer>
      <S.TableHeader title="Lista de Setores">
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
                      setDepartmentToEdit(undefined);
                      onOpen();
                    }}
                  >
                    Adicionar Setor
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
                  setDepartmentToEdit(undefined);
                  onOpen();
                }}
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
            <S.Tr disableRowStyles>
              <Checkbox 
                isChecked={selectAllCheckbox}
                onChange={handleSelectAllChange}
              />
              <S.ThId />
              <S.Th>Empresas</S.Th>
              <S.Th>Setor</S.Th>
              <S.Th>Descrição</S.Th>
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

                  : //case false
                  currentItems?.filter((item: DepartmentsData) => {
                    if (search === "") {
                      return currentItems;
                    } else if (item.departmentName?.includes(search)) {
                      return currentItems;
                    }
                  }).map((item: DepartmentsData, index: number) => (
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
                      <S.TableData data-label="Empresa">
                        {item.companyName}
                      </S.TableData>
                      <S.TableData data-label="Setor">
                        {item.departmentName}
                      </S.TableData>
                      <S.TableData data-label="Área">
                        {item.description ? item.description : "-"}
                      </S.TableData>
                      <S.Actions>
                        <Menu>
                          <TableActionButton />
                          <MenuList padding="2">
                            <VStack spacing="2">
                              <EditButton
                                onClick={() => {
                                  setDepartmentToEdit(item);
                                  onOpen();
                                }}
                              />
                              <DeleteButton
                                onClick={() => {
                                  setDepartmentToEdit(item);
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

        <DepartmentModal />

        {
          //Verificar se dataEdit.id é valido antes de renderizar o componente
          departmentToEdit?.id && (
            <DeleteModal
              modalTitle="Excluir Setor"
              idToDelete={departmentToEdit.id}
              removeFunction={removeDepartment}
            />
          )
        }

        <DeleteManyModal 
          allIdToDelete={selectedCheckbox} 
          removeFunction={removeAllDepartment}
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