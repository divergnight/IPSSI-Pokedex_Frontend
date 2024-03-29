import { LoginProvider } from './login'
import { immerable } from 'immer'

const ENDPOINT = process.env.REACT_APP_WSS_ENDPOINT + '/fight/matchmaking'

export class FightProvider {
	[immerable] = true
	ws

	listenMatchMaking() {
		const loginProvider = new LoginProvider()
		this.ws = new WebSocket(ENDPOINT, ['access_token', loginProvider.token])
	}

	joinMatchMacking(pokemon) {
		this.ws.send(
			JSON.stringify({
				action: 'join',
				data: {
					pokemon: pokemon,
				},
			})
		)
	}

	leaveMatchMaking() {
		this.ws.send(
			JSON.stringify({
				action: 'leave',
			})
		)
	}
}
