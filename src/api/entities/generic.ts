import { z } from 'zod'

export const id = z.string().uuid()
export type Id = z.infer<typeof id>

export const message = z.object({ message: z.string() })

export const paginator = z.object({
	offset: z.number().positive(),
	limit: z.number().positive(),
})
