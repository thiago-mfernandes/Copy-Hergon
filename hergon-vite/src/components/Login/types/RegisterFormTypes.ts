import { z } from "zod";
import { RegisterFormSchema } from "../schema/RegisterFormSchema";

// tipagem de dados
export type RegisterFormTypes = z.infer<typeof RegisterFormSchema>;