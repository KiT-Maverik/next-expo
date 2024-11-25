'use client'

import { Button, Stack } from '@mui/material'
import { useState } from 'react'

import { SignUpModal, LogInModal } from 'components/templates'

export default function Home() {
	const [showSignUpModal, setShowSignUpModal] = useState(false)
	const [showLogInModal, setShowLogInModal] = useState(false)

	return (
		<Stack direction='row' gap={5}>
			<Button variant='contained' size='large' onClick={() => setShowSignUpModal(true)}>Sign Up</Button>
			<Button variant='contained' size='large' onClick={() => setShowLogInModal(true)}>Log In</Button>
			<LogInModal open={showLogInModal} onClose={() => setShowLogInModal(false)} />
			<SignUpModal open={showSignUpModal} onClose={() => setShowSignUpModal(false)} />
		</Stack>
	)
}
