import { PokemonListResponse } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

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
        {data.results.map((pokemon) => {
          const pokemonId = pokemon.url.split("/").filter(Boolean).pop();
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

          return (
            <Card
              key={pokemon.name}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2">
                <CardTitle className="capitalize text-lg">
                  {pokemon.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Image
                  src={imageUrl}
                  alt={pokemon.name}
                  width={120}
                  height={120}
                  className="mb-2"
                />
                <span className="text-sm text-muted-foreground">
                  #{pokemonId}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
