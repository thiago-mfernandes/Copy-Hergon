import { z } from "zod";

//objeto de validação dos dados
export const RegisterFormSchema = z.object({
  userName: z.string().min(3, 'O nome deve conter no mínimo 3 caracteres.'),
  userEmail: z.string().min(6, 'Digite um email válido.'),
  userPhone: z.string().min(8, 'O telefone deve conter no mínimo 8 caracteres.'),
  userType: z.enum([ "Empresa", "Prestador de Serviço"]),
  userCity: z.string().min(8, 'Informe a cidade de nascimento'),
  userState: z.string().min(2, 'Informe o estado que você reside atualmente.'),
});