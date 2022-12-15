import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import LogIn from './pages/LogIn'
import SignIn from './pages/SignIn'
import Home from './pages/Home/Home'
import { useState } from 'react'
import MyPokedex from './pages/MyPokedex/MyPokedex'

function App() {
	// eslint-disable-next-line no-unused-vars
	const [isLogin, setIsLogin] = useState()

	return (
		<div className="App">
			<Navbar setIsLogin={setIsLogin} />
			<main>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/login" element={<LogIn setIsLogin={setIsLogin} />}></Route>
					<Route path="/signin" element={<SignIn setIsLogin={setIsLogin} />}></Route>
					<Route path="/mypokedex" element={<MyPokedex />}></Route>
				</Routes>
			</main>
		</div>
	)
}

export default App
