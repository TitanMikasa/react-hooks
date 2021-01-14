// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react';
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import { fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback } from '../pokemon';

function PokemonInfo({pokemonName}) {
 const [state, setState] = React.usestate({
   status: pokemonName ? 'pending': 'idle',
   error: null,
   pokemon: null
 });
 const {status, pokemon, error} = state;
 React.useEffect(() => {
   if(!pokemonName) return;
   setState({status: 'pending'});
   fetchPokemon(pokemonName).then(pokemon => setState({status: 'resolved', pokemon}))
   .catch(e => setState({status: 'rejected', error}));
 }, [pokemonName]);
 if(status === 'idle') {return 'please provide pokemon name'}
 else if(status === 'pending') {return <PokemonInfoFallback name={pokemonName} />}
 else if (status === 'rejected') {throw error}
 else if(status === 'resolved') {return <PokemonDataView pokemon={pokemon} />}
 throw new Error('This is impossible');
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
