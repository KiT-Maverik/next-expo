import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

export const globalStyles: { main: SxProps<Theme>; body: SxProps<Theme> } = {
	body: {
		p: '0 !important',
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	main: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}
} as const
