import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import MyPokedexActionBar from '../../components/MyPokedexActionBar/MyPokedexActionBar'
import PokemonList from '../../components/PokemonList/PokemonList'
import { LoginProvider } from '../../providers/login'
import { PokedexProvider } from '../../providers/pokedex'
import './MyPokedex.css'

export default function MyPokedex() {
	const [pokedex, setPokedex] = useState([])
	const [isLoad, setIsLoad] = useState(false)
	const [instantView, setInstantView] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const state = new LoginProvider().checkTokenValidity()
		if (!state) {
			navigate('/')
			return
		}

		const pokedexProvider = new PokedexProvider()
		pokedexProvider.getPokedex().then(data => {
			setPokedex(data)
			setIsLoad(true)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoad])

	return (
		<Container id="MyPokedex">
			{isLoad && (
				<>
					<MyPokedexActionBar
						pokedex={pokedex}
						setPokedex={setPokedex}
						setIsLoad={setIsLoad}
						setInstantView={setInstantView}
					/>
					<PokemonList
						scrollElemenyId="MyPokedex"
						pokedex={pokedex}
						readOnly={false}
						setPokedex={setPokedex}
						instantView={instantView}
						setInstantView={setInstantView}
					/>
				</>
			)}
		</Container>
	)
}
