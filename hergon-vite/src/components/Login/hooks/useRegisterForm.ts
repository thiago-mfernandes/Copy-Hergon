import { useShowToast } from "@/hooks/useShowToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterFormSchema } from "../schema/RegisterFormSchema";
import { RegisterFormTypes } from "../types/RegisterFormTypes";

export function useRegisterForm() {
  
  const { showToast } = useShowToast(); 

  async function handleForm(data: any) {
    showToast("Solicitação de acesso enviada com sucesso. Verifique sua caixa de email ou spam.", "info", 8000);
  }
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<RegisterFormTypes>({
    resolver: zodResolver(RegisterFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  return {
    showToast,
    handleForm,
    register,
    handleSubmit,
    errors
  }
}