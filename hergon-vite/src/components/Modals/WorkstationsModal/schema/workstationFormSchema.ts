import { z } from "zod";
import { companiesSchema } from "../../UserModal/schema/companiesSchema";
import { departmentSchema } from "../../DepartmentsModal/schema/departmentSchema";
import { areaSchema } from "./areaSchema";

export const workstationsFormSchema = z.object({
  companyName: companiesSchema.refine((value) => value !== null, {
    message: "O campo Nome da empresa é obrigatório",
    //A propriedade path no método refine() do Zod é usada para especificar o caminho do erro personalizado dentro do objeto validado. Ela ajuda a indicar exatamente qual campo possui o erro quando ocorre uma validação personalizada.
    path: ["companyName"],
  }),
  departmentName: departmentSchema.refine((value) => value !== null, {
    message: "O campo Nome do Setor é obrigatório",
    //A propriedade path no método refine() do Zod é usada para especificar o caminho do erro personalizado dentro do objeto validado. Ela ajuda a indicar exatamente qual campo possui o erro quando ocorre uma validação personalizada.
    path: ["departmentName"],
  }),
  areaName: areaSchema.refine((value) => value !== null, {
    message: "O campo Nome da área é obrigatório",
    //A propriedade path no método refine() do Zod é usada para especificar o caminho do erro personalizado dentro do objeto validado. Ela ajuda a indicar exatamente qual campo possui o erro quando ocorre uma validação personalizada.
    path: ["areaName"],
  }),
  role: z.string().min(3, "O nome da função é obrigatório e deve conter no mínimo 3 caracteres."),
  description: z.string().optional(),
});