import { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import './PokemonCheckbox.css'

export default function PokemonCheckbox(props) {
	const [isSelected, setIsSelected] = useState(props.isSelected)

	useEffect(() => {
		setIsSelected(props.isSelected)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.isSelected])

	const addOrRemovePokemon = async e => {
		e.stopPropagation()
	}

	return (
		<Col className="PokemonCheckbox" onClick={addOrRemovePokemon}>
			{isSelected ? (
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-check-circle-fill"
						viewBox="0 0 16 16"
					>
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
					</svg>
				</div>
			) : (
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-circle"
						viewBox="0 0 16 16"
					>
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
					</svg>
				</div>
			)}
		</Col>
	)
}
