import { useShowToast } from "@/hooks/useShowToast";
import { CompanieServices, CompaniesData } from "@/services/http/companies/CompanieServices";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CompanyFormType } from "../types/CompanyFormType";
import { companySchema } from "../schema/companySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { objIsEmpty } from "@/utils/isObjectEmpty";
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "@/contexts/Auth";
import { queryClient } from "@/services/queryClient";
import { useCompanieStore } from "../store/useCompanieStore";
import { useEffect } from "react";

export function useCompaniesModal() {

  const { user } = useAuth();
  const { onClose, companieToEdit } = useCompanieStore();
  const { showToast } = useShowToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyFormType>({
    resolver: zodResolver(companySchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      companyName: "",
    }
  });

  async function addCompany(data: CompanyFormType) {
    //construo um objeto do tipo
    const newCompany: CompaniesData = {
      id: uuidv4(),
      userId: user.id,
      companyName: data.companyName,
    }
    //envio a requisicao
    const response = await CompanieServices.add(newCompany);

    if(response.status === 201) {
      //em caso de sucesso
      showToast("Empresa criada com sucesso.", "info");
      //revalidar os dados da tabela de empresas
      queryClient.invalidateQueries(["companiesData"]);
      //limpar o modal
      reset();
      //fechar o modal
      onClose();
    } else {
      showToast("Não foi possível adicionar a empresa. Tente Novamente.", "error");
    }

    navigate("/companies");
  }

  async function editCompany(_id: string, data: CompanyFormType) {
      
    if (companieToEdit && companieToEdit.id) {

      const editedCompanie: CompaniesData = {
        id: companieToEdit.id,
        userId: companieToEdit.userId,
        companyName: data.companyName,        
      }  
  
      //envio a resquisicao
      const response = await CompanieServices.edit(editedCompanie);
  
      if(response.status === 200) {
        //em caso de sucesso
        showToast("Empresa editada com sucesso.", "info");
        //revalidar os dados da tabela de empresas
        queryClient.invalidateQueries(["companiesData"]);
        //limpar o modal
        reset();
        //fechar o modal
        onClose();
      } else {
        showToast("Não foi possível editar e empresa. Tente Novamente.", "error");
      }
  
      navigate("/companies");
    }
  }

  async function removeCompany(id: string) {
    //envio a requisicao
    const response = await CompanieServices.remove(id);

    if(response.status === 200) {
      //em caso de sucesso
      showToast("Empresa excluída com sucesso.", "info");
      //revalidar os dados da tabela de empresas
      queryClient.invalidateQueries(["companiesData"]);
      //limpar o modal
      reset();
      //fechar o modal
      onClose();
    } else {
      showToast("Não foi possível excluir a empresa. Tente Novamente.", "error");
    }
  }
  
  async function onSubmitCompanyModal(data: CompanyFormType) {
    if(objIsEmpty(companieToEdit)) {
      await addCompany(data);
    } else {
      if(companieToEdit?.id !== undefined) {
        await editCompany(companieToEdit?.id, data);
      }
    }
  }

  useEffect(() => {
    if(companieToEdit) {
      //reset do form para edição de dados
      reset({
        companyName: companieToEdit.companyName,
      });
    } else {
      //reset do form para adicionar novo
      reset({
        companyName: ""
      });
    }
  },[companieToEdit, reset])

  return {
    showToast,
    register,
    handleSubmit,
    reset,
    errors,
    addCompany,
    editCompany,
    removeCompany,
    onSubmitCompanyModal,
    onClose
  }
}