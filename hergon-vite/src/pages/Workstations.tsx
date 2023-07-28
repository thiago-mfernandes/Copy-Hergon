import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";

import { usePagination } from "@/hooks/usePagination";
import { useWideVersion } from "@/hooks/useWideVersion";
import { WorkstationData, WorkstationServices } from "@/services/http/workstations/WorkstationServices";

import { BsPrinterFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { MdCloudDownload } from "react-icons/md";

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
import { Pagination } from "@/components/Pagination";
import { RenderIf } from "@/components/RenderIf";
import { Sidebar } from "@/components/Sidebar";
import { Spinner } from "@/components/Spinner";
import { PageContainer } from "@/components/PageContainer";
import * as S from "@/components/Table";
import { MenuItem } from "@/components/Button/MenuItem";
import { Button } from "@/components/Button/Button";
import { TableActionButton } from "@/components/Button/TableActionButton";
import { EditButton } from "@/components/Button/EditButton";
import { DeleteButton } from "@/components/Button/DeleteButton";
import { WorkstationModal } from "@/components/Modals/WorkstationsModal";
import { useWorkstationStore } from "@/components/Modals/WorkstationsModal/store/useWorkstationStore";
import { useWorkstationModal } from "@/components/Modals/WorkstationsModal/hooks/useWorkstationModal";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import { useDeleteStore } from "@/components/Modals/DeleteModal/store/useDeleteStore";

export function Workstations() {

  const { isWideVersion } = useWideVersion();
  const [search, setSearch] = useState("");

  const { workstationToEdit, setWorkstationToEdit, onOpen } = useWorkstationStore();

  const { onDeleteModalOpen } = useDeleteStore();

  //query que obtem os dados na chave ['...'] através da fn getWorkstations
  const { data, isLoading } = useQuery({
    queryKey: ['workstationData'],
    queryFn: WorkstationServices.getAll
  })

  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);  

  //used to trucate texts inside <TableRow />
  const { pathname } = useLocation();

  const { removeWorkstation } = useWorkstationModal();  

  return (
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
            <S.TableHeader title="Funções Cadastradas">
              <S.TableActions>
                <RenderIf conditional={isWideVersion}>
                  <Menu>
                    <MenuButton />
                    <MenuList px="2">
                      <VStack spacing="2">
                        <MenuItem 
                          textColor="white" 
                          backgroundColor="blue.300"
                          icon={MdCloudDownload}                        
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
                          icon={FaPlus}                        
                        >
                          Relatório PGR
                        </MenuItem>
                        <MenuItem 
                          textColor="white" 
                          backgroundColor="green.500"
                          icon={BsPrinterFill}                        
                        >
                          Gerar Relatório
                        </MenuItem>
                      </VStack>
                    </MenuList>
                  </Menu>
                </RenderIf>
                <RenderIf conditional={!isWideVersion}>
                  <Flex>
                    <Button 
                      textColor="white" 
                      backgroundColor="blue.300" 
                      icon={MdCloudDownload}>
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
                      icon={FaPlus}>
                        Relatório PGR
                    </Button>
                    <Button 
                      textColor="white" 
                      backgroundColor="green.500" 
                      icon={BsPrinterFill}>
                        Gerar Relatório
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
                    <S.Th>Empresa</S.Th>
                    <S.Th>Setor</S.Th>
                    <S.Th>Área</S.Th>
                    <S.Th>Função</S.Th>
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
                      currentItems?.filter((item: WorkstationData) => {
                        if (search === "") {
                          return currentItems;
                        } else if (item.role.includes(search)) {
                          return currentItems;
                        }
                      }).map((item: WorkstationData) => (
                        <S.Tr key={item.id}>
                          <S.RenderCell data={item} pathname={pathname} />
                          <S.TdActions>
                            <Menu>
                              <TableActionButton />
                              <MenuList padding="2">
                                <VStack spacing="2">
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
                          </S.TdActions>
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