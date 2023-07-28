import { z } from "zod";
import { companiesSchema } from "../schema/companiesSchema";

//1.tipo do schema select/options empresas
export type SelectedCompaniesType = z.infer<typeof companiesSchema>;