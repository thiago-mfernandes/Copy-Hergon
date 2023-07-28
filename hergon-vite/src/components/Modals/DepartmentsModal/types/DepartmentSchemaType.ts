import { z } from "zod";
import { departmentSchema } from "../schema/departmentSchema";

export type DepartmentSchemaType = z.infer<typeof departmentSchema>;