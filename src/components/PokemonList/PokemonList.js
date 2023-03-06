import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Api from "../../api/api";
import Pokemon from "../Pokemon/pokemon";
import './PokemonList.css'

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(true);

  async function LoadPokemons() {
    let pokeList = await Api.get('http://pokeapi.co/api/v2/pokemon?limit=26');
    console.log(pokeList)
    var all = [];
    for (let i = 0; i < pokeList.results.length; i++) {
      let pokeDetails = await Api.get(
        `http://pokeapi.co/api/v2/pokemon/${pokeList.results[i].name}`
      );

      console.log(pokeDetails)

      var obj = {
        name: pokeDetails.name,
        id: pokeDetails.id,
        types: pokeDetails.types,
        number: pokeDetails.id.toString().padStart(3, "0"),
        image:
          pokeDetails.sprites.versions["generation-v"]["black-white"]
            .animated.front_default,
      };
      all.push(obj);
    }

    localStorage.setItem("pokedex_pokemons", JSON.stringify(all));
    console.log(all)
    setLoading(false);
  }

  useEffect(() => {
    setLoading(false)
    LoadPokemons()
 }, [])

  return (
    <div>
      <div className="header-component">
        <Link to="/"v className="link">
          <p className="main-heading">Pokédex</p>
        </Link>
        <div class="vertical-line"></div>
        <p className="search-text">Search for any Pokémon that exists on the planet</p>
      </div>
      {/* <div className="pokemon--species--list">
        {pokemonList.map((pokemon, index) => (
          <Pokemon key={pokemon.name} id={index + 1} pokemon={pokemon} />
        ))}
      </div> */}
      ;
    </div>
  );
};

export default PokemonList;
