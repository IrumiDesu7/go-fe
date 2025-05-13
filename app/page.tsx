import { PokemonListResponse } from "@/lib/types";
import PokemonCard from "@/components/pokemon-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const limit = 18;
  const offset = (page - 1) * limit;

  const pokemons = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  );
  const data: PokemonListResponse = await pokemons.json();

  const totalCount = data.count;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Pokémon Collection
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data.results.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/?page=${page - 1}`} />
            </PaginationItem>
          )}

          {page > 2 && (
            <PaginationItem>
              <PaginationLink href="/?page=1">1</PaginationLink>
            </PaginationItem>
          )}

          {page > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {page > 1 && (
            <PaginationItem>
              <PaginationLink href={`/?page=${page - 1}`}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive href={`/?page=${page}`}>
              {page}
            </PaginationLink>
          </PaginationItem>

          {page < totalPages && (
            <PaginationItem>
              <PaginationLink href={`/?page=${page + 1}`}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {page < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {page < totalPages - 1 && (
            <PaginationItem>
              <PaginationLink href={`/?page=${totalPages}`}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {page < totalPages && (
            <PaginationItem>
              <PaginationNext href={`/?page=${page + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </main>
  );
}
