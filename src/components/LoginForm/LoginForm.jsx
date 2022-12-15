import './LoginForm.css'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { LoginProvider } from '../../providers/login'
import { useState } from 'react'

export default function LoginForm(props) {
	const [form, setForm] = useState({
		login: '',
		password: '',
		error: '',
	})
	const { isNew, setIsLogin } = props

	const navigate = useNavigate()
	const loginProvider = new LoginProvider()

	const submit = async e => {
		e.preventDefault()
		const error = await (isNew ? loginProvider.register(form) : loginProvider.login(form))
		if (error) {
			let tmp = { ...form }
			tmp.error = error
			setForm(tmp)
		} else {
			navigate('/')
			setIsLogin(true)
		}
	}

	return (
		<div className="LoginForm">
			{form.error && (
				<Alert id="error-alert" variant="danger">
					{form.error}
				</Alert>
			)}
			<Card>
				<Form onSubmit={e => submit(e)}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter username"
							minLength={3}
							value={form.login}
							onChange={e => {
								let tmp = { ...form }
								tmp.login = e.target.value
								tmp.error = null
								setForm(tmp)
							}}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={form.password}
							onChange={e => {
								let tmp = { ...form }
								tmp.password = e.target.value
								tmp.error = null
								setForm(tmp)
							}}
							required
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						{isNew ? 'Sign in' : 'Log in'}
					</Button>
				</Form>
			</Card>
		</div>
	)
}
