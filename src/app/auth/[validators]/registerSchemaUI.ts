import { z } from "zod"

export const registerFormSchema = z.object({
  name: z.string().email(),
  email: z.string().email(),
  password: z.string().min(10),
})

export type registerFormData = z.infer<typeof registerFormSchema>