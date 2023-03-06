import './pokemon.css';
import { Link } from 'react-router-dom';
const pokemon = (props) => {
  const { pokemon, id } = props;
  return (
    <div className="pokemon--species">
      <div className="pokemon--species--container">
        <div className="pokemon-species-sprite">
          <Link to={`/details/${pokemon.name}`}>
            <img className="image" alt="" src={pokemon.cardImg} />
          </Link>
        </div>
        <div className="pokemon-species-name">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </div>
        <div className="pokemon-specied-id">{('00' + id).slice(-3)}</div>
      </div>
    </div>
  );
};

export default pokemon;
