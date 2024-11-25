import { z } from 'zod'

import { id } from './generic'

export const user = z.object({
	id,
	username: z.string().min(3).max(100),
	password: z.string(),
	gender: z.enum(['Female', 'Male', 'Prefer not to disclose']),
})

export type User = z.infer<typeof user>
