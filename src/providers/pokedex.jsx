import axios from 'axios'
import { LoginProvider } from './login'

const ENDPOINT = 'https://dev.vadn/pokedex'

export class PokedexProvider {
	async getPieceCount() {
		try {
			const loginProvider = new LoginProvider()
			const res = await axios.get(ENDPOINT + '/piece', { headers: { Authorization: 'Bearer ' + loginProvider.token } })
			return res.data.piece
		} catch (error) {
			console.log(error.response.data.message)
			return error.response.data.message
		}
	}

	async getPokedex() {
		try {
			const loginProvider = new LoginProvider()
			const res = await axios.get(ENDPOINT, { headers: { Authorization: 'Bearer ' + loginProvider.token } })
			return res.data.pokedex
		} catch (error) {
			console.log(error.response.data.message)
			return error.response.data.message
		}
	}

	async unlockPokemon() {
		try {
			const loginProvider = new LoginProvider()
			const res = await axios.get(ENDPOINT + '/unlock', { headers: { Authorization: 'Bearer ' + loginProvider.token } })
			return Number(res.data.id)
		} catch (error) {
			console.log(error.response.data.message)
			return error.response.data.message
		}
	}
}
