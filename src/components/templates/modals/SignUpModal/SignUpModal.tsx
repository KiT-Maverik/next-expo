'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button, TextField, MenuItem, InputAdornment, IconButton } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { user } from 'api/entities'
import { signUpContract, SignUp_Request } from 'api/contracts'
import { useSignUpMutation } from 'api/mutations'
import { Modal } from 'components/organisms'
import { useToast } from 'configuration/Providers'

import style from './SignUpModal.styles'
import { useState } from 'react'

interface SignUpModalProps {
	open: boolean
	onClose: () => void
}

export const SignUpModal = ({ open, onClose }: SignUpModalProps) => {
	const [hidePassword, setHidePassword] = useState(true)

	const { showToast } = useToast()
	const { signUp } = useSignUpMutation(() => {
		onClose()
		showToast({ type: 'success', message: 'Welcome on board!' })
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUp_Request>({ resolver: zodResolver(signUpContract.request) })

	const onSubmit: SubmitHandler<SignUp_Request> = (data) => {
		signUp.mutateAsync(data)
	}

	return (
		<Modal open={open} showLoader={signUp.isPending} onClose={onClose}>
			<Modal.Header title="Sign Up" onClose={onClose} />
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
				<TextField
					label="Gender"
					variant="outlined"
					defaultValue={user.shape.gender.options[0]}
					select
					{...register('gender')}
					error={!!errors.gender}
					helperText={errors.gender?.message}
					required={!user.shape.gender.isOptional()}
				>
					{user.shape.gender.options.map((gender) => (
						<MenuItem key={gender} value={gender}>
							{gender}
						</MenuItem>
					))}
				</TextField>
			</Modal.Body>
			<Modal.Actions>
				<Button variant="outlined" onClick={onClose}>
					Close
				</Button>
				<Button variant="contained" onClick={handleSubmit(onSubmit)}>
					Sign Up
				</Button>
			</Modal.Actions>
		</Modal>
	)
}
