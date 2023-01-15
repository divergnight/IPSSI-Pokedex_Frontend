import { useEffect } from 'react'
import { Navbar as RNavbar, Container, Button, Form, Col, Row, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { LoginProvider } from '../../providers/login'
import './Navbar.css'

function Navbar(props) {
	const { setIsLogin } = props

	const loginProvider = new LoginProvider()
	const navigate = useNavigate()

	const logOut = () => {
		loginProvider.logOut()
		setIsLogin(false)

		if (!loginProvider.token) navigate('/')
	}

	useEffect(() => {
		if (!loginProvider.token) return
		const state = loginProvider.checkTokenValidity()
		if (!state) logOut()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<RNavbar bg="dark" variant="dark" id="Navbar">
			<Container>
				<RNavbar.Brand as={Link} to="/">
					<img alt="" src="/logo256.png" width="30" height="30" className="d-inline-block align-top" /> Pokedex
				</RNavbar.Brand>
				<Nav className="me-auto">
					<Nav.Link as={Link} to="/">
						Home
					</Nav.Link>
					{loginProvider.token && (
						<>
							<Nav.Link as={Link} to="/mypokedex">
								My Pokedex
							</Nav.Link>
							<Nav.Link as={Link} to="/fight">
								Fight
							</Nav.Link>
						</>
					)}
				</Nav>
				<div>
					{!loginProvider.token && (
						<Form className="d-flex">
							<Button variant="primary" as={Link} to="/login">
								Login
							</Button>
							<Button variant="primary" as={Link} to="/signin">
								Sign in
							</Button>
						</Form>
					)}
					{loginProvider.token && (
						<Row>
							<Col>
								<h4>#{loginProvider.username}</h4>
							</Col>
							<Col>
								<Button variant="primary" onClick={logOut}>
									Logout
								</Button>
							</Col>
						</Row>
					)}
				</div>
			</Container>
		</RNavbar>
	)
}

export default Navbar
