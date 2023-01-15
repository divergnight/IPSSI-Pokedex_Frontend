import { useEffect, useState } from 'react'
import { produce } from 'immer'
import { Container } from 'react-bootstrap'
import { FightProvider } from '../../providers/fight'
import './Fight.css'
import BeforeBattle from './BeforeBattle/BeforeBattle'
import Battle from './Battle/Battle'
import PendingBattle from './PendingBattle/PendingBattle'

export default function Fight() {
	const [fp, setFp] = useState(new FightProvider())
	const [data, setData] = useState({})
	const [stateWSS, setWSState] = useState(null)

	const connect = () => {
		setFp(
			produce(oldFp => {
				oldFp.listenMatchMaking()
				oldFp.ws.onclose = () => {
					setWSState(false)
					setTimeout(connect, 1000)
				}
				oldFp.ws.onopen = () => setWSState(true)
				oldFp.ws.onmessage = onMessage
			})
		)
	}

	const onMessage = ev => {
		const data = JSON.parse(ev.data) ?? {}
		setData(data)
	}

	useEffect(() => {
		connect()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		return () => {
			if (fp.ws?.readyState === 1) return fp.leaveMatchMaking()
		}
	}, [fp])

	const onBattle = data.status !== 'leave' && data.status !== undefined
	return (
		<Container id="Fight">
			{onBattle ? (
				<>
					{data.status === 'pending' ? (
						<PendingBattle fightProvider={fp} stateWSS={stateWSS} />
					) : (
						<Battle fightProvider={fp} stateWSS={stateWSS} data={data} />
					)}
				</>
			) : (
				<BeforeBattle fightProvider={fp} stateWSS={stateWSS} />
			)}
		</Container>
	)
}
