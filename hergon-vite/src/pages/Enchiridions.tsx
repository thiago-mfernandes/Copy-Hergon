import { useQuery } from "react-query";

import { useWideVersion } from "@/hooks/useWideVersion";
import { useSearchInputStore } from "@/hooks/useSearchInputStore";
import { usePagination } from "@/hooks/usePagination";
import { EnchiridionsData, EnchiridionsServices } from "@/services/http/enchiridions/EnchiridionsServices";

import { Flex, Menu, VStack } from "@chakra-ui/react";

import { FaPlus } from "react-icons/fa";

import * as S from "@/components/Table";
import { RenderIf } from "@/components/RenderIf";
import { MenuButton, MenuList } from "@/components/OverlayMenu";
import { MenuItem } from "@/components/Button/MenuItem";
import { Button } from "@/components/Button/Button";
import { Checkbox } from "@/components/Checkbox";
import { DeleteButton, EditButton, TableActionButton } from "@/components/Button";
import { useCheckboxStore } from "@/components/Checkbox/store/useCheckboxStore";
import { Spinner } from "@/components/Spinner";
import { useCheckbox } from "@/components/Checkbox/hooks/useCheckbox";
import { Pagination } from "@/components/Pagination";

export function Enchiridions(){

  const { isWideVersion } = useWideVersion();
  const { search, setSearch } = useSearchInputStore();

  const { data, isLoading } = useQuery({
    queryKey: ['enchiridionsData'],
    queryFn: EnchiridionsServices.getAll
  });

  console.log(data)

  const {
    currentItems,
    handlePageClick,
    pageCount,
    setItemPerPage,
  } = usePagination(data);

  const { 
    selectedCheckbox, 
    selectAllCheckbox, 
    setSelectedCheckbox ,
  } = useCheckboxStore();

  const {
    handleCheckboxIsChecked,
    handleCheckboxIsUncheck,
    handleSelectAllChange,
  } = useCheckbox(currentItems);

  return(
    <S.TableContainer>
      <S.TableHeader title="Prontuários Cadastrados">
        <S.TableActions>
          <RenderIf conditional={!isWideVersion}>
            <Menu>
              <MenuButton />
              <MenuList px="2">
                <MenuItem
                  textColor="white" 
                  backgroundColor="green.500"
                  icon={FaPlus}
                  onClick={() => {
                    //setWorkstationToEdit(undefined);
                    //onOpen();
                  }}
                >
                  Adicionar Prontuário
                </MenuItem>
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
                  //setWorkstationToEdit(undefined);
                  //onOpen();
                }}
              >
                Adicionar Prontuário
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
              <S.Th>Empresa</S.Th>
              <S.Th>Função</S.Th>
              <S.Th>Condições ambientais avaliadas?</S.Th>
              <S.Th>Possui Registro fotográfico?</S.Th>
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
                          //
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
                : // case false
                currentItems.filter((item: EnchiridionsData) => {
                  if(search === "") {
                    return currentItems;
                  } else if (item.role.includes(search)){
                    return currentItems;
                  }
                }).map((item: EnchiridionsData, index: number) => (
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
                    <S.TableData data-label="Empresa">
                      {item.companyName}
                    </S.TableData>
                    <S.TableData data-label="Função">
                      {item.role}
                    </S.TableData>
                    <S.TableData data-label="Condição Ambiental Avaliada?">
                      {item.environmentConditions}
                    </S.TableData>
                    <S.TableData data-label="Possui registro fotográfico?">
                      {item.photograficRegister}
                    </S.TableData>
                    <S.Actions>
                      <Menu>
                        <TableActionButton />
                        <MenuList padding="2">
                          <VStack spacing="2">
                            <EditButton 
                              onClick={() => {
                                //setDepartmentToEdit(item);
                                //onOpen();
                              }}
                            />
                            <DeleteButton 
                              onClick={() => {
                                //setDepartmentToEdit(item);
                                //onDeleteModalOpen();
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