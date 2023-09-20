import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAreaStore, OptionType } from "../store/useAreaStore";
import { useShowToast } from "@/hooks/useShowToast";
import { AreaModalFormTypes } from "../types/AreaModalFormTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { areaFormSchema } from "../schema/areaFormSchema";
import { objIsEmpty } from "@/utils/isObjectEmpty";
import { v4 as uuidv4 } from 'uuid';
import { AreaData, AreaServices } from "@/services/http/areas/AreaServices";
import { queryClient } from "@/services/queryClient";
import { DepartmentsData } from "@/services/http/departments/DepartmentServices";
import { api } from "@/services/axios";
import { useCheckboxStore } from "@/components/Checkbox/store/useCheckboxStore";
import { useDeleteManyStore } from "../../DeleteManyModal/store/useDeleteManyStore";

export function useAreaModal() {

  const { showToast } = useShowToast();
  const navigate = useNavigate();
  const { onDeleteManyModalClose } = useDeleteManyStore();
  const { setSelectedCheckbox } = useCheckboxStore();
  const { onClose, areaToEdit, setDepartmentOptions, setCompanyValue } = useAreaStore();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<AreaModalFormTypes>({
    resolver: zodResolver(areaFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      areaName: "",
      companyName: null,
      departmentName: null,
      description: "",
      numberOfEmployees: "",
    }
  });

  async function addArea(data: AreaModalFormTypes) {
    
    const newArea: AreaData = {
      id: uuidv4(),
      areaName: data.areaName,
      departmentName: data.departmentName?.value,
      companyName: data.companyName?.value,
      numberOfEmployees: data.numberOfEmployees,
      description: data.description ? data.description : "-",
    }

    const response = await AreaServices.add(newArea);

    if (response?.status === 201) {
      //em caso de sucesso
      showToast("Área criada com sucesso.", "info");
      //revalidar os dados da tabela de areas
      queryClient.invalidateQueries(["areasData"]);
      //limpar o form
      reset();
      //fechar o modal
      onClose();
    } else {
      showToast("Não foi possível adicionar a área. Tente Novamente.", "error");
    }

    navigate("/areas");
  }

  async function editArea(_id: string, data: AreaModalFormTypes) {
    
    //spread das antigas informacoes e novas informacoes
    if(areaToEdit &&  areaToEdit.id) {

      const editedArea: AreaData = { 
        id: areaToEdit.id,
        companyName: data.companyName?.value,
        departmentName: data.departmentName?.value,
        areaName: data.areaName,
        numberOfEmployees: data.numberOfEmployees,
        description: data.description,
      };
        
      //envio a requisicao
      const response = await AreaServices.edit(editedArea);
  
      if (response?.status === 200) {
        //em caso de sucesso
        showToast("Área editada com sucesso.", "info");
        //revalidar os dados da tabela de areas
        queryClient.invalidateQueries(["areasData"]);
        //limpar o form
        reset();
        //fechar o modal
        onClose();
      } else {
        showToast("Não foi possível editar a área. Tente Novamente.", "error");
      }
  
      navigate("/areas");
    }
  }

  async function removeArea(id: string) {
    const response = await AreaServices.remove(id);

    if (response?.status === 200) {
      //em caso de sucesso
      showToast("Área excluída com sucesso.", "info");
      //revalidar os dados da tabela de Areas
      queryClient.invalidateQueries(["areasData"]);
      //fechar o modal
      onClose();
    } else {
      showToast("Não foi possível excluir a área. Tente Novamente.", "error");
    }
  }

  async function removeAllArea(data: string[]) {

    
    const response = await AreaServices.removeAll(data);
    console.log("response =>", data);

    if(response == 200) {
      showToast("Áreas removidas com sucesso", "info");
      queryClient.invalidateQueries(["areasData"]);
      setSelectedCheckbox([]);
      //fechar o modal
      onDeleteManyModalClose();
    } else {
      showToast("Não foi possível excluir as áreas. Tente novamente.", "error");
    }
  }

  async function handleCompanyChange(selectedCompany: OptionType) {
    //selectedCompany é capturado no onChange no input companyName
    if (selectedCompany?.value) {
      //obtenho todos os dados novamente
      const { data } = await api.get<DepartmentsData[]>("/departments");
      //filtro os objetos de departments onde o companyName for igual ao do input selecionado
      const filteredDepartments = data.filter(
        (department: DepartmentsData) => department.companyName === selectedCompany.value
      );
      //monto um array de opcoes com os valores dos departamentos
      const departmentOptionsArray = filteredDepartments.map(
        (department: DepartmentsData) => ({
          label: department.departmentName,
          value: department.departmentName,
        })
      );
      if (departmentOptionsArray.length > 0) {
        setDepartmentOptions(departmentOptionsArray);
      }
    } else {
      setDepartmentOptions([]);
    }

    setCompanyValue([selectedCompany]);
  }

  function setSelectInputOptionsOnForm(areaToEdit: AreaData) {
    handleCompanyChange({ label: areaToEdit.companyName, value: areaToEdit.companyName })
  }

  async function onSubmitAreaModal(data: AreaModalFormTypes) {
    if (objIsEmpty(areaToEdit)) {
      await addArea(data);
    } else {
      if (areaToEdit?.id !== undefined) {
        await editArea(areaToEdit.id, data);
      }
    }
  }

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return {
    showToast,
    register,
    handleSubmit,
    control,
    reset,
    errors,
    addArea,
    editArea,
    removeArea,
    removeAllArea,
    handleCompanyChange,
    onSubmitAreaModal,
    setSelectInputOptionsOnForm
  }
}