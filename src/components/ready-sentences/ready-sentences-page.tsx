'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, FileText, Sparkles } from 'lucide-react'
import { SentenceCard } from './sentence-card'
import { AddSentenceDialog } from './add-sentence-dialog'
import { SearchBar } from './search-bar'
import { FilterTabs } from './filter-tabs'
import { Sentence, SentenceFormData } from './types'

interface ReadySentencesPageProps {
    unitName: string
    initialSentences?: Sentence[]
}

export function ReadySentencesPage({ unitName, initialSentences = [] }: ReadySentencesPageProps) {
    const [sentences, setSentences] = useState<Sentence[]>(initialSentences)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState<'all' | 'favorites'>('all')
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

    // Filter and search logic
    const filteredSentences = useMemo(() => {
        let filtered = sentences

        // Apply favorite filter
        if (activeFilter === 'favorites') {
            filtered = filtered.filter(s => s.isFavorite)
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(s =>
                s.text.toLowerCase().includes(query) ||
                s.category.toLowerCase().includes(query)
            )
        }

        // Sort by favorites first, then by update date
        return filtered.sort((a, b) => {
            if (a.isFavorite && !b.isFavorite) return -1
            if (!a.isFavorite && b.isFavorite) return 1
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        })
    }, [sentences, searchQuery, activeFilter])

    const favoritesCount = sentences.filter(s => s.isFavorite).length

    const handleAddSentence = (data: SentenceFormData) => {
        const newSentence: Sentence = {
            id: Date.now().toString(),
            ...data,
            isFavorite: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        setSentences([newSentence, ...sentences])
    }

    const handleDeleteSentence = (id: string) => {
        setSentences(sentences.filter(s => s.id !== id))
    }

    const handleToggleFavorite = (id: string) => {
        setSentences(sentences.map(s =>
            s.id === id
                ? { ...s, isFavorite: !s.isFavorite, updatedAt: new Date() }
                : s
        ))
    }

    const handleUpdateSentence = (id: string, text: string) => {
        setSentences(sentences.map(s =>
            s.id === id
                ? { ...s, text, updatedAt: new Date() }
                : s
        ))
    }

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="relative backdrop-blur-sm bg-card/50 border-2 border-border rounded-2xl shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

                <div className="relative p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-foreground">{unitName} - Hazır Cümleler</h1>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    Sık kullanılan cümlelerinizi yönetin
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setIsAddDialogOpen(true)}
                            className="h-9 px-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            Yeni Cümle Ekle
                        </Button>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>
                <div>
                    <FilterTabs
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                        totalCount={sentences.length}
                        favoritesCount={favoritesCount}
                    />
                </div>
            </div>

            {/* Sentences Grid */}
            {filteredSentences.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSentences.map((sentence) => (
                        <SentenceCard
                            key={sentence.id}
                            sentence={sentence}
                            onDelete={handleDeleteSentence}
                            onToggleFavorite={handleToggleFavorite}
                            onUpdate={handleUpdateSentence}
                        />
                    ))}
                </div>
            ) : (
                <div className="relative backdrop-blur-sm bg-card/50 border-2 border-dashed border-border rounded-2xl shadow-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

                    <div className="relative p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                            <FileText className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            {searchQuery || activeFilter === 'favorites'
                                ? 'Sonuç Bulunamadı'
                                : 'Henüz Hazır Cümle Yok'}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            {searchQuery
                                ? 'Arama kriterlerinize uygun cümle bulunamadı.'
                                : activeFilter === 'favorites'
                                    ? 'Henüz favori cümle eklemediniz.'
                                    : 'Yeni bir hazır cümle ekleyerek başlayın.'}
                        </p>
                        {!searchQuery && activeFilter === 'all' && (
                            <Button
                                onClick={() => setIsAddDialogOpen(true)}
                                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                İlk Cümleyi Ekle
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* Add Sentence Dialog */}
            <AddSentenceDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onAdd={handleAddSentence}
            />
        </div>
    )
}
