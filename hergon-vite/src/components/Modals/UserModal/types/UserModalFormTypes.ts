import { z } from "zod";
import { formUserModalSchema } from "../schema/formUserModalSchema";

//2.tipo formulario
export type UserModalFormTypes = z.infer<typeof formUserModalSchema>;

