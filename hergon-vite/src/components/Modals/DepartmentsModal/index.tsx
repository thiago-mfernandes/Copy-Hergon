import { objIsEmpty } from "@/utils/isObjectEmpty";
import { useDepartmentModal } from "./hooks/useDepartmentModal";
import { DepartmentModalFormTypes } from "./types/DepartmentModalFormTypes";
import { SelectedCompaniesType } from "../UserModal/types/SelectedCompanieTypes";

import {
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalOverlay,
  VStack
} from "@chakra-ui/react";

import { Modal, ModalContent, ModalForm, ModalHeader } from "../components";
import { ControlledSelect, Input, TextArea } from "@/components/Inputs";
import { CancelButton, SaveButton } from "@/components/Button";
import { useDepartmentStore } from "./store/useDepartmentStore";

export function DepartmentModal() {

  const { departmentToEdit, isOpen } = useDepartmentStore();

  const {
    register,
    handleSubmit,
    control,
    reset,
    errors,
    showToast,
    onClose,
    onSubmitDepartmentModal,
    companiesGroupOptions
  } = useDepartmentModal();


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {objIsEmpty(departmentToEdit) ? "Adicionar Setor" : "Editar Setor"}
        </ModalHeader>
        <ModalCloseButton top="1rem" right="1.25rem" />

        <ModalBody>
          <ModalForm
            id="DepartmentModalListenOnSubmit"
            onSubmit={handleSubmit(onSubmitDepartmentModal)}
          >
            <VStack spacing="4">

              {/**Input Nome da Empresa */}
              <ControlledSelect<DepartmentModalFormTypes, SelectedCompaniesType, false>
                //isMulti //multi-select component true
                name="companyName"
                control={control}
                label="Nome da Empresa"
                placeholder="Selecione a Empresa"
                options={companiesGroupOptions}
                useBasicStyles
              />
              {
                errors.companyName &&
                showToast("O campo Nome da Empresa é obrigatório.", "error")
              }

              <Input
                type="text"
                placeholder="Informe"
                label="Nome do Setor"
                {...register("departmentName", { required: true })}
              />
              {
                errors.departmentName?.message &&
                showToast(`${errors.departmentName.message}`, "error")
              }
              <TextArea
                type="text"
                placeholder="Informe alguma descrição do setor.."
                label="Descrição"
                {...register("description", { required: false })}
              />
              {
                errors.description?.message &&
                showToast(`${errors.description.message}`, "error")
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

          <SaveButton form="DepartmentModalListenOnSubmit" />

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}