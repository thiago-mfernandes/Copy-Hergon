import { z } from "zod";
import { departmentFormSchema } from "../schema/departmentFormSchema";

export type DepartmentModalFormTypes = z.infer<typeof departmentFormSchema>;