"use client";

import { useState } from "react";
import { SearchStats } from "./_components/search-stats";
import { SearchFilters } from "./_components/search-filters";
import { SearchResults } from "./_components/search-results";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeCats, setActiveCats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedUnit, setSelectedUnit] = useState("Tümü");

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Genel Arama</h1>
          <p className="text-muted-foreground mt-2">
            Tüm birimler ve içerikler arasında hızlı ve detaylı arama yapın.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <SearchStats />

      {/* Search & Filters */}
      <SearchFilters
        query={query}
        setQuery={setQuery}
        activeCats={activeCats}
        setActiveCats={setActiveCats}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
      />

      {/* Results */}
      <SearchResults
        query={query}
        activeCats={activeCats}
        selectedUnit={selectedUnit}
        sortBy={sortBy}
      />
    </div>
  );
}