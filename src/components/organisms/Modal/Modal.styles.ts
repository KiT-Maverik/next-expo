import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { modalClasses } from '@mui/material'
import { grey } from '@mui/material/colors'

import { ModalLayout } from './Modal'

const modalOverlayMixin: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
} as const

const overlay: { [key in ModalLayout]: SxProps<Theme> } = {
	window: {
		...modalOverlayMixin,
	},
	fullscreen: {
		...modalOverlayMixin,

		[`.${modalClasses.backdrop}`]: {
			backgroundColor: (theme) => theme.palette.background.paper,
		},
	},
} as const

const modalLayoutMixin: SxProps<Theme> = (theme) =>
	({
		width: 1,
		minHeight: 220,
		outline: 'none',
		position: 'relative',
		gap: 5,
		overflow: 'auto',
		backgroundColor: (theme) => theme.palette.background.paper,
		p: 5,
		mx: 3,

		[theme.breakpoints.up('md')]: {
			mx: 5,
		},
	}) as const

const modal: {
	actions: SxProps<Theme>
	body: SxProps<Theme>
	header: SxProps<Theme>
	layout: { [key in ModalLayout]: SxProps<Theme> }
	loader: SxProps<Theme>
} = {
	actions: {
		display: 'flex',
		justifyContent: 'end',
		alignItems: 'center',
		gap: 4,
	},
	body: {
		flexGrow: 1,
		position: 'relative',
		overflowY: 'auto',
		scrollbarGutter: 'stable',
		mr: -5,
		pr: 3,

		// Workaround to prevent first input label cutoff in Modal body
		mt: -2,
		pt: 2,

		'&::-webkit-scrollbar': {
			width: 8,
		},

		'&::-webkit-scrollbar-thumb': {
			backgroundColor: grey[300],
			borderRadius: '6px',

			'&:hover': {
				backgroundColor: grey[500],
			},
		},
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'start',
		gap: 4,
		userSelect: 'none',
	},
	layout: {
		window: (theme: Theme) => ({
			...modalLayoutMixin(theme),
			maxHeight: `calc(100vh - ${theme.spacing(6)})`,
			borderRadius: 5,

			[theme.breakpoints.only('sm')]: {
				maxHeight: `calc(100vh - ${theme.spacing(16)})`,
			},
		}),
		fullscreen: (theme: Theme) => ({
			...modalLayoutMixin(theme),
			maxWidth: (theme) => theme.breakpoints.values.xl,
		}),
	},
	loader: { position: 'absolute', top: 0, left: 0, width: 1 },
} as const

export default {
	modal,
	overlay,
}
