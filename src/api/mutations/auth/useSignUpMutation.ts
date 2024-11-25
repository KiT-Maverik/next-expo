import { useMutation } from '@tanstack/react-query'

import { endpoint } from 'api/constants'
import { SignUp_Request, SignUp_Response } from 'api/contracts'
import { api } from 'configuration'
import { useToast } from 'configuration/Providers'

export const useSignUpMutation = (successHandlerExtension?: () => void) => {
	const { showToast } = useToast()

	const signUp = useMutation({
		mutationFn: async (data: SignUp_Request) =>
			await api.post<SignUp_Response>(endpoint.auth.signUp, {
				data,
			}),
		onSuccess: () => {
			if (successHandlerExtension) successHandlerExtension()
		},
		onError: () => showToast({ type: 'error', message: 'Failed to sign up' }),
	})

	return { signUp }
}
