import LoginForm from '../components/LoginForm/LoginForm'

export default function SignIn(props) {
	return <LoginForm isNew={true} setIsLogin={props.setIsLogin} />
}
