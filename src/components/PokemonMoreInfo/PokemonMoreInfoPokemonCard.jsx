import { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { LoginProvider } from '../../providers/login'
import { PokemonProvider } from '../../providers/pokemon'
import { capitalize, highlightColor, toUUID } from '../PokemonCard/PokemonCard'
import PokemonCheckbox from '../PokemonCheckbox/PokemonCheckbox'
import './PokemonMoreInfoPokemonCard.css'

const highlightColorCall = (color, n) => highlightColor(color, color !== 'rgb(255,255,255)' ? n : n - 127)

export default function PokemonMoreInfoPokemonCard(props) {
	const { color, pokemon, isSelected, setPokedex } = props
	const [stats, setStats] = useState({})

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
			{stats && (
				<Row className="StatSection">
					<p>Base Stats</p>
					<Card style={{ backgroundColor: highlightColorCall(color, 96) }}>
						{Object.entries(stats).map(stat => (
							<Row className="stat" key={'stat-' + stat[0]}>
								<Col className="statName">
									<div style={{ backgroundColor: highlightColorCall(color, 16) }}>
										<p>{capitalize(stat[0])}</p>
									</div>
								</Col>
								<Col className="statNumber">
									<div
										className="progressBar"
										style={{
											width: `${(stat[1] / Math.max(...Object.values(stats))) * 100}%`,
											backgroundColor: highlightColorCall(color, 32),
										}}
									>
										<p>{stat[1]}</p>
									</div>
								</Col>
							</Row>
						))}
						<Row className="statTotal">
							<p>TOTAL</p>
							<p style={{ color: highlightColorCall(color, 0) }}>{Object.values(stats).reduce((a, b) => a + b, 0)}</p>
						</Row>
					</Card>
				</Row>
			)}
		</div>
	)
}
