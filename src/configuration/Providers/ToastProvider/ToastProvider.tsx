'use client'

import { Alert, Snackbar, Slide, AlertTitle } from '@mui/material'

import { useToast } from './ToastProvider.hooks'

export const ToastProvider = () => {
	const {
		toast: { open, type, title, duration, message },
		hideToast,
		resetToastParams,
	} = useToast()

	return (
		<Snackbar
			open={open}
			onClose={hideToast}
			autoHideDuration={duration}
			TransitionComponent={Slide}
			TransitionProps={{
				onExited: resetToastParams,
			}}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		>
			<Alert severity={type}>
				{title && <AlertTitle>{title}</AlertTitle>}
				{message}
			</Alert>
		</Snackbar>
	)
}
