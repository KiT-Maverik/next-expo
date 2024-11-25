import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const form: SxProps<Theme> = { display: 'flex', flexDirection: 'column', gap: 5 } as const

export default {
	form,
}
