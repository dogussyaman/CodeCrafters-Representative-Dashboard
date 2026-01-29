'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Star, Trash2, Edit, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Sentence } from '../types'
import { cn } from '@/lib/utils'

interface SentenceCardProps {
    sentence: Sentence
    onDelete: (id: string) => void
    onToggleFavorite: (id: string) => void
    onUpdate: (id: string, text: string) => void
}

export function SentenceCard({ sentence, onDelete, onToggleFavorite, onUpdate }: SentenceCardProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(sentence.text)
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(sentence.text)
            setCopied(true)
            toast.success('Cümle kopyalandı!')
            setTimeout(() => setCopied(false), 2000)
        } catch (error: Error | unknown) {
            toast.error('Kopyalama başarısız!' + error)
        }
    }

    const handleSaveEdit = () => {
        if (editText.trim()) {
            onUpdate(sentence.id, editText.trim())
            setIsEditing(false)
            toast.success('Cümle güncellendi!')
        }
    }

    const handleCancelEdit = () => {
        setEditText(sentence.text)
        setIsEditing(false)
    }

    return (
        <div className="group relative backdrop-blur-sm bg-card/50 border-2 border-border rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Favorite indicator */}
            {sentence.isFavorite && (
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-yellow-500/20 border-l-[40px] border-l-transparent" />
            )}

            <div className="relative p-5 space-y-4">
                {/* Category Badge */}
                <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {sentence.category}
                    </span>
                    {sentence.isFavorite && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                </div>

                {/* Sentence Text */}
                {isEditing ? (
                    <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full min-h-[100px] p-3 text-sm bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        autoFocus
                    />
                ) : (
                    <p className="text-sm text-foreground/90 leading-relaxed min-h-[100px] line-clamp-5">
                        {sentence.text}
                    </p>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                    {isEditing ? (
                        <>
                            <Button
                                size="sm"
                                onClick={handleSaveEdit}
                                className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90 transition-colors"
                            >
                                <Check className="w-3.5 h-3.5 mr-1.5" />
                                Kaydet
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                                className="flex-1 h-8 text-xs hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
                            >
                                İptal
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCopy}
                                className={cn(
                                    "flex-1 h-8 text-xs transition-all duration-300",
                                    copied
                                        ? "bg-green-500/10 text-green-600 border-green-500/50"
                                        : "hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                                )}
                            >
                                {copied ? (
                                    <Check className="w-3.5 h-3.5 mr-1.5" />
                                ) : (
                                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                                )}
                                {copied ? 'Kopyalandı' : 'Kopyala'}
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onToggleFavorite(sentence.id)}
                                className={cn(
                                    "h-8 px-3 transition-all duration-300",
                                    sentence.isFavorite
                                        ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/50 hover:bg-yellow-500/20"
                                        : "hover:bg-yellow-500/10 hover:text-yellow-600 hover:border-yellow-500/50"
                                )}
                            >
                                <Star className={cn("w-3.5 h-3.5", sentence.isFavorite && "fill-yellow-500")} />
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setIsEditing(true)}
                                className="h-8 px-3 hover:bg-blue-500/10 hover:text-blue-600 hover:border-blue-500/50 transition-colors"
                            >
                                <Edit className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    if (confirm('Bu cümleyi silmek istediğinizden emin misiniz?')) {
                                        onDelete(sentence.id)
                                        toast.success('Cümle silindi!')
                                    }
                                }}
                                className="h-8 px-3 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                        </>
                    )}
                </div>

                {/* Timestamp */}
                <div className="text-xs text-muted-foreground pt-1">
                    {new Date(sentence.updatedAt).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </div>
        </div>
    )
}
