import './PokemonMoreInfo.css'
import { useEffect, useState } from 'react'
import { highlightColor } from '../../components/PokemonCard/PokemonCard'
import PokemonMoreInfoPokemonCard from '../../components/PokemonMoreInfo/PokemonMoreInfoPokemonCard'

export default function PokemonMoreInfo(props) {
	const { pokemon, color, isSelected, setPokedex } = props
	const [show, setShow] = useState(false)

	useEffect(() => {
		setShow(props.show)
	}, [props.show])

	return (
		<div className={`PokemonMoreInfo ${show ? '' : 'closed'}`}>
			<div className="popup" style={{ backgroundColor: highlightColor(color, 32) }}>
				{show && (
					<PokemonMoreInfoPokemonCard color={color} pokemon={pokemon} isSelected={isSelected} setPokedex={setPokedex} />
				)}
			</div>
		</div>
	)
}
