import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WorkstationModalFormType } from "../types/WorkstationModalFormType";
import { workstationsFormSchema } from "../schema/workstationFormSchema";
import { useShowToast } from "@/hooks/useShowToast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { OptionType } from "../../AreaModal/store/useAreaStore";
import { useAuth } from "@/contexts/Auth";
import { api } from "@/services/axios";
import { v4 as uuidv4 } from 'uuid';
import { DepartmentsData } from "@/services/http/departments/DepartmentServices";
import { AreaData } from "@/services/http/areas/AreaServices";
import { WorkstationData, WorkstationServices } from "@/services/http/workstations/WorkstationServices";
import { queryClient } from "@/services/queryClient";
import { objIsEmpty } from "@/utils/isObjectEmpty";
import { useWorkstationStore } from "../store/useWorkstationStore";
import { useCheckboxStore } from "@/components/Checkbox/store/useCheckboxStore";
import { useDeleteManyStore } from "../../DeleteManyModal/store/useDeleteManyStore";


export function useWorkstationModal(){

  const { showToast } = useShowToast();
  const { onDeleteManyModalClose } = useDeleteManyStore();
  const { setSelectedCheckbox } = useCheckboxStore();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<WorkstationModalFormType>({
    resolver: zodResolver(workstationsFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      companyName: undefined,
      departmentName: undefined,
      areaName: undefined,
      role: "",
      description: "",
    }
  });

  const { 
    workstationToEdit, 
    onClose, 
    setDepartmentOptions, 
    setCompanyValue, 
    setAreaOptions, 
    setDepartmentValue
  } = useWorkstationStore();

  
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
  
  async function handleDepartmentChange(selectedDepartment: OptionType) {
        
    //selectedCompany é capturado no onChange no input companyName
    if (selectedDepartment?.value) {
      //obtenho todos os dados novamente
      const { data } = await api.get<AreaData[]>("/areas");
      //filtro os objetos de departments onde o companyName for igual ao do input selecionado
      const filteredAreas = data.filter(
        (area: AreaData) => area.departmentName === selectedDepartment.value
      );
      //monto um array de opcoes com os valores dos departamentos
      const areaOptionsArray = filteredAreas.map(
        (area: AreaData) => ({
          label: area.areaName,
          value: area.areaName,
        })
      );
      //se meu array tiver alguma coisa
      if (areaOptionsArray.length > 0) {
        setAreaOptions(areaOptionsArray);
      } else {
      //se meu array estiver vazio, aviso o usuario que não existe area cadastrada neste setor.
        setAreaOptions([]);
      }
    } else {
      setAreaOptions([]);
    }    
    setDepartmentValue([selectedDepartment]);
  }
  
  async function addWorkstation(data: WorkstationModalFormType) {
    
    const newWorkstation: WorkstationData = {
      id: uuidv4(),
      userId: user.id,
      role: data.role,
      companyName: data.companyName.value,
      departmentName: data.departmentName.value,
      areaName: data.areaName?.value,
      description: data.description,
    }
    
    const response = await WorkstationServices.add(newWorkstation);

    if(response?.status === 201) {
      //em caso de sucesso
      showToast("Posto de Trabalho criado com sucesso", "info");
      //revalidar os dados da tabela de workstations    }
      queryClient.invalidateQueries(["workstationData"]);
      //limpar o form
      reset();
      //fechar o modal
      onClose();
    } else {
      showToast("Não foi possível adicionar o posto de trabalho. Tente novamente.", "error");
    }

    navigate("/workstations")
  }

  async function editWorkstation(_id: string, data: WorkstationModalFormType) {
    
    if (workstationToEdit && workstationToEdit.id) {
      
      const editedWorkstation: WorkstationData = { 
        id: workstationToEdit.id,
        userId: user.id,
        companyName: data.companyName.value,
        departmentName: data.departmentName.value,
        areaName: data.areaName?.value,
        role: data.role,
        description: data.description,     
      }
      
      const response = await WorkstationServices.edit(editedWorkstation);
      
      if (response?.status === 200) {
        //em caso de sucesso
        showToast("Posto de trabalho editado com sucesso.", "info");
        //revalidar os dados da tabela de workstations
        queryClient.invalidateQueries(["workstationData"]);
        //limpar o form
        reset();
        //fechar o modal
        onClose();
      } else {
        showToast("Não foi possível editar o posto de trabalho. Tente Novamente.", "error");
      }  
      navigate("/workstations");
    }
  }

  async function removeWorkstation(id: string) {
    const response = await WorkstationServices.remove(id);

    if (response?.status === 200) {
      //em caso de sucesso
      showToast("Posto de trabalho excluído com sucesso.", "info");
      //revalidar os dados da tabela de Postos de trabalho
      queryClient.invalidateQueries(["workstationData"]);
      //fechar o modal
      onClose();
    } else {
      showToast("Não foi possível excluir o posto de trabalho. Tente Novamente.", "error");
    }
  }  

  async function removeAllWorkstations(data: string[]) {
    const response = await WorkstationServices.removeAll(data);

    if(response == 200) {
      showToast("Postos de trabalho removidos com sucesso.", "info");
      queryClient.invalidateQueries(["workstationData"]);
      setSelectedCheckbox([]);
      //fechar o modal
      onDeleteManyModalClose();
    } else {
      showToast("Não foi possível remover todos os postos de trabalho. Tente novamente.", "error");
    }
  }

  async function onSubmitWorkstationModal(data: WorkstationModalFormType) {
    
    if (objIsEmpty(workstationToEdit)) {
      await addWorkstation(data);
    } else {
      if (workstationToEdit?.id !== undefined) {
        await editWorkstation(workstationToEdit.id, data);
      }
    }
  }

  function setSelectInputOptionsOnForm(workstationToEdit: WorkstationData) {
    //aqui vai setar os departmentOptions do input Nome do Setor
    handleCompanyChange({ label: workstationToEdit.companyName, value: workstationToEdit.companyName })
    //aqui vai setar o areaOptions do input Nome da Área
    handleDepartmentChange({ label: workstationToEdit.departmentName, value: workstationToEdit.departmentName })
  }

  useEffect(() => {
    //reset do form para edição de dados
    if(workstationToEdit) {
      setSelectInputOptionsOnForm(workstationToEdit);
      reset({
        companyName: {
          label: workstationToEdit.companyName,
          value: workstationToEdit.companyName,
        },
        departmentName: {
          label: workstationToEdit.departmentName,
          value: workstationToEdit.departmentName,
        },
        areaName: {
          label: workstationToEdit.areaName,
          value: workstationToEdit.areaName,
        },
        description: workstationToEdit.description,
        role: workstationToEdit.role
      });
    } else {
      //reset do form para adicionar novo
      reset({
        companyName: undefined,
        departmentName: undefined,
        areaName: undefined,
        description: "",
        role: "",
      });
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[workstationToEdit]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);
  
  return {
    showToast,
    register,
    handleSubmit,
    control,
    errors,
    reset,
    addWorkstation,
    editWorkstation,
    removeWorkstation,
    removeAllWorkstations,
    onSubmitWorkstationModal,
    handleCompanyChange,
    handleDepartmentChange,
    navigate,
  }
}