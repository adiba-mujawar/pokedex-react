import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Api from "../../api/api";
import Pokemon from "../Pokemon/pokemon";
import './PokemonList.css'

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     setLoading(false)
     Api.get('http://pokeapi.co/api/v2/pokemon?limit=24').then(res => {
      console.log(res)
        setPokemonList(res.results)
     })
    //  var all = [];
    //   for (var i = 0; i < pokeList.data.results.length; i++) {
    //   let pokeDetails = await api.get(
    //     `/pokemon/${pokeList.data.results[i].name}`
    //   );

    //   var obj = {
    //     name: pokeDetails.data.name,
    //     id: pokeDetails.data.id,
    //     types: pokeDetails.data.types,
    //     number: pokeDetails.data.id.toString().padStart(3, "0"),
    //     image:
    //       pokeDetails.data.sprites.versions["generation-v"]["black-white"]
    //         .animated.front_default,
    //   };
    //   all.push(obj);
    // }

    // SavePokemons(all);
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
      <div className="pokemon--species--list">
        {pokemonList.map((pokemon, index) => (
          <Pokemon key={pokemon.name} id={index + 1} pokemon={pokemon} />
        ))}
      </div>
      ;
    </div>
  );
};

export default PokemonList;
