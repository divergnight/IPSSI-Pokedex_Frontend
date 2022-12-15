import LoginForm from '../components/LoginForm/LoginForm'

export default function LogIn(props) {
	return <LoginForm isNew={false} setIsLogin={props.setIsLogin} />
}
