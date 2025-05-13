"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // Reset to page 1 when search changes
    params.set("page", "1");

    router.push(`/?${params.toString()}`);
  }, 500);

  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "");
  }, [searchParams]);

  return (
    <div className="mb-6">
      <Input
        type="text"
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChange={(e) => {
          const value = e.target.value;
          setSearchQuery(value);
          handleSearch(value);
        }}
        className="max-w-md mx-auto"
      />
    </div>
  );
}
