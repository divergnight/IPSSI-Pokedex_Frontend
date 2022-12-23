import Pokedex from 'pokedex-promise-v2'

export class PokemonProvider {
	pokedex
	pokemons

	static originalPictureUrl = i =>
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`

	constructor() {
		this.pokedex = new Pokedex()
		this.pokemons = []
	}

	async getAllPokemons() {
		this.pokemons = await this.pokedex
			.getPokemonSpeciesList()
			.then(data =>
				data.results.map(p => {
					p.id = Number(p.url.match(/\/([^/]+)\/?$/)[1])
					return p
				})
			)
			.catch(err => {
				console.log(err)
				return []
			})
		return this.pokemons
	}

	async listPokemons(limit = undefined, offset = undefined, filter = null) {
		let pokemons = this.pokemons
		if (!this.pokemons.length) pokemons = await this.getAllPokemons()
		if (filter !== null) pokemons = pokemons.filter(p => filter.includes(p.id))
		return pokemons.slice(offset, offset + limit)
	}

	async getPokemonsData(id) {
		const datas = await Promise.all([
			this.pokedex.getPokemonByName(id).catch(err => {}),
			this.pokedex.getPokemonSpeciesByName(id).catch(err => {}),
		])

		return Object.assign(...datas)
	}

	getFirstPokemonMatchName(name) {
		const clearName = name.trim().toLowerCase()
		const match = this.pokemons.filter(p => p.name.indexOf(clearName) >= 0)
		return match ? match[0] : null
	}
}
