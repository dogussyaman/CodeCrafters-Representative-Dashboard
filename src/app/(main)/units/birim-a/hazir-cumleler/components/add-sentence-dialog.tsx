'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { X, Plus, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { SentenceFormData } from '../types'

interface AddSentenceDialogProps {
    isOpen: boolean
    onClose: () => void
    onAdd: (data: SentenceFormData) => void
}

export function AddSentenceDialog({ isOpen, onClose, onAdd }: AddSentenceDialogProps) {
    const [formData, setFormData] = useState<SentenceFormData>({
        text: '',
        category: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.text.trim() || !formData.category.trim()) {
            toast.error('Lütfen tüm alanları doldurun!')
            return
        }

        onAdd(formData)
        setFormData({ text: '', category: '' })
        onClose()
        toast.success('Hazır cümle eklendi!')
    }

    const handleClose = () => {
        setFormData({ text: '', category: '' })
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Dialog */}
            <div className="relative w-full max-w-2xl bg-card border-2 border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

                {/* Header */}
                <div className="relative flex items-center justify-between p-6 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-foreground">Yeni Hazır Cümle Ekle</h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClose}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="relative p-6 space-y-5">
                    <Field>
                        <FieldLabel htmlFor="category" className="text-sm font-medium">
                            Kategori
                        </FieldLabel>
                        <Input
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            placeholder="Örn: Karşılama, Veda, Teşekkür..."
                            required
                            className="mt-1.5 border-border/60 focus:border-primary transition-colors"
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="text" className="text-sm font-medium">
                            Cümle Metni
                        </FieldLabel>
                        <Textarea
                            id="text"
                            value={formData.text}
                            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                            placeholder="Hazır cümlenizi buraya yazın..."
                            rows={6}
                            required
                            className="mt-1.5 resize-none border-border/60 focus:border-primary transition-colors"
                        />
                    </Field>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4">
                        <Button
                            type="submit"
                            className="flex-1 h-10 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            Ekle
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className="flex-1 h-10 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
                        >
                            İptal
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
