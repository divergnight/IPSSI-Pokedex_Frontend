import { Card, Col, Container, Row } from 'react-bootstrap'
import { LoginProvider } from '../../../providers/login'
import { PokemonProvider } from '../../../providers/pokemon'
import { capitalize, highlightColor, toUUID } from '../../PokemonCard/PokemonCard'
import PokemonCheckbox from '../../PokemonCheckbox/PokemonCheckbox'

export default function PokemonMoreInfoPokemonCard(props) {
	const { color, pokemon, isSelected, setPokedex } = props

	const loginProvider = new LoginProvider()

	console.log(pokemon)
	return (
		<div className="PokemonCard">
			<Row>
				<Card className="Pokemon" as={Container} style={{ backgroundColor: highlightColor(color, 64) }}>
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
									<h5>{capitalize(pokemon.data.genera.filter(g => g.language.name === 'en')[0].genus)}</h5>
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
						<Col className="PokemonPictureCase" style={{ backgroundColor: highlightColor(color, 96) }}>
							<img
								src={PokemonProvider.originalPictureUrl(pokemon.id)}
								alt=""
								className="PokemonPicture"
								crossOrigin="Anonymous"
							></img>
						</Col>
					</Row>
				</Card>
			</Row>
		</div>
	)
}
