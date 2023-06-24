import { useEffect, useRef, useState } from "react"
import useFetch from "../hooks/useFetch"
import { useSelector } from "react-redux"
import PokeContainer from "../components/Pokedex/PokeContainer"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './stylesP/pokedex.css'

const pokedex = () => {

  const [selectValue, SetselectValue] = useState('all-pokemons')

  const trainerName = useSelector(states => states.trainerName)

  let url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'
  const [ pokemons , getAllPokemons , hasError, setPokemons] = useFetch(url)
  const urlTypes = 'https://pokeapi.co/api/v2/type'
  const [ types , getAllTypes ] = useFetch(urlTypes)

useEffect(() => { 
  if (selectValue === 'all-pokemons') {
    getAllPokemons()
  } else {
    axios.get(selectValue)
    .then(res => {
     const data = {
      results: res.data.pokemon.map(pokeInfo => pokeInfo.pokemon)
     }
      setPokemons(data)
    })
    .catch(err => console.log(err))
  }
  
} , [selectValue])

useEffect(() => {
  getAllTypes()
} , [])



const searchPokemon = useRef()
const navigate = useNavigate()

const handleSubmit = e => {
  e.preventDefault()
  const inputValue = (searchPokemon.current.value.trim().toLowerCase())
  navigate(`/pokedex/${inputValue}`)
}

const handleChangeType = e => {
 SetselectValue(e.target.value)
}

return (
  <div className="Pokedex_container">
    <div className="Pokedex_header"></div>
    <div className="Pokedex_header_black"></div>
    <div className="Pokedex_content">
      <p className="Pokedex_saludo">
        Welcome <span className="pokedex_nametrainer">{trainerName}</span>!, you can find your favorite
        pokemon
      </p>
      <form className="pokedex_formulario" onSubmit={handleSubmit}>
        <input ref={searchPokemon} type="text" />
        <button className="pokedex_btn">Search</button>
        <select className="pokedex_desplegable" onChange={handleChangeType}>
          <option value="all-pokemons">All pokemons</option>
          {types?.results.map((typeInfo) => (
            <option value={typeInfo.url} key={typeInfo.url}>
              {typeInfo.name}
            </option>
          ))}
        </select>
      </form>
      <PokeContainer pokemons={pokemons?.results} />
    </div>
  </div>
);

}

export default pokedex