import { useShowToast } from "@/hooks/useShowToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPasswordTypes } from "../types/ForgotPasswordTypes";
import { ForgotPasswordSchema } from "../schema/ForgotPasswordSchema";

export function useForgotPasswordForm() {

  const { showToast } = useShowToast(); 

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ForgotPasswordTypes>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  async function handleForm(data: ForgotPasswordTypes) {
    showToast("Resetamos sua senha e enviamos um email com as instruções de acesso. Verifique seu email ou caixa de span.", "info", 8000);
  }
  
  return {
    showToast,
    register,
    handleSubmit,
    errors,
    handleForm,
  }
}