import { useState } from "react";
import { useLocation } from "react-router-dom";
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

import { Breadcrumb } from "@/components/Breadcrumb";
import { Grid } from "@/components/Grid";
import { HamburguerMenu } from "@/components/HamburguerMenu";
import { Header } from "@/components/Header";
import { MenuButton, MenuList } from "@/components/OverlayMenu";
import { RenderIf } from "@/components/RenderIf";
import { Sidebar } from "@/components/Sidebar";
import { Pagination } from "@/components/Pagination";
import { Spinner } from "@/components/Spinner";
import { PageContainer } from "@/components/PageContainer";
import * as S from "@/components/Table";
import { useCompaniesModal } from "@/components/Modals/CompaniesModal/hooks/useCompaniesModal";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import { CompaniesModal } from "@/components/Modals/CompaniesModal";
import { Button } from "@/components/Button/Button";
import { MenuItem } from "@/components/Button/MenuItem";
import { useCompanieStore } from "@/components/Modals/CompaniesModal/store/useCompanieStore";
import { useDeleteStore } from "@/components/Modals/DeleteModal/store/useDeleteStore";


export function Companies() {

  const { isWideVersion } = useWideVersion();
  const [search, setSearch] = useState("");

  const { companieToEdit, setCompanieToEdit, onOpen } = useCompanieStore();

  const { onDeleteModalOpen } = useDeleteStore();

  const { data, isLoading } = useQuery({
    queryKey: ['companiesData'],
    queryFn: CompanieServices.getAll
  });

  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);

  //used to trucate texts inside <TableRow />
  const { pathname } = useLocation();

  
  const { removeCompany } = useCompaniesModal();

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
            <S.TableHeader title="Lista de Empresas">
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
                            setCompanieToEdit(undefined),
                            onOpen(),
                          ]}
                        >
                          Adicionar Empresa
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
                        setCompanieToEdit(undefined),
                        onOpen(),
                      ]}
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
                  <S.Tr>
                    <S.ThId />
                    <S.Th>Empresa</S.Th>
                    <S.ThActions />
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
                        }).map((item: CompaniesData) => (
                          <S.Tr key={item.id}>
                            <S.RenderCell data={item} pathname={pathname} />
                            <S.TdActions>
                              <Menu>
                                <TableActionButton />
                                <MenuList padding="2">
                                  <VStack spacing="2">
                                    <EditButton
                                      onClick={() => [
                                        setCompanieToEdit(item),
                                        onOpen()
                                      ]}
                                    />
                                    <DeleteButton
                                      onClick={() => [
                                        setCompanieToEdit(item),
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

