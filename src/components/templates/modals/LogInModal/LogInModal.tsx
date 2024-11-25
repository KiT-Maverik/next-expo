'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button, TextField, InputAdornment, IconButton } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { user } from 'api/entities'
import { logInContract, LogIn_Request } from 'api/contracts'
import { useLogInMutation } from 'api/mutations'
import { Modal } from 'components/organisms'
import { useToast } from 'configuration/Providers'

import style from './LogInModal.styles'
import { useState } from 'react'

interface LogInModalProps {
	open: boolean
	onClose: () => void
}

export const LogInModal = ({ open, onClose }: LogInModalProps) => {
	const [hidePassword, setHidePassword] = useState(true)

	const { showToast } = useToast()
	const { logIn } = useLogInMutation(() => {
		onClose()
		showToast({ type: 'success', message: 'Welcome back!' })
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LogIn_Request>({ resolver: zodResolver(logInContract.request) })

	const onSubmit: SubmitHandler<LogIn_Request> = (data) => {
		logIn.mutateAsync(data)
	}

	return (
		<Modal open={open} showLoader={logIn.isPending} onClose={onClose}>
			<Modal.Header title="Log In" onClose={onClose} />
			<Modal.Body sx={style.form}>
				<TextField
					label="Username"
					variant="outlined"
					{...register('username')}
					error={!!errors.username}
					helperText={errors.username?.message}
					required={!user.shape.username.isOptional()}
				/>
				<TextField
					label="Password"
					variant="outlined"
					type={hidePassword ? 'password' : 'text'}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={() => setHidePassword(!hidePassword)} edge="end">
										{hidePassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						},
					}}
					{...register('password')}
					error={!!errors.password}
					helperText={errors.password?.message}
					required={!user.shape.password.isOptional()}
				/>
			</Modal.Body>
			<Modal.Actions>
				<Button variant="outlined" onClick={onClose}>
					Close
				</Button>
				<Button variant="contained" onClick={handleSubmit(onSubmit)}>
					Log In
				</Button>
			</Modal.Actions>
		</Modal>
	)
}
