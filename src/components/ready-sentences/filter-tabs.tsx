'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Star, Grid3x3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterTabsProps {
    activeFilter: 'all' | 'favorites'
    onFilterChange: (filter: 'all' | 'favorites') => void
    totalCount: number
    favoritesCount: number
}

export function FilterTabs({ activeFilter, onFilterChange, totalCount, favoritesCount }: FilterTabsProps) {
    return (
        <div className="flex items-center gap-2 p-1 bg-card/50 border-2 border-border rounded-xl shadow-sm">
            <Button
                variant={activeFilter === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onFilterChange('all')}
                className={cn(
                    "flex-1 h-10 transition-all duration-300",
                    activeFilter === 'all'
                        ? "bg-gradient-to-r from-primary to-primary/80 shadow-lg"
                        : "hover:bg-primary/10"
                )}
            >
                <Grid3x3 className="w-4 h-4 mr-2" />
                Tümü
                <span className={cn(
                    "ml-2 px-2 py-0.5 rounded-full text-xs font-medium",
                    activeFilter === 'all'
                        ? "bg-white/20"
                        : "bg-primary/10 text-primary"
                )}>
                    {totalCount}
                </span>
            </Button>
            <Button
                variant={activeFilter === 'favorites' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onFilterChange('favorites')}
                className={cn(
                    "flex-1 h-10 transition-all duration-300",
                    activeFilter === 'favorites'
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg hover:from-yellow-600 hover:to-yellow-700"
                        : "hover:bg-yellow-500/10 hover:text-yellow-600"
                )}
            >
                <Star className={cn(
                    "w-4 h-4 mr-2",
                    activeFilter === 'favorites' && "fill-white"
                )} />
                Favoriler
                <span className={cn(
                    "ml-2 px-2 py-0.5 rounded-full text-xs font-medium",
                    activeFilter === 'favorites'
                        ? "bg-white/20"
                        : "bg-yellow-500/10 text-yellow-600"
                )}>
                    {favoritesCount}
                </span>
            </Button>
        </div>
    )
}
