import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import PokemonCard from '../PokemonCard/PokemonCard'
import './PokemonList.css'
// import InfiniteScroll from 'react-infinite-scroller'
import { PokemonProvider } from '../../providers/pokemon'

export default function PokemonList(props) {
	const { scrollElemenyId, pokedex, readOnly, setPokedex, instantView, setInstantView, onClickOnElement, prefixId } =
		props

	const [pokemons, setPokemons] = useState([])
	const [hasMore, setHasMore] = useState(true)
	const [page, setPage] = useState(0)

	useEffect(() => {
		const pokemonProvider = new PokemonProvider()

		pokemonProvider
			.listPokemons(20, page * 20, readOnly ? null : pokedex)
			.then(data => {
				if (data.length < 20) setHasMore(false)
				setPokemons(old => {
					return [...old, ...data].filter((v, i, a) => a.findIndex(v2 => v2.id === v.id) === i)
				})
			})
			.catch(err => console.log(err))

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, pokedex])

	const onScroll = () => {
		const element = document.getElementById(scrollElemenyId)
		const scrollTop = element.scrollTop
		const scrollHeight = element.scrollHeight
		const clientHeight = element.clientHeight

		if (scrollTop + clientHeight >= scrollHeight * 0.66) {
			setPage(page + 1)
		}
	}

	useEffect(() => {
		if (hasMore) {
			const element = document.getElementById(scrollElemenyId)
			element.addEventListener('scroll', onScroll)
			return () => element.removeEventListener('scroll', onScroll)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pokemons])

	return (
		<div id="PokemonList">
			{pokemons
				.filter(p => readOnly || pokedex.includes(p.id))
				.map(pokemon => {
					return (
						<Row key={(prefixId ?? '') + 'PokemonElement-' + pokemon.id} id={'PokemonElement-' + pokemon.id}>
							<PokemonCard
								pokemon={pokemon}
								isSelected={pokedex.includes(pokemon.id)}
								cardElementKey={`${prefixId ?? ''}PokemonCard-${pokemon.id}`}
								setPokedex={setPokedex}
								defaultVisibility={pokemon.id === instantView}
								setInstantView={setInstantView}
								onClick={onClickOnElement}
							/>
						</Row>
					)
				})}
		</div>
	)
}
