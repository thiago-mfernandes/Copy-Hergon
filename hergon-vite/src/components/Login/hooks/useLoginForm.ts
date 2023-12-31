import { useAuth } from "@/contexts/Auth";
import { useShowToast } from "../../../hooks/useShowToast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLoginTypes } from "../types/FormLoginTypes";
import { FormLoginSchema } from "../schema/FormLoginSchema";

export function useLoginForm() {

  const { showToast } = useShowToast(); 
  const { signIn } = useAuth(); 

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormLoginTypes>({
    resolver: zodResolver(FormLoginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  async function handleForm(data: FormLoginTypes) {
    await signIn(data);
  }

  return {
    register, 
    handleSubmit,
    errors,
    handleForm,
    showToast
  }
}