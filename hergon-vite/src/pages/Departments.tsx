import { useState } from "react";
import { useLocation } from "react-router-dom";
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

export function Departments() {

  const { isWideVersion } = useWideVersion();
  const [search, setSearch] = useState("");

  const { departmentToEdit, onOpen, setDepartmentToEdit } = useDepartmentStore();
  const { onDeleteModalOpen } = useDeleteStore();

  const { data, isLoading } = useQuery({
    queryKey: ['departmentsData'],
    queryFn: DepartmentServices.getAll
  });

  const { currentItems, handlePageClick, pageCount, setItemPerPage } = usePagination(data);

  //used to trucate texts inside <TableRow />
  const { pathname } = useLocation();

  const { removeDepartment } = useDepartmentModal();

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
            <S.TableHeader title="Lista de Setores">
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
                            setDepartmentToEdit(undefined),
                            onOpen(),
                          ]}
                        >
                          Adicionar Setor
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
                        setDepartmentToEdit(undefined),
                        onOpen(),
                      ]}
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
                  <S.Tr>
                    <S.ThId />
                    <S.Th>Empresas</S.Th>
                    <S.Th>Setor</S.Th>
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
                        currentItems?.filter((item: DepartmentsData) => {
                          if (search === "") {
                            return currentItems;
                          } else if (item.departmentName?.includes(search)) {
                            return currentItems;
                          }
                        }).map((item: DepartmentsData) => (
                          <S.Tr key={item.id}>
                            <S.RenderCell data={item} pathname={pathname} />
                            <S.TdActions>
                              <Menu>
                                <TableActionButton />
                                <MenuList padding="2">
                                  <VStack spacing="2">
                                    <EditButton
                                      onClick={() => [
                                        setDepartmentToEdit(item),
                                        onOpen()
                                      ]}
                                    />
                                    <DeleteButton
                                      onClick={() => [
                                        setDepartmentToEdit(item),
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