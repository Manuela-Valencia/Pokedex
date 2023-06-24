import PokeCard from "./PokeCard"
import "./styles/pokeContainer.css"

const PokeContainer = ( { pokemons}) => {

  return (
    <div className="card-container">
      {
        pokemons?.map(pokemon => (
          <PokeCard 
          key={pokemon.url}
          url={pokemon.url}
          />
        ))
      }
    </div>
  )
}

export default PokeContainer