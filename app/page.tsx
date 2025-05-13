import { PokemonListResponse } from "@/lib/types";
import PokemonCard from "@/components/pokemon-card";
import SearchInput from "@/components/search-input";
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
  searchParams: { page?: string; query?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const query = searchParams.query || "";
  const limit = 18;
  const offset = (page - 1) * limit;

  const allPokemons = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=1500"
  );
  const allData: PokemonListResponse = await allPokemons.json();

  let filteredResults = allData.results;

  if (query) {
    filteredResults = allData.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  const totalCount = filteredResults.length;
  const totalPages = Math.ceil(totalCount / limit);

  const paginatedResults = filteredResults.slice(offset, offset + limit);

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Pokémon Collection
      </h1>

      <SearchInput />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
        {paginatedResults.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
      </div>

      {paginatedResults.length > 0 ? (
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`/?page=${page - 1}${query ? `&query=${query}` : ""}`}
                />
              </PaginationItem>
            )}

            {page > 2 && (
              <PaginationItem>
                <PaginationLink
                  href={`/?page=1${query ? `&query=${query}` : ""}`}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}

            {page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {page > 1 && (
              <PaginationItem>
                <PaginationLink
                  href={`/?page=${page - 1}${query ? `&query=${query}` : ""}`}
                >
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                isActive
                href={`/?page=${page}${query ? `&query=${query}` : ""}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>

            {page < totalPages && (
              <PaginationItem>
                <PaginationLink
                  href={`/?page=${page + 1}${query ? `&query=${query}` : ""}`}
                >
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
                <PaginationLink
                  href={`/?page=${totalPages}${query ? `&query=${query}` : ""}`}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            {page < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href={`/?page=${page + 1}${query ? `&query=${query}` : ""}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No Pokémon found matching your search.
        </div>
      )}
    </main>
  );
}
