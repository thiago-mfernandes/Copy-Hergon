import { z } from "zod";
import { areaFormSchema } from "../schema/areaFormSchema";

export type AreaModalFormTypes = z.infer<typeof areaFormSchema>;