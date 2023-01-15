import { Button, Container, Row } from 'react-bootstrap'
import './PendingBattle.css'

export default function PendingBattle(props) {
	const { fightProvider, stateWSS } = props

	return (
		<div id="PendingBattle">
			{stateWSS && (
				<>
					<Container id="Waiting">
						<Row>
							<p>Waiting for opponent</p>
						</Row>
						<Row>
							<Button
								variant="primary"
								onClick={() => {
									fightProvider.leaveMatchMaking()
								}}
							>
								Leave
							</Button>
						</Row>
					</Container>
				</>
			)}
		</div>
	)
}
