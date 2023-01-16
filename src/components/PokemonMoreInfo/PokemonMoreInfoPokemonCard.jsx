import { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { LoginProvider } from '../../providers/login'
import { PokemonProvider } from '../../providers/pokemon'
import { capitalize, highlightColor, toUUID } from '../PokemonCard/PokemonCard'
import PokemonCheckbox from '../PokemonCheckbox/PokemonCheckbox'
import StatSection from '../StatSection/StatSection'
import './PokemonMoreInfoPokemonCard.css'

export const highlightColorCall = (color, n) => highlightColor(color, color !== 'rgb(255,255,255)' ? n : n - 127)

export default function PokemonMoreInfoPokemonCard(props) {
	const { color, isSelected, setPokedex } = props
	const [stats, setStats] = useState({})
	const [pokemon, setPokemon] = useState(props.pokemon)

	useEffect(() => {
		const flavor_text_en_list = pokemon.data.flavor_text_entries.filter(e => e.language.name === 'en')
		if (flavor_text_en_list.length > 0) {
			setPokemon(old => {
				let tmp = { ...old }
				const flavor_text = flavor_text_en_list[flavor_text_en_list.length - 1]
				tmp.data.flavor_text = {
					text: flavor_text.flavor_text,
					version: flavor_text.version.name,
				}

				return tmp
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		let tmp = {}
		pokemon.data.stats.forEach(stat => {
			switch (stat.stat.name) {
				case 'hp':
					tmp['HP'] = stat.base_stat
					break
				case 'special-attack':
					tmp['Sp. Attack'] = stat.base_stat
					break
				case 'special-defense':
					tmp['Sp. Defense'] = stat.base_stat
					break
				default:
					tmp[stat.stat.name] = stat.base_stat
			}
		})
		setStats(tmp)
	}, [pokemon.data.stats])

	const loginProvider = new LoginProvider()

	return (
		<div className="PokemonMoreInfoCard">
			<Row>
				<Card className="Pokemon" as={Container} style={{ backgroundColor: highlightColorCall(color, 48) }}>
					<Row>
						<Col>
							<Row>
								<Col className="PokemonName">
									<h5>{capitalize(pokemon.name)}</h5>
								</Col>
								<Col className="PokemonId">
									<h5>{toUUID(pokemon.id)}</h5>
								</Col>
							</Row>
							<Row>
								<Col className="PokemonGenus">
									<h5>{capitalize(pokemon.data?.genera.filter(g => g.language.name === 'en')[0]?.genus ?? '')}</h5>
								</Col>
								<Col>
									{loginProvider.token && (
										<PokemonCheckbox pokemon={pokemon} isSelected={isSelected} setPokedex={setPokedex} />
									)}
								</Col>
							</Row>
							<Row className="TypesSection">
								{pokemon.data.types.map(type => (
									<Col className="TypeName" key={type.slot}>
										<Container>{type.type.name.toUpperCase()}</Container>
									</Col>
								))}
							</Row>
						</Col>
						<Col className="PokemonPictureCase" style={{ backgroundColor: highlightColorCall(color, 96) }}>
							<img
								src={PokemonProvider.originalPictureUrl(pokemon.id)}
								onError={e => {
									e.target.src = '../assets/unknown-image.png'
								}}
								alt=""
								className="PokemonPicture"
								crossOrigin="Anonymous"
							></img>
						</Col>
					</Row>
				</Card>
			</Row>
			{pokemon.data.flavor_text && (
				<Row className="InfoSection">
					<p>Species</p>
					<Card style={{ backgroundColor: highlightColorCall(color, 96) }}>
						<Row className="FlavorTextSection">
							<Col className="FlavorText">
								<Container>{pokemon.data.flavor_text.text}</Container>
								<p>Pokedex entry (from Pokemon {capitalize(pokemon.data.flavor_text.version)})</p>
							</Col>
						</Row>
						<Row className="InfoSizeSection">
							<Col className="InfoText">
								<Container>{`${(x => `${Math.floor(x)}'${Math.floor((x - Math.floor(x)) * 100)}"`)(
									Math.round(pokemon.data.height * 32.8084) / 100
								)} (${pokemon.data.height / 10} m)`}</Container>
								<p>Height</p>
							</Col>
							<Col className="InfoText">
								<Container>{`${Math.round(pokemon.data.weight * 22.046) / 100} lbs (${
									pokemon.data.weight / 10
								} kg)`}</Container>
								<p>Weight</p>
							</Col>
						</Row>
					</Card>
				</Row>
			)}
			{stats && <StatSection color={color} stats={stats} />}
		</div>
	)
}
