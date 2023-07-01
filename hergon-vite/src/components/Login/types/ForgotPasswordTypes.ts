import { z } from "zod";
import { ForgotPasswordSchema } from "../schema/ForgotPasswordSchema";

export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;