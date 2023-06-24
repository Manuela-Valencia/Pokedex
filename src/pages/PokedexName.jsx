import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import PokedexNameCard from "../components/Pokedex/PokedexNameCard.jsx"

const PokedexName = () => {

const { name } =  useParams()

const url = `https://pokeapi.co/api/v2/pokemon/${name}`
const [ pokemon, getPokemonByName, hasError ] =  useFetch(url)

useEffect(() => {
    getPokemonByName()
} , [name])

  return (
      <div>
          {
              hasError
              ? <DoesntExits/>
              : (
                  <PokedexNameCard pokemon={pokemon}/>
              )
          }
      </div>
  )
};

export default PokedexName