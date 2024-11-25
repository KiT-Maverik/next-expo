import { useMutation } from '@tanstack/react-query'

import { endpoint } from 'api/constants'
import { LogIn_Request, LogIn_Response } from 'api/contracts'
import { api } from 'configuration'
import { useToast } from 'configuration/Providers'

export const useLogInMutation = (successHandlerExtension?: () => void) => {
	const { showToast } = useToast()

	const logIn = useMutation({
		mutationFn: async (data: LogIn_Request) =>
			await api.post<LogIn_Response>(endpoint.auth.logIn, {
				data,
			}),
		onSuccess: () => {
			if (successHandlerExtension) successHandlerExtension()
		},
		onError: () => showToast({ type: 'error', message: 'Failed to log in' }),
	})

	return { logIn }
}
