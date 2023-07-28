import { z } from "zod";
import { departmentSchema } from "../../DepartmentsModal/schema/departmentSchema";
import { companiesSchema } from "../../UserModal/schema/companiesSchema";

export const areaFormSchema = z.object({
  companyName: companiesSchema.nullable().refine((value) => value !== null, {
    message: "O campo Nome da empresa é obrigatório",
    //A propriedade path no método refine() do Zod é usada para especificar o caminho do erro personalizado dentro do objeto validado. Ela ajuda a indicar exatamente qual campo possui o erro quando ocorre uma validação personalizada.
    path: ["companyName"],
  }),
  departmentName: departmentSchema.nullable().refine((value) => value !== null, {
    message: "O campo Nome do Setor é obrigatório",
    //A propriedade path no método refine() do Zod é usada para especificar o caminho do erro personalizado dentro do objeto validado. Ela ajuda a indicar exatamente qual campo possui o erro quando ocorre uma validação personalizada.
    path: ["departmentName"],
  }),
  areaName: z.string().min(1, "O nome da área é obrigatório e deve conter no mínimo 1 caractere."),  
  numberOfEmployees: z
    .string() // Aceita uma string
    .refine((value) => parseInt(value) >= 1, "Esta área deve conter no mínimo 1 colaborador."),
  description: z.string().optional(),
});