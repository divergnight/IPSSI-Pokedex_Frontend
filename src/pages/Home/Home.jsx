import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import PokemonList from '../../components/PokemonList/PokemonList'
import { LoginProvider } from '../../providers/login'
import { PokedexProvider } from '../../providers/pokedex'
import './Home.css'

export default function Home() {
	const [pokedex, setPokedex] = useState([])
	const [isLoad, setIsLoad] = useState(false)

	useEffect(() => {
		const state = new LoginProvider().checkTokenValidity()
		if (state) {
			const pokedexProvider = new PokedexProvider()
			pokedexProvider.getPokedex().then(data => {
				setPokedex(data)
				setIsLoad(true)
			})
		} else {
			setIsLoad(true)
		}
	}, [])

	return (
		<Container id="Home">
			{isLoad && <PokemonList scrollElemenyId="Home" pokedex={pokedex} readOnly={true} />}
		</Container>
	)
}
