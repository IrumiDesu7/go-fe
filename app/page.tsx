import { PokemonListResponse } from "@/lib/types";
import PokemonCard from "@/components/pokemon-card";

export default async function Home() {
  const pokemons = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10"
  );
  const data: PokemonListResponse = await pokemons.json();

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Pokémon Collection
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.results.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
      </div>
    </main>
  );
}
