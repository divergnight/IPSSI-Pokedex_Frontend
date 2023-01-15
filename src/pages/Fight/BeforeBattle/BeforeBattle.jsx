import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PokemonList from '../../../components/PokemonList/PokemonList'
import { LoginProvider } from '../../../providers/login'
import { PokedexProvider } from '../../../providers/pokedex'
import './BeforeBattle.css'

export default function BeforeBattle(props) {
	const { fightProvider, stateWSS } = props
	const [pokedex, setPokedex] = useState([])
	const [choicePokemon, setChoicePokemon] = useState([])
	const [isLoad, setIsLoad] = useState(false)
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
		<>
			<p className="countText">{choicePokemon.length}/6</p>
			{isLoad && (
				<PokemonList
					prefixId="Selected"
					scrollElemenyId="Fight"
					pokedex={choicePokemon}
					readOnly={false}
					onClickOnElement={pokemon => {
						if (choicePokemon.includes(pokemon.id)) setChoicePokemon(old => old.filter(e => e !== pokemon.id))
						else if (choicePokemon.length < 6) setChoicePokemon(old => [...old, pokemon.id])
					}}
				/>
			)}
			{stateWSS && (
				<>
					{choicePokemon.length > 0 ? (
						<Button variant="primary" onClick={() => fightProvider.joinMatchMacking(choicePokemon)}>
							Join the battle
						</Button>
					) : (
						<Button variant="primary" disabled>
							Join the battle
						</Button>
					)}
				</>
			)}
			<p className="helpText">Add a pokemon to the battle by clicking on it</p>
			{isLoad && (
				<PokemonList
					scrollElemenyId="Fight"
					pokedex={pokedex}
					readOnly={false}
					setPokedex={setPokedex}
					onClickOnElement={pokemon => {
						if (choicePokemon.includes(pokemon.id)) setChoicePokemon(old => old.filter(e => e !== pokemon.id))
						else if (choicePokemon.length < 6) setChoicePokemon(old => [...old, pokemon.id])
					}}
				/>
			)}
		</>
	)
}
