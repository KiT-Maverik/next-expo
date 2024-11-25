'use client'

import { Typography, SxProps, Theme, Box } from '@mui/material'
import { ReactNode, useCallback } from 'react'

import { normalizeSxProps } from 'utils'

import style from './Content.style'

interface ContentProps {
	title?: string
	children: ReactNode
	header?: ReactNode
	head?: ReactNode
	containerStyle?: SxProps<Theme>
	defaultLayout?: boolean
	defaultSpacing?: boolean
}

/**
 * Generic content component
 *
 * This component intended to:
 * - Provide unified content layout
 * - Provide error boundaries
 * - Manage page head
 *
 * Recommended for usage as a wrapper for page-level components
 */
export const Content = ({
	title,
	header,
	containerStyle,
	children,
	// head,
	defaultLayout = true,
	defaultSpacing = true,
}: ContentProps) => {
	const renderHeader = useCallback(() => {
		if (header) {
			return header
		}

		if (title) {
			return (
				<Typography variant="h4" component="h1">
					{title}
				</Typography>
			)
		}

		return null
	}, [title, header])

	return (
		<Box
			flexGrow={1}
			sx={normalizeSxProps([defaultLayout && style.layout, defaultSpacing && style.spacing, containerStyle])}
		>
			{renderHeader()}
			{children}
		</Box>
	)
}
