'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Shield } from 'lucide-react'
import { SearchBar } from './search-bar'
import { PackageTableRow } from './package-table-row'
import { CategoryCard } from './category-card'
import { AddEditPackageDialog } from './add-edit-package-dialog'
import { DeleteConfirmDialog } from './delete-confirm-dialog'
import { WarrantyPackage, CategoryPricing } from './types'

interface WarrantyPackagesPageProps {
    unitName: string
    packages: WarrantyPackage[]
    categories: CategoryPricing[]
    onAddPackage?: (data: Omit<WarrantyPackage, 'id'>) => void
    onEditPackage?: (id: string, data: Omit<WarrantyPackage, 'id'>) => void
    onDeletePackage?: (id: string) => void
}

export function WarrantyPackagesPage({
    unitName,
    packages: initialPackages,
    categories,
    onAddPackage,
    onEditPackage,
    onDeletePackage
}: WarrantyPackagesPageProps) {
    // Local state for demo purposes if no handlers provided
    const [packages, setPackages] = useState<WarrantyPackage[]>(initialPackages)
    const [searchQuery, setSearchQuery] = useState('')

    // Dialog states
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingPackage, setEditingPackage] = useState<WarrantyPackage | null>(null)
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

    // Filter packages based on search
    const filteredPackages = useMemo(() => {
        if (!searchQuery.trim()) return packages

        const query = searchQuery.toLowerCase()
        return packages.filter(pkg =>
            pkg.code.toLowerCase().includes(query) ||
            pkg.name.toLowerCase().includes(query)
        )
    }, [packages, searchQuery])

    // Handlers
    const handleAdd = (data: Omit<WarrantyPackage, 'id'>) => {
        if (onAddPackage) {
            onAddPackage(data)
        } else {
            // Demo logic
            const newPackage: WarrantyPackage = {
                id: Date.now().toString(),
                ...data
            }
            setPackages([...packages, newPackage])
        }
        setIsAddDialogOpen(false)
    }

    const handleEdit = (data: Omit<WarrantyPackage, 'id'>) => {
        if (!editingPackage) return

        if (onEditPackage) {
            onEditPackage(editingPackage.id, data)
        } else {
            // Demo logic
            setPackages(packages.map(p =>
                p.id === editingPackage.id ? { ...p, ...data } : p
            ))
        }
        setEditingPackage(null)
    }

    const handleDelete = () => {
        if (!deleteConfirmId) return

        if (onDeletePackage) {
            onDeletePackage(deleteConfirmId)
        } else {
            // Demo logic
            setPackages(packages.filter(p => p.id !== deleteConfirmId))
        }
        setDeleteConfirmId(null)
    }

    const openEditDialog = (id: string) => {
        const pkg = packages.find(p => p.id === id)
        if (pkg) {
            setEditingPackage(pkg)
        }
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
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-foreground">{unitName} - Güvence Paketleri</h1>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    Araç kiralama güvence paketleri ve fiyatlandırma bilgileri
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setIsAddDialogOpen(true)}
                            className="h-9 px-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            Yeni Paket
                        </Button>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-md">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Packages Table */}
            {filteredPackages.length > 0 ? (
                <div className="relative rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border bg-muted/30">
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Kod
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Güvence Adı
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Günlük Fiyat
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Aylık Fiyat
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Kurumsal Ofis
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Lisansiye Ofis
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPackages.map((pkg) => (
                                    <PackageTableRow
                                        key={pkg.id}
                                        package={pkg}
                                        onEdit={openEditDialog}
                                        onDelete={setDeleteConfirmId}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="relative backdrop-blur-sm bg-card/50 border-2 border-dashed border-border rounded-2xl shadow-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
                    <div className="relative p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                            <Shield className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            {searchQuery ? 'Sonuç Bulunamadı' : 'Henüz Paket Yok'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {searchQuery
                                ? 'Arama kriterlerinize uygun paket bulunamadı.'
                                : 'Yeni bir güvence paketi ekleyerek başlayın.'}
                        </p>
                    </div>
                </div>
            )}

            {/* Category Cards */}
            {categories.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-foreground">Paket Kategorileri</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {categories.map((category, index) => (
                            <CategoryCard key={index} category={category} />
                        ))}
                    </div>
                </div>
            )}

            {/* Dialogs */}
            <AddEditPackageDialog
                isOpen={isAddDialogOpen || !!editingPackage}
                onClose={() => {
                    setIsAddDialogOpen(false)
                    setEditingPackage(null)
                }}
                onSave={editingPackage ? handleEdit : handleAdd}
                editingPackage={editingPackage}
            />

            <DeleteConfirmDialog
                isOpen={!!deleteConfirmId}
                onClose={() => setDeleteConfirmId(null)}
                onConfirm={handleDelete}
                packageName={packages.find(p => p.id === deleteConfirmId)?.name || ''}
            />
        </div>
    )
}
