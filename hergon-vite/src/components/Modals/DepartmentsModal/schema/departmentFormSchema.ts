import { z } from "zod";
import { companiesSchema } from "../../UserModal/schema/companiesSchema";

export const departmentFormSchema = z.object({
  companyName: companiesSchema.nullable().refine((value) => value !== null, {
    message: "O campo Nome da empresa é obrigatório",
    //A propriedade path no método refine() do Zod é usada para especificar o caminho do erro personalizado dentro do objeto validado. Ela ajuda a indicar exatamente qual campo possui o erro quando ocorre uma validação personalizada.
    path: ["company"],
  }),
  departmentName: z.string().min(1, "O nome do setor é obrigatório e deve conter no mínimo 1 caractere."),
  description: z.string().optional(),
});