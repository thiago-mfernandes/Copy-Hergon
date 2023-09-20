import { useQuery } from "react-query";

import { usePagination } from "@/hooks/usePagination";
import { useWideVersion } from "@/hooks/useWideVersion";
import { AreaData, AreaServices } from "@/services/http/areas/AreaServices";

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

import { Pagination } from "@/components/Pagination";
import { RenderIf } from "@/components/RenderIf";
import { Spinner } from "@/components/Spinner";
import { MenuButton, MenuList } from "@/components/OverlayMenu";
import * as S from "@/components/Table";
import { AreaModal } from "@/components/Modals/AreaModal";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import { Button } from "@/components/Button/Button";
import { MenuItem } from "@/components/Button/MenuItem";
import { useAreaStore } from "@/components/Modals/AreaModal/store/useAreaStore";
import { useAreaModal } from "@/components/Modals/AreaModal/hooks/useAreaModal";
import { useDeleteStore } from "@/components/Modals/DeleteModal/store/useDeleteStore";
import { Checkbox } from "@/components/Checkbox";
import { useCheckbox } from "@/components/Checkbox/hooks/useCheckbox";
import { useDeleteManyStore } from "@/components/Modals/DeleteManyModal/store/useDeleteManyStore";
import { useCheckboxStore } from "@/components/Checkbox/store/useCheckboxStore";
import { DeleteManyModal } from "@/components/Modals/DeleteManyModal";
import { useSearchInputStore } from "@/hooks/useSearchInputStore";


export function Areas() {

  const { isWideVersion } = useWideVersion();
  const { search, setSearch } = useSearchInputStore();

  const { areaToEdit, setAreaToEdit, onOpen } = useAreaStore();

  const { onDeleteModalOpen } = useDeleteStore();
  const { onDeleteManyModalOpen } = useDeleteManyStore();

  const { data, isLoading } = useQuery({
    queryKey: ['areasData'],
    queryFn: AreaServices.getAll
  })

  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);

  const { removeArea, removeAllArea } = useAreaModal();

  const { selectedCheckbox, selectAllCheckbox, setSelectedCheckbox } = useCheckboxStore();
  
  const {
    handleCheckboxIsChecked,
    handleCheckboxIsUncheck,
    handleSelectAllChange,
  } = useCheckbox(currentItems);

  return (
    <S.TableContainer>
      <S.TableHeader title="Lista de Áreas">
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
                      setAreaToEdit(undefined);
                      onOpen();
                    }}
                  >
                    Adicionar Área
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
                  setAreaToEdit(undefined);
                  onOpen();
                }}
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
            <S.Tr justifyContent="space-between" disableRowStyles>
              <Checkbox 
                isChecked={selectAllCheckbox}
                onChange={handleSelectAllChange}
              />
              <S.ThId />
              <S.Th>Área</S.Th>
              <S.Th>Setor</S.Th>
              <S.Th>Empresa</S.Th>
              <S.Th>Nº de Funcionários</S.Th>
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
                          setSelectedCheckbox(selectedCheckbox);
                          onDeleteManyModalOpen()
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
                  currentItems?.filter((item: AreaData) => {
                    if (search === "") {
                      return currentItems;
                    } else if (item.areaName?.includes(search)) {
                      return currentItems;
                    }
                  }).map((item: AreaData, index:number) => (
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
                      <S.TableData isId data-label="ID">
                        {item.id}
                      </S.TableData>
                      <S.TableData data-label="Área">
                        {item.areaName}
                      </S.TableData>
                      <S.TableData data-label="Setor">
                        {item.departmentName}
                      </S.TableData>
                      <S.TableData data-label="Empresa">
                        {item.companyName}
                      </S.TableData>
                      <S.TableData data-label="N° Funcionários">
                        {item.numberOfEmployees}
                      </S.TableData>
                      <S.TableData data-label="Descrição">
                        {item.description ? item.description : "-"}
                      </S.TableData>
                      <S.Actions>
                        <Menu>
                          <TableActionButton />
                          <MenuList padding="2">
                            <VStack spacing="2">
                              <EditButton
                                onClick={() => {
                                  setAreaToEdit(item);
                                  onOpen();
                                }}
                              />
                              <DeleteButton
                                width="100%"
                                onClick={() => {
                                  setAreaToEdit(item);
                                  onDeleteModalOpen();
                                }}
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

        <AreaModal />

        {
          //Verificar se areaToEdit.id é valido antes de renderizar o componente
          areaToEdit?.id && (
            <DeleteModal
              modalTitle="Excluir Área"
              idToDelete={areaToEdit.id}
              removeFunction={removeArea}
            />
          )
        }

        <DeleteManyModal 
          allIdToDelete={selectedCheckbox}
          removeFunction={removeAllArea}
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
