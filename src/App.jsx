import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [poke, setPokes] = useState([]); // Use more descriptive name

  useEffect(() => {
    const getPoke = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"
      );
      const listaPokes = await response.json();
      const { results } = listaPokes;

      const newPoke = results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const pokemons = await response.json();

        return {
          id: pokemons.id,
          name: pokemons.name,
          img: pokemons.sprites.other.dream_world.front_default,
        };
      });
      setPokes(await Promise.all(newPoke));
    };

    getPoke();
  }, []);

  return (
    <>
      <h1 className="titulo">Pokedex</h1>
      <section className="pokemon-container">
        {poke.map((pokemon) => {
          return (
            <div className="pokemon-card">
              <img
                src={pokemon.img}
                alt={pokemon.name}
                className="pokemon-imagen"
              />

              <p className="pokemon-titulo">
                <span>#{pokemon.id}</span>
                <span>{pokemon.name}</span>
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
