import { useCompaniesModal } from "./hooks/useCompaniesModal";
import { useCompanieStore } from "./store/useCompanieStore";
import { objIsEmpty } from "@/utils/isObjectEmpty";

import {   
  ModalBody, 
  ModalCloseButton,
  ModalFooter, 
  ModalOverlay, 
  VStack 
} from "@chakra-ui/react";

import { CancelButton } from "@/components/Button";
import { Input } from "@/components/Inputs";
import { SaveButton } from "@/components/Button";
import { Modal, ModalContent, ModalForm, ModalHeader } from "../components";


export function CompaniesModal() {

  const { isOpen, onClose, companieToEdit } = useCompanieStore();  
  
  const {
    errors,
    handleSubmit,
    onSubmitCompanyModal,
    register,
    reset,
    showToast
  } = useCompaniesModal();

  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {objIsEmpty(companieToEdit) ? "Adicionar Empresa" : "Editar Empresa"}
        </ModalHeader>
        <ModalCloseButton top="1rem" right="1.25rem" />

        <ModalBody>
          <ModalForm  
            id="CompaniesModalListenOnSubmit" //para o botao submit encontrar o form
            onSubmit={handleSubmit(onSubmitCompanyModal)}
          >
            <VStack spacing="4">
              <Input 
                type="text" 
                placeholder="Informe.." 
                label="Nome da Empresa"
                {...register("companyName", { required: true })}
              />
              {
                errors.companyName?.message &&
                showToast(`${errors.companyName.message}`, "error", 5000)
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

          <SaveButton form="CompaniesModalListenOnSubmit"/>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}