import { useState, useEffect } from 'react';
import Api from '../../api/api';

function usePokemonHook() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let pokeList = await Api.get(
          'http://pokeapi.co/api/v2/pokemon?limit=50'
        );
        let allPokemonUrl = pokeList.results.map((ele) => ele.url);
        const responses = await Promise.all(
          allPokemonUrl.map((url) => fetch(url))
        );
        const data = await Promise.all(responses.map((res) => res.json()));
        const alteredData = data.map((ele) => ({
          ...ele,
          cardImg: ele.sprites.other.dream_world.front_default,
        }));
        setData(alteredData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, error, isLoading };
}

export default usePokemonHook;
