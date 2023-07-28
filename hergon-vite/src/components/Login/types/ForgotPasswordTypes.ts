import { z } from "zod";
import { ForgotPasswordSchema } from "../schema/ForgotPasswordSchema";

export type ForgotPasswordTypes = z.infer<typeof ForgotPasswordSchema>;