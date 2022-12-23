import axios from 'axios'
import { LoginProvider } from './login'

const ENDPOINT = 'http://localhost:3000/pokedex'

export class PokedexProvider {
	async getPokedex() {
		try {
			const loginProvider = new LoginProvider()
			const res = await axios.get(ENDPOINT, { headers: { Authorization: 'Bearer ' + loginProvider.token } })
			return res.data.pokedex
		} catch (error) {
			return error.response.data.message
		}
	}

	async addPokemon(id) {
		try {
			const loginProvider = new LoginProvider()
			const res = await axios.patch(
				ENDPOINT + '/add',
				{ pokedex: [id] },
				{ headers: { Authorization: 'Bearer ' + loginProvider.token } }
			)
			return res.data.pokedex
		} catch (error) {
			console.log(error.response.data.message)
			return error.response.data.message
		}
	}

	async removePokemon(id) {
		try {
			const loginProvider = new LoginProvider()
			const res = await axios.patch(
				ENDPOINT + '/remove',
				{ pokedex: [id] },
				{ headers: { Authorization: 'Bearer ' + loginProvider.token } }
			)
			return res.data.pokedex
		} catch (error) {
			console.log(error.response.data.message)
			return error.response.data.message
		}
	}

	async clearPokedex() {
		try {
			const loginProvider = new LoginProvider()
			await axios.delete(ENDPOINT, { headers: { Authorization: 'Bearer ' + loginProvider.token } })
			return null
		} catch (error) {
			console.log(error.response.data.message)
			return error.response.data.message
		}
	}
}
