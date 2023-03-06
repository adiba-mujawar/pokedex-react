import React from "react";
import { Route, Routes } from "react-router-dom";

import PokemonList from "./components/PokemonList/PokemonList";
import PokemonDetails from "./components/PokeDetails/PokeDetails";

function Router() {
  return (
      <Routes>
         <Route path="/" element={ <PokemonList/> } />
         <Route path="/details/:name?" element={ <PokemonDetails/> } />
      </Routes>
  );
}

export default Router;