import { FastAverageColor } from 'fast-average-color'
import { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { PokemonProvider } from '../../providers/pokemon'
import './PokemonFightCard.css'

export const capitalize = str => str.substring(0, 1).toUpperCase() + str.substring(1)
export const toUUID = n => '#' + '0'.repeat(3 - ('' + n).length) + n
export const highlightColor = (color, n) => {
	const colors = color
		.substring(color.indexOf('(') + 1, color.lastIndexOf(')'))
		.split(',')
		.map((color, i) => Math.min(255, Number(color) + n))

	return `rgba(${colors[0]},${colors[1]},${colors[2]},1)`
}

export default function PokemonFightCard(props) {
	const [pokemon, setPokemon] = useState(props.pokemon)
	const [damage, setDamage] = useState(0)
	const [lifebarColor, setLifebarColor] = useState('80, 192, 64')
	const { cardElementKey, takenDmg, hp } = props

	useEffect(() => {
		const P = new PokemonProvider()
		P.getPokemonsData(pokemon.id)
			.then(data => {
				setPokemon({ ...pokemon, ...data })
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
				container.style.backgroundColor = highlightColor(color.rgb, 32)
				subContainer.style.backgroundColor = highlightColor(color.rgb, 96)
			})
			.catch(e => {
				console.log(e)
			})
	}, [cardElementKey, pokemon.id])

	useEffect(() => {
		if (takenDmg !== 0) {
			setDamage(takenDmg + Math.min(hp, 0))
			setTimeout(function () {
				setDamage(0)
				if (hp > pokemon.maxHp * 0.5) setLifebarColor('80, 192, 64')
				else if (hp > pokemon.maxHp * 0.2) setLifebarColor('210, 210, 64')
				else setLifebarColor('192, 80, 64')
			}, 1000)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [takenDmg, hp])

	return (
		<>
			<Card className="PokemonFightCard" as={Container} id={cardElementKey}>
				<Row>
					<Col>
						<Row>
							<Col className="PokemonName">
								<h5>{capitalize(pokemon.name ?? '')}</h5>
								<h5>Lvl.{pokemon.level}</h5>
							</Col>
						</Row>
						<Row>
							<div className="health-bar">
								<div
									className="bar"
									style={{ width: `${Math.max(hp / pokemon.maxHp, 0) * 100}%`, background: `rgb(${lifebarColor})` }}
								></div>
								<div
									className="hit"
									style={{
										width: `${(damage / pokemon.maxHp) * 100}%`,
										background: `rgba(${lifebarColor}, 0.4)`,
									}}
								></div>
							</div>
						</Row>
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
		</>
	)
}
