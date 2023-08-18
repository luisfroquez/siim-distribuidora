import { z } from 'zod'

export type RequestQuoteInputTypes = z.infer<typeof requestQuoteSchema>

export const requestQuoteSchema = z.object({
  name: z.string().min(1, { message: 'Requerido' }),
  lastName: z.string().min(1, { message: 'Requerido' }),
  email: z.string().email({
    message: 'Por favor ingrese un correo válido',
  }),
  phone: z.string().optional(),
  rut: z.string().optional(),
  razonSocial: z.string().optional(),
  comments: z.string().optional(),
})
