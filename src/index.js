import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
)

/**
 * TODO
 *
 *
 * #### Types ####
 * damage_relations
 *     double_damage_from[x].name
 *     half_damage_from[x].name
 *     no_damage_from[x].name
 *
 *
 * #### Pokemon ####
 * id
 * name
 * base_experience
 * types[x]
 *     slot
 *     type.name
 *     type.url
 * abilities[x]
 *     ability.name
 *     ability.url
 *         effect_entries[i] (if .language.name == en)
 *             effet
 *             short_effect
 *         flavor_text_entries[i].flavor_text (if .language.name == en)
 *         pokemon[x]
 *             is_hidden
 *             pokemon.name
 *             pokemon.url
 *     is_hidden
 * stats[x]
 *     state.name
 *     base_stat
 *     effort (as EV Yield)
 * sprites
 *     front_default
 *     back_default
 *     front_shiny
 *     back_shiny
 * height
 * weight
 * moves[x]
 *     version_group_details[-i] (if .language.name == en)
 *         level_learned_at
 *         move_learn_method.name
 *     move.name
 *     move.url
 *         accuracy
 *         power
 *         pp
 *         type.name
 *         flavor_text_entries[-i].flavor_text (if .language.name == en)
 *         effect_entries[i].effect (if .language.name == en)
 *         damage_class.name
 *         contest_type.name
 *         learned_by_pokemon[x].url
 * species.url
 * 	   color.name
 *     base_happiness
 *     capture_rate
 *     growth_rate.name
 *     egg_groups[x]
 *         name
 *         url
 *             pokemon_species[x].url
 *     genera[i].genus (if .language.name == en)
 *     flavor_text_entries[-i].flavor_text (if .language.name == en)
 *     evolution_chain.url
 *         chain.evolves_to[x]
 *             evolution_details[x]
 *                 min_level
 *                 item
 *                 ...
 *             evolves_to[x]
 *                 ... (recursive)
 *             species.name
 *     shape.name
 *     generation.name
 *     gender_ratio (as n /8 %female)
 *     hatch_counter (as egg cycle)
 *
 * --- --- --- --- ---
 * stats --- calculation
 */
