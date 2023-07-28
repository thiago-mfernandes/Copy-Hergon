import { useEffect } from "react";
import { useAreaModal } from "./hooks/useAreaModal";
import { objIsEmpty } from "@/utils/isObjectEmpty";
import { OptionType, useAreaStore } from "./store/useAreaStore";

import {
  ModalBody, 
  ModalCloseButton,
  ModalFooter,
  ModalOverlay, 
  VStack,
} from "@chakra-ui/react";

import { ControlledSelect, Input, TextArea, useInputCompanies } from "@/components/Inputs";
import { CancelButton } from "@/components/Button";
import { AreaModalFormTypes } from "./types/AreaModalFormTypes";
import { Modal, ModalContent, ModalForm, ModalHeader } from "../components";
import { SaveButton } from "@/components/Button";


export function AreaModal() {

  const { isOpen, onClose, areaToEdit, companyValue, departmentOptions } = useAreaStore();

  const { companiesGroupOptions } = useInputCompanies();

  const {
    register,
    handleSubmit,
    control,
    reset,
    errors,
    showToast,
    onSubmitAreaModal,
    handleCompanyChange,
    setSelectInputOptionsOnForm
  } = useAreaModal()

  useEffect(() => { 
    if(areaToEdit){
      setSelectInputOptionsOnForm(areaToEdit);
      //reset do form para edição de dados
      reset({
        companyName: {
          label: areaToEdit.companyName,
          value: areaToEdit.companyName,
        },
        departmentName: {
          label: areaToEdit.departmentName,
          value: areaToEdit.departmentName,
        },
        areaName: areaToEdit.areaName,
        numberOfEmployees: areaToEdit.numberOfEmployees,
        description: areaToEdit.description,
      });
    } else {
      //reset do form para adicionar novo
      reset({
        areaName: "",
        companyName: null,
        departmentName: null,
        description: "",
        numberOfEmployees: "",
      });
    }
  },[areaToEdit, reset]);  

  useEffect(() => {
    console.log();
  }, [companyValue]);


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {objIsEmpty(areaToEdit) ? "Adicionar Área" : "Editar Área"}
        </ModalHeader>
        <ModalCloseButton top="1rem" right="1.25rem" />

        <ModalBody>
          <ModalForm  
            id="AreaModalListenOnSubmit" //para o botao submit encontrar o form
            onSubmit={handleSubmit(onSubmitAreaModal)}
          >
            <VStack spacing="4">

              {/**Input Nome da Empresa */}
              <ControlledSelect<AreaModalFormTypes, OptionType, false>
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

              <ControlledSelect<AreaModalFormTypes, OptionType, false>
                name="departmentName"
                control={control}
                label="Nome do Setor"
                placeholder="Selecione o Setor"
                options={departmentOptions}
                useBasicStyles
              />
              {
                errors.departmentName &&
                showToast("O campo Nome do Setor é obrigatório.", "error")
              }

              <Input 
                type="text" 
                placeholder="Informe" 
                label="Nome da Área"
                {...register("areaName", { required: true })}
              />
              {
                errors.areaName?.message &&
                showToast(`${errors.areaName.message}`, "error")
              }

              <Input 
                type="number" 
                placeholder="Informe um número" 
                label="N° de Funcionários"
                {...register("numberOfEmployees", { required: true })}
              />
              {
                errors.numberOfEmployees?.message &&
                showToast(`${errors.numberOfEmployees.message}`, "error")
              }

              <TextArea 
                type="text" 
                placeholder="Informe alguma descrição da área.." 
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

          <SaveButton form="AreaModalListenOnSubmit" />

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
