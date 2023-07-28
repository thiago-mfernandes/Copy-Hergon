import { useEffect } from "react";
import { useUserModal } from "./hooks/useUserModal";
import { useUserStore } from "./store/useUserStore";
import { objIsEmpty } from "@/utils/isObjectEmpty";

import { UserModalFormTypes } from "./types/UserModalFormTypes";
import { SelectedCompaniesType } from "./types/SelectedCompanieTypes";

import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack
} from "@chakra-ui/react";

import { Input, useInputCompanies, usePermissionTypes, ControlledSelect } from "@/components/Inputs";
import { CancelButton, SaveButton } from "@/components/Button";
import { Modal, ModalForm } from "../components";

export function UserModal() {

  const { userToEdit, onClose, isOpen } = useUserStore();

  //uso no modal
  const {
    register,
    handleSubmit,
    control,
    reset,
    errors,
    showToast,
    onSubmitUserModal,
  } = useUserModal();

  //uso no select de empresas
  const {
    companiesGroupOptions,
    user,
  } = useInputCompanies();

  //uso no select de permissoes
  const {
    userAdminPermissionsGroup,
    userPermissionsGroup
  } = usePermissionTypes();

  console.log(companiesGroupOptions);
  useEffect(() => {
    if (userToEdit) {
      reset(userToEdit);
    } else {
      reset({
        company: null,
        role: null,
        name: "",
        email: "",
        area: "",
      });
    }
  }, [userToEdit, reset]);

  function handleWithTypeofPermissionGroupToRender(id?: string, label?: string) {
    //se houver um id e..
    if (!!id && label === "Super Gestor") {
      return userPermissionsGroup;
    } else {
      return userAdminPermissionsGroup;
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {objIsEmpty(userToEdit) ? "Adicionar Usuário" : "Editar Usuário"}
        </ModalHeader>
        <ModalCloseButton top="1rem" right="1.25rem" />

        <ModalBody>
          <ModalForm
            id="UserModalListenOnSubmit"
            onSubmit={handleSubmit(onSubmitUserModal)}
          >
            <VStack spacing="4">

              {/**Input Nome da Empresa */}

              {/**refatorar as tipagens */}
              <ControlledSelect<UserModalFormTypes, SelectedCompaniesType, false>
                //isMulti //multi-select component true
                name="company"
                control={control}
                label="Nome da Empresa"
                placeholder="Selecione a Empresa"
                options={companiesGroupOptions}
                useBasicStyles
              />
              {
                errors.company &&
                showToast("O campo Nome da Empresa é obrigatório.", "error")
              }

              {/**Input Tipos de Permissoes */}
              <ControlledSelect<UserModalFormTypes, SelectedCompaniesType, false>
                name="role"
                control={control}
                label="Tipo de Permissão"
                placeholder="Selecione o tipo"
                options={handleWithTypeofPermissionGroupToRender(user.id, user.role?.label)}
              />
              {
                errors.role &&
                showToast("O campo Tipo de Permissão é obrigatório.", "error")
              }

              <Input
                type="text"
                placeholder="Informe"
                label="Nome do usuário"
                {...register("name", { required: true })}
              />
              {
                errors.name?.message &&
                showToast(`${errors.name.message}`, "error")
              }

              <Input
                type="email"
                placeholder="user@gmail.com"
                label="Email"
                {...register("email", { required: true })}
              />
              {
                errors.email?.message &&
                showToast(`${errors.email.message}`, "error")
              }

              <Input
                type="text"
                placeholder="Informe"
                label="Nome da Área"
                {...register("area", { required: true })}
              />
              {
                errors.area?.message &&
                showToast(`${errors.area.message}`, "error")
              }
            </VStack>
          </ModalForm>
        </ModalBody>

        <ModalFooter>
          <CancelButton
            onClick={() => [
              reset(),
              onClose()
            ]}
          />

          <SaveButton form="UserModalListenOnSubmit" />

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}