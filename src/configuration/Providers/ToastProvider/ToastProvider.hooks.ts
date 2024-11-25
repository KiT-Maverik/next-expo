import { RootState, useAppDispatch, useAppSelector } from '../../App.store'
import { toastSlice, OpenToastAction } from './ToastProvider.slice'

export const useToast = () => {
	const dispatch = useAppDispatch()

	return {
		hideToast: () => dispatch(toastSlice.actions.hideToast()),
		resetToastParams: () => dispatch(toastSlice.actions.resetToastParams()),
		showToast: (payload: OpenToastAction) => dispatch(toastSlice.actions.showToast(payload)),
		toast: useAppSelector((state: RootState) => state.toast),
	}
}
