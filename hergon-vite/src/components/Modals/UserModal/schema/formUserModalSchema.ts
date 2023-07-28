import { z } from "zod";
import { companiesSchema } from "./companiesSchema";
import { typeOfPermissionsSchema } from "./typeOfPermissionsSchema";

//2.formulario adicionar usuario schema
export const formUserModalSchema = z.object({
  //No contexto do Zod, o método nullable() é usado para permitir que um campo seja null ou undefined. Ele adiciona a opção de o campo estar ausente ou ter um valor nulo.
  company: companiesSchema.nullable().refine((value) => value !== null, {
    message: "O campo Nome da Empresa é obrigatório.",
    //A propriedade path no método refine() do Zod é usada para especificar o caminho do erro personalizado dentro do objeto validado. Ela ajuda a indicar exatamente qual campo possui o erro quando ocorre uma validação personalizada.
    path: ["company"],
  }),
  role: typeOfPermissionsSchema.nullable().refine((value) => value !== null, {
    message: "O campo Tipo de Permissão é obrigatório.",
    path: ["role"],
  }),
  name: z.string().min(3, "O nome deve conter no mínimo 3 caracteres."),
  email: z.string().min(6, 'Digite um email válido.'),
  area: z.string().min(1, "A area deve conter no mínimo 1 caractere."),
});