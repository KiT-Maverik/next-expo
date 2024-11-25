'use client'

import { ReactNode } from 'react'
import {
	Box,
	BoxProps,
	Modal as MUIModal,
	Stack,
	IconButton,
	Typography,
	TypographyProps,
	ModalProps as MuiModalProps,
	StackProps,
	LinearProgress,
	Grow,
	Fade,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { normalizeSxProps } from 'utils'

import { ModalWidth, testId, modalWidthParams, modalAnimationDuration } from './Modal.constants'
import style from './Modal.styles'

export type ModalLayout = 'window' | 'fullscreen'

/** Props for the modals component. */
interface ModalProps extends Omit<MuiModalProps, 'children' | 'width'> {
	ContentProps?: StackProps

	/** The content to be rendered inside the modal. */
	children: ReactNode

	/** Whether to show modal full width */
	layout?: ModalLayout

	/** Callback fired when the component requests to be closed. */
	onClose: () => void

	showLoader?: boolean

	open: boolean

	width?: ModalWidth
}

/**
 * A customizable modal component.
 */
export const Modal = ({
	children,
	layout = 'window',
	onClose,
	open,
	width = 'md',
	ContentProps,
	showLoader,
}: ModalProps) => {
	return (
		<MUIModal
			open={open}
			keepMounted={false}
			closeAfterTransition
			sx={style.overlay[layout]}
			onClose={onClose}
			slotProps={{ backdrop: { TransitionComponent: Fade, timeout: modalAnimationDuration } }}
		>
			<Grow in={open} timeout={modalAnimationDuration}>
				<Stack
					maxWidth={modalWidthParams[width]}
					sx={style.modal.layout[layout]}
					data-testid={testId.container}
					{...ContentProps}
				>
					{showLoader && <LinearProgress sx={style.modal.loader} />}
					{children}
				</Stack>
			</Grow>
		</MUIModal>
	)
}

interface ModalHeaderCommonProps {
	/** modals header container props. */
	BoxProps?: BoxProps
	/** modals header text props. */
	TypographyProps?: TypographyProps
	/** Custom modal close function. */
	onClose?: () => void
	/** Determines whether the close button should be displayed. */
	showCloseButton?: boolean
}

interface ModalHeaderWithText extends ModalHeaderCommonProps {
	children?: never
	/**
	 * The title to be displayed in the modal header.
	 * Be advised: it overrides Headers' children.
	 * */
	title?: string
}

interface ModalHeaderWithCustomContent extends ModalHeaderCommonProps {
	children: ReactNode
	title?: never
}

type ModalHeaderProps = ModalHeaderWithText | ModalHeaderWithCustomContent

/**
 * Represents the header section of the modals.
 */
const Header = ({ title, children, onClose, TypographyProps, showCloseButton = true, BoxProps }: ModalHeaderProps) => {
	return (
		<Box sx={normalizeSxProps([style.modal.header, BoxProps?.sx])} data-testid={testId.header.container}>
			{children}

			{title && (
				<Typography variant="h5" flexGrow={1} {...TypographyProps} data-testid={testId.header.title}>
					{title}
				</Typography>
			)}

			{showCloseButton && (
				<IconButton onClick={onClose} data-testid={testId.header.closeButton}>
					<CloseIcon />
				</IconButton>
			)}
		</Box>
	)
}

/**
 * Represents the body section of the modals.
 */
const Body = ({ sx, children, ...rest }: BoxProps) => {
	return (
		<Box {...rest} sx={normalizeSxProps([style.modal.body, sx])} data-testid={testId.body.container}>
			{children}
		</Box>
	)
}

/**
 * Represents the actions section of the modals.
 */
const Actions = ({ sx, children, ...rest }: BoxProps) => {
	if (!children) return null

	return (
		<Box {...rest} sx={normalizeSxProps([style.modal.actions, sx])} data-testid={testId.actions.container}>
			{children}
		</Box>
	)
}

// Assigning components to modals for easy access
Modal.Header = Header
Modal.Body = Body
Modal.Actions = Actions
