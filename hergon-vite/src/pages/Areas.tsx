import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

import { usePagination } from "@/hooks/usePagination";
import { useWideVersion } from "@/hooks/useWideVersion";
import { AreaData, AreaServices } from "@/services/http/areas/AreaServices";

import { FaPlus } from "react-icons/fa";

import {
  Flex,
  Menu,
  VStack,
  Box,
} from "@chakra-ui/react";
import {
  DeleteButton,
  EditButton,
  TableActionButton
} from "@/components/Button";

import { HamburguerMenu } from "@/components/HamburguerMenu";
import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { RenderIf } from "@/components/RenderIf";
import { Sidebar } from "@/components/Sidebar";
import { Spinner } from "@/components/Spinner";
import { Grid } from "@/components/Grid";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MenuButton, MenuList } from "@/components/OverlayMenu";
import { PageContainer } from "@/components/PageContainer";
import * as S from "@/components/Table";
import { AreaModal } from "@/components/Modals/AreaModal";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import { Button } from "@/components/Button/Button";
import { MenuItem } from "@/components/Button/MenuItem";
import { useAreaStore } from "@/components/Modals/AreaModal/store/useAreaStore";
import { useAreaModal } from "@/components/Modals/AreaModal/hooks/useAreaModal";
import { useDeleteStore } from "@/components/Modals/DeleteModal/store/useDeleteStore";


export function Areas() {

  const { isWideVersion } = useWideVersion();
  const [search, setSearch] = useState("");

  const { areaToEdit, setAreaToEdit, onOpen } = useAreaStore();

  const { onDeleteModalOpen } = useDeleteStore();

  const { data, isLoading } = useQuery({
    queryKey: ['areasData'],
    queryFn: AreaServices.getAll
  })

  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);

  //used to trucate texts inside <TableRow />
  const { pathname } = useLocation();


  const { removeArea } = useAreaModal();

  return (
    <Box>
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
            <S.TableHeader title="Lista de Áreas">
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
                <RenderIf conditional={!isWideVersion}>
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
                  <S.Tr>
                    <S.ThId />
                    <S.Th>Área</S.Th>
                    <S.Th>Setor</S.Th>
                    <S.Th>Empresa</S.Th>
                    <S.Th>Nº de Funcionários</S.Th>
                    <S.Th>Descrição</S.Th>
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

                        : //case false
                        currentItems?.filter((item: AreaData) => {
                          if (search === "") {
                            return currentItems;
                          } else if (item.areaName?.includes(search)) {
                            return currentItems;
                          }
                        }).map((item: AreaData) => (
                          <S.Tr key={item.id}>
                            <S.RenderCell data={item} pathname={pathname} />
                            <S.TdActions>
                              <Menu>
                                <TableActionButton />
                                <MenuList padding="2">
                                  <VStack spacing="2">
                                    <EditButton
                                      onClick={() => [
                                        setAreaToEdit(item),
                                        onOpen()
                                      ]}
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
                            </S.TdActions>
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
    </Box>
  )
}
