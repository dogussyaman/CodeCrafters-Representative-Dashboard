'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { X, Plus, Save } from 'lucide-react'
import { toast } from 'sonner'
import { WarrantyPackage } from './types'
import { Checkbox } from '@/components/ui/checkbox'

interface AddEditPackageDialogProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: Omit<WarrantyPackage, 'id'>) => void
    editingPackage?: WarrantyPackage | null
}

export function AddEditPackageDialog({
    isOpen,
    onClose,
    onSave,
    editingPackage
}: AddEditPackageDialogProps) {
    const [formData, setFormData] = useState<Omit<WarrantyPackage, 'id'>>({
        code: editingPackage?.code || '',
        name: editingPackage?.name || '',
        dailyPrice: editingPackage?.dailyPrice || 0,
        monthlyPrice: editingPackage?.monthlyPrice || 0,
        hasCorporateOffice: editingPackage?.hasCorporateOffice || false,
        hasLicenseOffice: editingPackage?.hasLicenseOffice || false,
        category: editingPackage?.category || 'eco'
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.code.trim() || !formData.name.trim()) {
            toast.error('Lütfen tüm zorunlu alanları doldurun!')
            return
        }

        if (formData.dailyPrice <= 0 || formData.monthlyPrice <= 0) {
            toast.error('Fiyatlar sıfırdan büyük olmalıdır!')
            return
        }

        onSave(formData)
        handleClose()
        toast.success(editingPackage ? 'Paket güncellendi!' : 'Paket eklendi!')
    }

    const handleClose = () => {
        setFormData({
            code: '',
            name: '',
            dailyPrice: 0,
            monthlyPrice: 0,
            hasCorporateOffice: false,
            hasLicenseOffice: false,
            category: 'eco'
        })
        onClose()
    }

    // Reset form when editing package changes
    useState(() => {
        if (editingPackage) {
            setFormData({
                code: editingPackage.code,
                name: editingPackage.name,
                dailyPrice: editingPackage.dailyPrice,
                monthlyPrice: editingPackage.monthlyPrice,
                hasCorporateOffice: editingPackage.hasCorporateOffice,
                hasLicenseOffice: editingPackage.hasLicenseOffice,
                category: editingPackage.category
            })
        }
    })

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Dialog */}
            <div className="relative w-full max-w-2xl bg-card border-2 border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

                {/* Header */}
                <div className="relative flex items-center justify-between p-6 border-b border-border/50 sticky top-0 bg-card/95 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            {editingPackage ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </div>
                        <h2 className="text-xl font-semibold text-foreground">
                            {editingPackage ? 'Paketi Düzenle' : 'Yeni Paket Ekle'}
                        </h2>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Kod */}
                        <Field>
                            <FieldLabel htmlFor="code" className="text-sm font-medium">
                                Paket Kodu <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                id="code"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                placeholder="Örn: SM, LCFA, MH"
                                required
                                className="mt-1.5 border-border/60 focus:border-primary transition-colors uppercase"
                                maxLength={10}
                            />
                            <FieldDescription className="mt-1 text-xs">
                                Kısa ve benzersiz kod (max 10 karakter)
                            </FieldDescription>
                        </Field>

                        {/* Category */}
                        <Field>
                            <FieldLabel htmlFor="category" className="text-sm font-medium">
                                Kategori <span className="text-destructive">*</span>
                            </FieldLabel>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                className="mt-1.5 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none transition-colors"
                                required
                            >
                                <option value="eco">Eco</option>
                                <option value="comfort">Konfor</option>
                                <option value="prestige">Prestij</option>
                                <option value="premium">Premium</option>
                            </select>
                        </Field>
                    </div>

                    {/* Name */}
                    <Field>
                        <FieldLabel htmlFor="name" className="text-sm font-medium">
                            Güvence Adı <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Örn: Mini Güvence Paketi"
                            required
                            className="mt-1.5 border-border/60 focus:border-primary transition-colors"
                        />
                    </Field>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Daily Price */}
                        <Field>
                            <FieldLabel htmlFor="dailyPrice" className="text-sm font-medium">
                                Günlük Fiyat (TL) <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                id="dailyPrice"
                                type="number"
                                value={formData.dailyPrice || ''}
                                onChange={(e) => setFormData({ ...formData, dailyPrice: Number(e.target.value) })}
                                placeholder="0"
                                required
                                min="0"
                                step="0.01"
                                className="mt-1.5 border-border/60 focus:border-primary transition-colors"
                            />
                        </Field>

                        {/* Monthly Price */}
                        <Field>
                            <FieldLabel htmlFor="monthlyPrice" className="text-sm font-medium">
                                Aylık Fiyat (TL) <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                id="monthlyPrice"
                                type="number"
                                value={formData.monthlyPrice || ''}
                                onChange={(e) => setFormData({ ...formData, monthlyPrice: Number(e.target.value) })}
                                placeholder="0"
                                required
                                min="0"
                                step="0.01"
                                className="mt-1.5 border-border/60 focus:border-primary transition-colors"
                            />
                        </Field>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="hasCorporateOffice"
                                checked={formData.hasCorporateOffice}
                                onCheckedChange={(checked) =>
                                    setFormData({ ...formData, hasCorporateOffice: checked as boolean })
                                }
                            />
                            <label
                                htmlFor="hasCorporateOffice"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                Kurumsal Ofis
                            </label>
                        </div>

                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="hasLicenseOffice"
                                checked={formData.hasLicenseOffice}
                                onCheckedChange={(checked) =>
                                    setFormData({ ...formData, hasLicenseOffice: checked as boolean })
                                }
                            />
                            <label
                                htmlFor="hasLicenseOffice"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                Lisansiye Ofis
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                        <Button
                            type="submit"
                            className="flex-1 h-10 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            {editingPackage ? (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    Güncelle
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                    Ekle
                                </>
                            )}
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
