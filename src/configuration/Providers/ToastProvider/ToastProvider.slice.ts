import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { AlertColor } from '@mui/material'

export interface ToastState {
	open: boolean
	message: string
	title?: string
	type?: AlertColor
	duration?: number | null
}

const toastDefaultParams: Required<ToastState> = {
	open: false,
	message: '',
	title: '',
	type: 'info',
	duration: 2000,
}

const initialState: ToastState = {
	...toastDefaultParams,
}

export type OpenToastAction = Omit<ToastState, 'open'>

export const toastSlice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		hideToast: (state): ToastState => ({
			...state,
			open: false,
		}),
		resetToastParams: (): ToastState => initialState,
		showToast: (_, action: PayloadAction<OpenToastAction>): ToastState => ({
			...action.payload,
			open: true,
		}),
	},
})

export const toast = toastSlice.reducer
