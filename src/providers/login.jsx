import axios from 'axios'

const ENDPOINT = 'http://localhost:3000/'

export class LoginProvider {
	token
	username

	constructor() {
		this.load()
	}

	save() {
		localStorage.setItem('username', this.username)
		localStorage.setItem('token', this.token)
	}

	load() {
		this.username = localStorage.getItem('username')
		this.token = localStorage.getItem('token')
	}

	getToken() {
		this.load()
		return this.token
	}

	set({ username, token }) {
		this.username = username
		this.token = token
		this.save()
	}

	logOut() {
		localStorage.clear()
	}

	async login(loginForm) {
		try {
			const res = await axios.post(ENDPOINT + 'login', loginForm)
			this.set(res.data)
		} catch (error) {
			return error.response.data.message
		}
	}

	async register(registerForm) {
		try {
			const res = await axios.post(ENDPOINT + 'register', registerForm)
			this.set(res.data)
		} catch (error) {
			return error.response.data.message
		}
	}

	checkTokenValidity() {
		if (!this.token) return false
		const data = this.parseJwt()
		if (!data?.exp) return false
		return data.exp * 1000 > Date.now()
	}

	parseJwt() {
		var base64Url = this.token.split('.')[1]
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
		var jsonPayload = decodeURIComponent(
			window
				.atob(base64)
				.split('')
				.map(function (c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
				})
				.join('')
		)

		return JSON.parse(jsonPayload)
	}
}
