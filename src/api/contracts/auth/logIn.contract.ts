import { z } from 'zod'

import { user } from 'api/entities'

const request = user.pick({ username: true, password: true })

const response = z.object({
	authToken: z.string(),
})

export const logInContract = { request, response }

export type LogIn_Request = z.infer<typeof request>
export type LogIn_Response = z.infer<typeof response>
