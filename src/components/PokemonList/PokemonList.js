import { Link } from 'react-router-dom';
import Pokemon from '../Pokemon/pokemon';
import './PokemonList.css';
import usePokemonHook from './usePokemonHook';

const PokemonList = () => {
  const { data, error, isLoading } = usePokemonHook('https://example.com/api');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return null;
  }
  return (
    <div>
      <div className="header-component">
        <Link to="/" v className="link">
          <p className="main-heading">Pokédex</p>
        </Link>
        <div className="vertical-line"></div>
        <p className="search-text">
          Search for any Pokémon that exists on the planet
        </p>
      </div>
      <div className="pokemon--species--list">
        {data.map((pokemon, index) => (
          <Pokemon key={pokemon.name} id={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      ;
    </div>
  );
};

export default PokemonList;
