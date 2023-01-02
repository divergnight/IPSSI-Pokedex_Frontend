import { FastAverageColor } from 'fast-average-color'
import { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import PokemonMoreInfo from '../../pages/PokemonMoreInfo/PokemonMoreInfo'
import { LoginProvider } from '../../providers/login'
import { PokemonProvider } from '../../providers/pokemon'
import PokemonCheckbox from '../PokemonCheckbox/PokemonCheckbox'
import './PokemonCard.css'

export const capitalize = str => str.substring(0, 1).toUpperCase() + str.substring(1)
export const toUUID = n => '#' + '0'.repeat(3 - ('' + n).length) + n
export const highlightColor = (color, n) => {
	const colors = color
		.substring(color.indexOf('(') + 1, color.lastIndexOf(')'))
		.split(',')
		.map((color, i) => Math.min(255, Number(color) + n))

	return `rgba(${colors[0]},${colors[1]},${colors[2]},1)`
}

export default function PokemonCard(props) {
	const [color, setColor] = useState()
	const [visibility, setVisibility] = useState(props.defaultVisibility ?? false)
	const [pokemon, setPokemon] = useState(props.pokemon)
	const { isSelected, setPokedex, cardElementKey, setInstantView } = props

	const loginProvider = new LoginProvider()

	useEffect(() => {
		if (props.defaultVisibility) {
			setInstantView(null)
		}

		const P = new PokemonProvider()
		P.getPokemonsData(pokemon.id)
			.then(data => {
				let newPokemon = { ...pokemon }
				newPokemon.data = data
				setPokemon(newPokemon)
			})
			.catch(err => console.log(err))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Set background color of card
	useEffect(() => {
		const fac = new FastAverageColor()
		const container = document.getElementById(cardElementKey)
		const subContainer = container.querySelector('.PokemonPictureCase')
		fac
			.getColorAsync(container.querySelector('img'))
			.then(color => {
				setColor(color.rgb)
				container.style.backgroundColor = highlightColor(color.rgb, 32)
				subContainer.style.backgroundColor = highlightColor(color.rgb, 96)
			})
			.catch(e => {
				console.log(e)
			})
	}, [cardElementKey, pokemon.id])

	return (
		<Card className="Pokemon" as={Container} id={cardElementKey} onClick={e => color && setVisibility(!visibility)}>
			<Row>
				<Col>
					<Row>
						{color && (
							<PokemonMoreInfo
								pokemon={pokemon}
								onClose={() => setVisibility(false)}
								show={visibility}
								color={color}
								isSelected={isSelected}
								setPokedex={setPokedex}
							></PokemonMoreInfo>
						)}
						<Col className="PokemonId">
							<h5>{toUUID(pokemon.id)}</h5>
						</Col>
						<Col className="PokemonName">
							<h5>{capitalize(pokemon.name)}</h5>
						</Col>
						{loginProvider.token && (
							<PokemonCheckbox pokemon={pokemon} isSelected={isSelected} setPokedex={setPokedex} />
						)}
					</Row>
					{pokemon?.data && (
						<Row className="TypesSection">
							{pokemon.data.types.map(type => (
								<Col className="TypeName" key={type.slot}>
									<Container>{type.type.name.toUpperCase()}</Container>
								</Col>
							))}
						</Row>
					)}
				</Col>
				<Col className="PokemonPictureCase">
					<img
						src={PokemonProvider.originalPictureUrl(pokemon.id)}
						alt=""
						className="PokemonPicture"
						crossOrigin="Anonymous"
					></img>
				</Col>
			</Row>
		</Card>
	)
}
