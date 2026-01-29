"use client";

import { FileText, Tag, Shield, Folder } from "lucide-react";
import { searchCategories } from "@/data/search-data";
import { UNITS } from "@/data/units";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type SearchFiltersProps = {
    query: string;
    setQuery: (q: string) => void;
    activeCats: string[];
    setActiveCats: (cats: string[]) => void;
    sortBy: string;
    setSortBy: (s: string) => void;
    selectedUnit: string;
    setSelectedUnit: (u: string) => void;
};

export function SearchFilters({
    query,
    setQuery,
    activeCats,
    setActiveCats,
    sortBy,
    setSortBy,
    selectedUnit,
    setSelectedUnit,
}: SearchFiltersProps) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const toggleCat = (key: string) => {
        setActiveCats(activeCats.includes(key) ? activeCats.filter((c) => c !== key) : [...activeCats, key]);
    };

    const clearFilters = () => {
        setActiveCats([]);
        setSelectedUnit("Tümü");
        setSortBy("relevance");
        setQuery("");
    };

    return (
        <Card>
            <CardContent className="p-4">
                {/* Search Bar */}
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="İçerikte ara..."
                        className="flex-1 rounded-md border px-3 py-2 text-sm"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button size="sm">Ara</Button>
                </div>

                {/* Category Badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {searchCategories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCats.includes(cat.key);
                        return (
                            <Badge
                                key={cat.key}
                                variant={isActive ? "default" : "outline"}
                                className="flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
                                onClick={() => toggleCat(cat.key)}
                            >
                                <Icon className="h-3 w-3" />
                                {cat.label}
                            </Badge>
                        );
                    })}
                </div>

                {/* Advanced Filters Toggle */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 gap-1"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                >
                    Gelişmiş Filtreler
                    <ChevronDown
                        className={`h-4 w-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                    />
                </Button>

                {/* Advanced Filters */}
                {showAdvanced && (
                    <div className="mt-4 grid gap-4 md:grid-cols-3 border-t pt-4">
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Birim</label>
                            <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Birim Seç" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Tümü">Tümü</SelectItem>
                                    {UNITS.map((unit) => (
                                        <SelectItem key={unit} value={unit}>
                                            {unit}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Sıralama</label>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sıralama" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="relevance">En Alakalı</SelectItem>
                                    <SelectItem value="date">En Yeni</SelectItem>
                                    <SelectItem value="popular">En Popüler</SelectItem>
                                    <SelectItem value="alphabetical">A-Z</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-end">
                            <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
                                Filtreleri Temizle
                            </Button>
                        </div>
                    </div>
                )}

                {/* Active Filters Summary */}
                {(activeCats.length > 0 || selectedUnit !== "Tümü") && (
                    <div className="mt-3 text-xs text-muted-foreground">
                        <span className="fontmedium">Aktif Filtreler:</span>{" "}
                        {activeCats.length > 0 && `${activeCats.length} kategori`}
                        {activeCats.length > 0 && selectedUnit !== "Tümü" && ", "}
                        {selectedUnit !== "Tümü" && `Birim: ${selectedUnit}`}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
