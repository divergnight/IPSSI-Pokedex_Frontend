import { Card, Col, Row } from 'react-bootstrap'
import { capitalize } from '../PokemonCard/PokemonCard'
import { highlightColorCall } from '../PokemonMoreInfo/PokemonMoreInfoPokemonCard'
import './StatSection.css'

export default function StatSection(props) {
	const { color, stats } = props

	return (
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
	)
}
