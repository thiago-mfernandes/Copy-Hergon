import { objIsEmpty } from "@/utils/isObjectEmpty";

import { ModalBody, ModalCloseButton, ModalFooter, ModalOverlay, Text, VStack, Link, Box } from "@chakra-ui/react";
import { Modal, ModalForm, ModalHeader, ModalContent } from "../components";
import { ControlledSelect, Input, TextArea, useInputCompanies } from "@/components/Inputs";
import { CancelButton, SaveButton } from "@/components/Button";
import { OptionType } from "../AreaModal/store/useAreaStore";
import { WorkstationModalFormType } from "./types/WorkstationModalFormType";
import { RenderIf } from "@/components/RenderIf";
import { useWorkstationStore } from "./store/useWorkstationStore";
import { useWorkstationModal } from "./hooks/useWorkstationModal";


export function WorkstationModal(){

  const { isOpen, onClose, workstationToEdit, departmentOptions, areaOptions } = useWorkstationStore();
  const { companiesGroupOptions } = useInputCompanies();
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    errors,
    showToast,
    onSubmitWorkstationModal,
    handleCompanyChange,
    handleDepartmentChange,
  } = useWorkstationModal();
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box
            whiteSpace="pre-line" //essa prop interpreta a quebra de linha
          >
            { 
              objIsEmpty(workstationToEdit) 
                ? "Adicionar Posto de Trabalho" 
                : "Editar Posto de\n Trabalho" 
            }
          </Box>
        </ModalHeader>
        <ModalCloseButton top="1rem" right="1.25rem" />
        <ModalBody>
          <ModalForm
            id="WorkstationModalListenOnSubmit"
            onSubmit={handleSubmit(onSubmitWorkstationModal)}
          >
            <VStack spacing="4">
              {/**Input Nome da Empresa */}
              <ControlledSelect<WorkstationModalFormType, OptionType, false>
                name="companyName"
                control={control}
                label="Nome da Empresa"
                placeholder="Selecione a Empresa"
                options={companiesGroupOptions}
                useBasicStyles
                onChange={handleCompanyChange}
              />
              {
                errors.companyName &&
                showToast("O campo Nome da Empresa é obrigatório.", "error")
              }


              
              {/**Input Nome do Setor */}
              <ControlledSelect<WorkstationModalFormType, OptionType, false>
                name="departmentName"
                control={control}
                label="Nome do Setor"
                placeholder="Selecione o Setor"
                options={departmentOptions}
                useBasicStyles
                onChange={handleDepartmentChange}
              />
              {
                errors.departmentName &&
                showToast("O campo Nome do Setor é obrigatório.", "error")
              }
              <RenderIf conditional={departmentOptions?.length === 0}>
                <Text color="red.400">
                  Nenhum setor foi cadastrado nesta Empresa.&nbsp;
                  <Link 
                    href="/departments" 
                    color="gray.700" 
                    fontStyle="700" 
                    textDecoration="underline"
                  >
                    Cadastre um novo setor.
                  </Link>
                </Text>                
              </RenderIf>



              {/**Input Nome da Area */}
              <ControlledSelect<WorkstationModalFormType, OptionType, false>
                name="areaName"
                control={control}
                label="Nome da Área"
                placeholder="Selecione a Área"
                options={areaOptions}
                useBasicStyles
                isDisabled={areaOptions?.length === 0}
              />
              {
                errors.areaName &&
                showToast("O campo Nome da área é obrigatório.", "error")
              }
              <RenderIf conditional={areaOptions?.length === 0}>
                <Text color="red.400">
                  Nenhuma área foi cadastrada neste Setor.&nbsp;
                  <Link 
                    href="/areas" 
                    color="gray.700" 
                    fontStyle="700" 
                    textDecoration="underline"
                  >
                    Cadastre uma nova área.
                  </Link>
                </Text>                
              </RenderIf>


              <Input
                type="text"
                placeholder="Informe o nome da função"
                label="Função"
                {...register("role", { required: true })}
              />
              {
                errors.role?.message &&
                showToast("O campo Função é obrigatório.", "error")
              }
              <TextArea
                type="text"
                placeholder="Descrição da tarefa ou modo operatário.."
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
            onClick={() => {
              reset();
              onClose();
            }}
          />
          <SaveButton form="WorkstationModalListenOnSubmit" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}