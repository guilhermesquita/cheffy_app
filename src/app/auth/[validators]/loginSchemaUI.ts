import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10),
})

export type loginFormData = z.infer<typeof loginFormSchema>