import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Box } from '@mui/material'

import { Providers } from 'configuration/Providers'
import { globalStyles } from '../configuration/styles'

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Box component="html">
			<Box component="body" sx={globalStyles.body}>
				<Providers>
					<Box component="main" sx={globalStyles.main}>{children}</Box>
				</Providers>
			</Box>
		</Box>
	)
}
