import { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { PokedexProvider } from '../../providers/pokedex'
import { PokemonProvider } from '../../providers/pokemon'
import PokemonCard from '../PokemonCard/PokemonCard'

export default function MyPokedexActionBar(props) {
	const { pokedex, setPokedex } = props

	const [pokemonProvider] = useState(new PokemonProvider())
	const [pokemon, setPokemon] = useState(null)
	const [search, setSearch] = useState('')

	useEffect(() => {
		pokemonProvider.listPokemons()
	}, [pokemonProvider])

	const searchOnChange = async e => {
		let tmp = e.target.value
		setSearch(tmp)
		if (tmp.trim().length > 2) {
			const pokemon = pokemonProvider.getFirstPokemonMatchName(tmp)
			setPokemon(pokemon)
		} else {
			setPokemon(null)
		}
	}

	const clear = () => {
		const pokedexProvider = new PokedexProvider()
		pokedexProvider.clearPokedex()
		setPokedex([])
	}

	return (
		<>
			<Row>
				<Col>
					<InputGroup>
						<Form.Control
							placeholder="Search pokemon by name"
							aria-describedby="basic-addon2"
							value={search}
							onChange={searchOnChange}
						/>
						<Button variant="primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-search"
								viewBox="0 0 16 16"
							>
								<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
							</svg>
						</Button>
					</InputGroup>
				</Col>
				<Col>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="currentColor"
						onClick={clear}
					>
						<path d="M17 2h-3.5l-1-1h-5l-1 1H3v2h14zM4 17a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5H4z" />
					</svg>
				</Col>
			</Row>
			{pokemon && (
				<Row>
					<PokemonCard
						pokemon={pokemon}
						isSelected={pokedex.includes(pokemon.id)}
						setPokedex={setPokedex}
						cardElementKey={`PokemonCardSelect-${pokemon.id}`}
					/>
				</Row>
			)}
		</>
	)
}
