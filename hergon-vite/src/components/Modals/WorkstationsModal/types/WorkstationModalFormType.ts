import { z } from "zod";
import { workstationsFormSchema } from "../schema/workstationFormSchema";

export type WorkstationModalFormType = z.infer<typeof workstationsFormSchema>;