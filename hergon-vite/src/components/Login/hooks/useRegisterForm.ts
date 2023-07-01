import { useShowToast } from "@/hooks/useShowToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterFormSchema } from "../schema/RegisterFormSchema";
import { RegisterFormData } from "../types/RegisterFormTypes";

export function useRegisterForm() {
  
  const { showToast } = useShowToast(); 

  async function handleForm(data: any) {
    console.log(data);
    showToast("Solicitação de acesso enviada com sucesso. Verifique sua caixa de email ou spam.", "success", 8000)
    //await signIn(data);
  }
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<RegisterFormData>({
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