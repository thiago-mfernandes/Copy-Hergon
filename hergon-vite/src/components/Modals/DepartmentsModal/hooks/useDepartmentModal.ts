import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useShowToast } from "@/hooks/useShowToast";
import { DepartmentServices, DepartmentsData } from "@/services/http/departments/DepartmentServices";
import { queryClient } from "@/services/queryClient";
import { objIsEmpty } from "@/utils/isObjectEmpty";
import { v4 as uuidv4 } from 'uuid';
import { useInputCompanies } from "@/components/Inputs";
import { DepartmentModalFormTypes } from "../types/DepartmentModalFormTypes";
import { departmentFormSchema } from "../schema/departmentFormSchema";
import { useDepartmentStore } from "../store/useDepartmentStore";
import { useEffect } from "react";
import { useCheckboxStore } from "@/components/Checkbox/store/useCheckboxStore";
import { useDeleteManyStore } from "../../DeleteManyModal/store/useDeleteManyStore";

export function useDepartmentModal(){

  const { onClose, departmentToEdit } = useDepartmentStore();
  const { setSelectedCheckbox } = useCheckboxStore();
  const { onDeleteManyModalClose } = useDeleteManyStore();

  const { 
    register, 
    handleSubmit, 
    control, 
    reset, 
    formState: { errors }
  } = useForm<DepartmentModalFormTypes>({
    resolver: zodResolver(departmentFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      companyName: null,
      departmentName: "",
      description: "",
    }
  });

  //companiesGroupOptions traz os itens que serao exibidos no select
  //data traz todas as companies com os id's
  const { companiesGroupOptions, data: companiesData } = useInputCompanies();

  const navigate = useNavigate();
  const { showToast } = useShowToast();
  
  async function addDepartment(data: DepartmentModalFormTypes){

    const macthCompany = companiesData?.find((element) => element.companyName === data.companyName?.label);
    
    const newDepartment: DepartmentsData = {
      id: uuidv4(),
      companyId: macthCompany?.id,
      companyName: macthCompany?.companyName,
      departmentName: data.departmentName,
      description: data.description ? data.description : "-",
    }
    //envio a requisicao
    const response = await DepartmentServices.add(newDepartment);

    if(response?.status === 201) {
      //em caso de sucesso
      showToast("Setor criado com sucesso.", "info");
      //revalidar os dados da tabela de setores
      queryClient.invalidateQueries(["departmentsData"]);
      //limpar o modal
      reset();
      //fechar o modal
      onClose(); 
    } else {
      showToast("Não foi possível adicionar o setor. Tente Novamente.", "error");
    }
    
    navigate("/departments");
  }

  async function editDepartment(_id: string, data: DepartmentModalFormTypes) {
    
    //const editedDepartment = {...departmentToEdit, ...data};
    if (departmentToEdit && departmentToEdit.id) {

      const editedDepartment: DepartmentsData = {
        id: departmentToEdit.id,
        companyId: departmentToEdit.companyId,
        companyName: data.companyName?.value,
        departmentName: data.departmentName,
        description: data.description,
      }
      //envio a requisicao
      const response = await DepartmentServices.edit(editedDepartment);
  
      if(response?.status === 200) {
        //em caso de sucesso
        showToast("Setor editado com sucesso.", "info");
        //revalidar os dados da tabela de setores
        queryClient.invalidateQueries(["departmentsData"]);
        //limpar o modal
        reset();
        //fechar o modal
        onClose();
      } else {
        showToast("Não foi possível editar o setor. Tente Novamente.", "error");
      }
      
      navigate("/departments");

    }

  }
  
  async function removeDepartment(id: string) {

    //envio a requisição
    const response = await DepartmentServices.remove(id);

    if(response?.status === 200) {
      //em caso de sucesso
      showToast("Setor excluído com sucesso.", "info");
      //revalidar os dados da tabela de Departamentos
      queryClient.invalidateQueries(["departmentsData"]);
      //limpar o modal
      reset();
      //fechar o modal
      onClose();
    } else {
      showToast("Não foi possível excluir o setor. Tente Novamente.", "error");
    } 
  }

  async function removeAllDepartment(data: string[]) {
    const response = await DepartmentServices.removeAll(data);

    if(response == 200) {
      showToast("Setores removidos com sucesso", "info");
      queryClient.invalidateQueries(["departmentsData"]);
      setSelectedCheckbox([]);
      onDeleteManyModalClose();
    } else {
      showToast("Não foi possível excluir os setores. Tente novamente.", "error");
    }
  }

  async function onSubmitDepartmentModal(data: DepartmentModalFormTypes) {
    if(objIsEmpty(departmentToEdit)) {
      await addDepartment(data);
    } else {
      if(departmentToEdit?.id !== undefined){
        await editDepartment(departmentToEdit.id, data);        
      }
    }
  }

  useEffect(() => {
    if (departmentToEdit) {
      //reset do form para edição
      reset({
        companyName: {
          label: departmentToEdit.companyName,
          value: departmentToEdit.companyName,
        },
        departmentName: departmentToEdit.departmentName,
        description: departmentToEdit.description,
      });
    } else {
      //reset do form para adicionar novo
      reset({
        companyName: null,
        departmentName: "",
        description: "",
      });
    }
  }, [departmentToEdit, reset]);

  return {
    showToast,
    register,
    handleSubmit, 
    control,
    reset,
    errors,
    addDepartment,
    editDepartment,
    removeDepartment,
    removeAllDepartment,
    onSubmitDepartmentModal,
    onClose,
    companiesGroupOptions,
  }
}