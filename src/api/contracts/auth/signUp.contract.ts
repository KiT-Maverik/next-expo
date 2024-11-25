import { z } from 'zod'

import { user } from 'api/entities'

const request = user.omit({ id: true })

const response = user

export const signUpContract = { response, request }

export type SignUp_Request = z.infer<typeof request>
export type SignUp_Response = z.infer<typeof response>
