'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Hazır cümlelerde ara..."
                className="pl-12 pr-12 h-12 bg-card/50 border-2 border-border focus:border-primary transition-all duration-300 rounded-xl shadow-sm focus:shadow-lg focus:shadow-primary/10"
            />
            {value && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onChange('')}
                    className="absolute inset-y-0 right-0 h-full px-4 hover:bg-transparent hover:text-destructive transition-colors"
                >
                    <X className="w-5 h-5" />
                </Button>
            )}
        </div>
    )
}
