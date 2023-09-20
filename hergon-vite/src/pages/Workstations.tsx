import { useQuery } from "react-query";

import { usePagination } from "@/hooks/usePagination";
import { useWideVersion } from "@/hooks/useWideVersion";
import { useSearchInputStore } from "@/hooks/useSearchInputStore";
import { WorkstationData, WorkstationServices } from "@/services/http/workstations/WorkstationServices";

import { BsPrinterFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { MdCloudDownload } from "react-icons/md";

import { 
  Flex, 
  Menu, 
  VStack, 
} from "@chakra-ui/react";

import { MenuButton, MenuList } from "@/components/OverlayMenu";
import { Pagination } from "@/components/Pagination";
import { RenderIf } from "@/components/RenderIf";
import { Spinner } from "@/components/Spinner";
import * as S from "@/components/Table";
import { MenuItem } from "@/components/Button/MenuItem";
import { EditButton, DeleteButton, TableActionButton } from "@/components/Button";
import { WorkstationModal } from "@/components/Modals/WorkstationsModal";
import { useWorkstationStore } from "@/components/Modals/WorkstationsModal/store/useWorkstationStore";
import { useWorkstationModal } from "@/components/Modals/WorkstationsModal/hooks/useWorkstationModal";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import { useDeleteStore } from "@/components/Modals/DeleteModal/store/useDeleteStore";
import { FunctionReportButton } from "@/components/Button/FunctionReportButton";
import { Checkbox } from "@/components/Checkbox";
import { useCheckbox } from "@/components/Checkbox/hooks/useCheckbox";
import { useDeleteManyStore } from "@/components/Modals/DeleteManyModal/store/useDeleteManyStore";
import { useCheckboxStore } from "@/components/Checkbox/store/useCheckboxStore";
import { DeleteManyModal } from "@/components/Modals/DeleteManyModal";
import { Button } from "@/components/Button/Button";

export function Workstations() {

  const { isWideVersion } = useWideVersion();
  const { search, setSearch } = useSearchInputStore();

  const { workstationToEdit, setWorkstationToEdit, onOpen } = useWorkstationStore();

  const { onDeleteModalOpen } = useDeleteStore();
  const { onDeleteManyModalOpen } = useDeleteManyStore();

  const { data, isLoading } = useQuery({
    queryKey: ['workstationData'],
    queryFn: WorkstationServices.getAll
  })

  console.log(data)
  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);  

  const { removeWorkstation, navigate, removeAllWorkstations } = useWorkstationModal();  

  const { selectedCheckbox, selectAllCheckbox, setSelectedCheckbox } = useCheckboxStore();
  
  const {
    handleCheckboxIsChecked,
    handleCheckboxIsUncheck,
    handleSelectAllChange,
  } = useCheckbox(currentItems);

  //------------------------------------------------------------------------------------------------------
  // ver com o backend como vamos fazer essa parte
  function handleFunctionGenerateReport(id: string) {
    //console.log("id da funcao que vai ser gerado o relatório");
    console.log("pela funcao handleFunctionGenerateReport =>", id);
    console.log("pelo selectCheckbox", selectedCheckbox);
    console.log("pelo selectAllCheckbox", selectAllCheckbox);
  }
  //------------------------------------------------------------------------------------------------------

  return (
    <S.TableContainer>
      <S.TableHeader title="Funções Cadastradas">
        <S.TableActions>
          <RenderIf conditional={!isWideVersion}>
            <Menu>
              <MenuButton />
              <MenuList px="2">
                <VStack spacing="2">
                  <MenuItem 
                    textColor="white" 
                    backgroundColor="blue.300"
                    icon={MdCloudDownload}   
                    onClick={() => navigate("/uploads")}                     
                  >
                    Adicionar em Massa
                  </MenuItem>
                  <MenuItem 
                    textColor="white" 
                    backgroundColor="green.500"
                    icon={FaPlus} 
                    onClick={() => {
                      setWorkstationToEdit(undefined);
                      onOpen();
                    }}                       
                  >
                    Adicionar Função
                  </MenuItem>
                  <MenuItem 
                    textColor="white" 
                    backgroundColor="green.500"
                    icon={BsPrinterFill}  
                    isDisabled={selectedCheckbox.length > 0 || selectAllCheckbox ? false : true}                      
                  >
                    Relatório Geral de Funções
                  </MenuItem>
                </VStack>
              </MenuList>
            </Menu>
          </RenderIf>
          <RenderIf conditional={isWideVersion}>
            <Flex>
              <Button 
                textColor="white" 
                backgroundColor="blue.300" 
                icon={MdCloudDownload}
                onClick={() => navigate("/uploads")} 
              >
                  Adicionar em Massa
              </Button>
              <Button 
                textColor="white" 
                backgroundColor="green.500" 
                icon={FaPlus}
                onClick={() => {
                  setWorkstationToEdit(undefined);
                  onOpen();
                }}
              >
                  Adicionar Função
              </Button>
              <Button 
                textColor="white" 
                backgroundColor="green.500" 
                isTruncated
                icon={BsPrinterFill}
                isDisabled={selectedCheckbox.length > 0 || selectAllCheckbox ? false : true}
              >
                Relatório Geral  de Funções
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
              <S.Th>Setor</S.Th>
              <S.Th>Área</S.Th>
              <S.Th>Função</S.Th>
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
                }).map((item: WorkstationData, index: number) => (
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
                      {item.areaName}
                    </S.TableData>
                    <S.TableData data-label="Função">
                      {item.role}
                    </S.TableData>
                    <S.TableData data-label="Descrição">
                      {item.description ? item.description : "-"}
                    </S.TableData>
                    <S.Actions>
                      <Menu>
                        <TableActionButton />
                        <MenuList padding="2">
                          <VStack spacing="2">
                            <FunctionReportButton onClick={() => handleFunctionGenerateReport(item.id)}/> 
                            <EditButton
                              onClick={() => {
                                setWorkstationToEdit(item);
                                onOpen();
                              }}
                            />
                            <DeleteButton 
                              onClick={() => {
                                setWorkstationToEdit(item);
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

        <WorkstationModal />

        {
          //Verificar se workstationToEdit.id é valido antes de renderizar o componente
          workstationToEdit?.id && (
            <DeleteModal 
              modalTitle="Excluir Posto de Trabalho"
              idToDelete={workstationToEdit.id}
              removeFunction={removeWorkstation}
            />
          )
        }

        <DeleteManyModal 
          allIdToDelete={selectedCheckbox} 
          removeFunction={removeAllWorkstations}
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