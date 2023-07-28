import { z } from "zod";
import { companySchema } from "../schema/companySchema";

export type CompanyFormType = z.infer<typeof companySchema>;