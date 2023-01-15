import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import PokemonFightCard from '../../../components/PokemonFightCard/PokemonFightCard'
import './Battle.css'

export default function Battle(props) {
	const { fightProvider, stateWSS, data } = props
	const [pokemons, setPokemons] = useState()
	const [step, setStep] = useState()
	const [animEnd, setAnimEnd] = useState(false)

	useEffect(() => {
		const pokemons_ = data.detail
			? {
					your: data.detail.pokemons['your'].map(p => {
						return { ...p, hp: p.maxHp }
					}),
					opponent: data.detail.pokemons['opponent'].map(p => {
						return { ...p, hp: p.maxHp }
					}),
			  }
			: null
		setPokemons(pokemons_)

		if (data.detail) {
			modifySteps(data.detail.steps, pokemons_)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms))
	}

	function clone(obj) {
		return Object.keys(obj).reduce(
			(v, d) =>
				Object.assign(v, {
					[d]: obj[d].constructor === Object ? clone(obj[d]) : obj[d],
				}),
			{}
		)
	}

	async function modifySteps(steps, tmp_pokemons) {
		steps = [...steps]
		tmp_pokemons = clone(tmp_pokemons)
		while (steps.length > 0) {
			await sleep(2000)
			let step_ = steps.shift()
			setStep(step_)

			let turn = step_.turn === 'your' ? 'opponent' : 'your'
			if (step_.action === 'attack') {
				tmp_pokemons[turn][0].hp -= step_.recap?.damage ?? 0
				setPokemons(tmp_pokemons)
			} else {
				tmp_pokemons[turn].shift()
				if (tmp_pokemons[turn].length === 0) {
					setAnimEnd(true)
					return
				}
				setPokemons(tmp_pokemons)
			}
		}
	}

	return (
		<div id="Battle">
			{stateWSS && (
				<>
					{data.status === 'process' && (
						<Container className="Process">
							<Row>
								<p>Calculation of the fight</p>
							</Row>
						</Container>
					)}
					{pokemons && (
						<Container className="Fight">
							{!animEnd && (
								<>
									<Row id="OpponentPokemons">
										<Col>
											<Row>
												{data.detail.pokemons.opponent.map((x, i, a) => (
													<Col key={'op-pokemon' + i}>
														<img
															alt="Pokedex"
															src="/logo256.png"
															width={30}
															height={30}
															{...(i < a.length - pokemons.opponent.length
																? {
																		style: {
																			filter: 'grayscale(100%)',
																		},
																  }
																: {})}
														></img>
													</Col>
												))}
											</Row>
											<PokemonFightCard
												key={`OpponentPokemonFightCardM-${pokemons.opponent[0].id}`}
												takenDmg={step?.turn === 'your' ? step?.recap?.damage ?? 0 : 0}
												hp={pokemons.opponent[0].hp}
												pokemon={pokemons.opponent[0]}
												cardElementKey={`OpponentPokemonFightCard-${pokemons.opponent[0].id}`}
											/>
										</Col>
									</Row>
									<Row id="MiddleBattleText">
										<p>VS</p>
									</Row>
									<Row id="YourPokemons">
										<Col>
											<PokemonFightCard
												key={`YourPokemonFightCardM-${pokemons.your[0].id}`}
												takenDmg={step?.turn === 'opponent' ? step?.recap?.damage ?? 0 : 0}
												hp={pokemons.your[0].hp}
												pokemon={pokemons.your[0]}
												cardElementKey={`YourPokemonFightCard-${pokemons.your[0].id}`}
											/>
											<Row>
												{data.detail.pokemons.opponent.map((x, i, a) => (
													<Col key={'you-pokemon' + i}>
														<img
															alt="Pokedex"
															src="/logo256.png"
															width={30}
															height={30}
															{...(i < a.length - pokemons.your.length
																? {
																		style: {
																			filter: 'grayscale(100%)',
																		},
																  }
																: {})}
														></img>
													</Col>
												))}
											</Row>
										</Col>
									</Row>
								</>
							)}
							{animEnd && (
								<Row>
									{data.status === 'win' ? (
										<div className="">
											<p>You have won</p>
											<p>You earn a coin</p>
										</div>
									) : (
										<div className="">
											<p>You lost</p>
										</div>
									)}

									<Button
										variant="primary"
										onClick={() => {
											fightProvider.leaveMatchMaking()
										}}
									>
										Leave
									</Button>
								</Row>
							)}
						</Container>
					)}
				</>
			)}
		</div>
	)
}
