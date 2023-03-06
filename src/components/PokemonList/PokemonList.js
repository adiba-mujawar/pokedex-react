import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import Api from '../../api/api';
import Pokemon from '../Pokemon/pokemon';
import './PokemonList.css';

const PokemonList = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState(
    'http://pokeapi.co/api/v2/pokemon?offset=0&limit=50'
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let pokeList = await Api.get(nextUrl);
        setNextUrl(pokeList.next);
        let allPokemonUrl = pokeList.results.map((ele) => ele.url);
        const responses = await Promise.all(
          allPokemonUrl.map((url) => fetch(url))
        );
        const resData = await Promise.all(responses.map((res) => res.json()));
        const alteredData = resData.map((ele) => ({
          ...ele,
          cardImg: ele.sprites.other.dream_world.front_default,
        }));
        setData([...data, ...alteredData]);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  function addMorePokemon() {
    setPage(page + 1);
  }

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
      <InfiniteScroll
        dataLength={data.length}
        next={addMorePokemon}
        hasMore={nextUrl}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="pokemon--species--list">
          {data.map((pokemon, index) => (
            <Pokemon key={pokemon.name} id={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </InfiniteScroll>
      ;
    </div>
  );
};

export default PokemonList;
