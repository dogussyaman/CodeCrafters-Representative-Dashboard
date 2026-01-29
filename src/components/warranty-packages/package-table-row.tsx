'use client'

import { Check, Edit, Trash2, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { WarrantyPackage } from './types'
import { toast } from 'sonner'

interface PackageTableRowProps {
    package: WarrantyPackage
    onEdit?: (id: string) => void
    onDelete?: (id: string) => void
}

export function PackageTableRow({ package: pkg, onEdit, onDelete }: PackageTableRowProps) {
    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
        toast.success(`${label} kopyalandı!`)
    }

    return (
        <tr className="group hover:bg-muted/30 transition-colors border-b border-border/50">
            {/* Kod */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {pkg.code}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCopy(pkg.code, 'Kod')}
                    >
                        <Copy className="h-3 w-3" />
                    </Button>
                </div>
            </td>

            {/* Güvence Adı */}
            <td className="px-4 py-3">
                <span className="text-sm font-medium text-foreground">{pkg.name}</span>
            </td>

            {/* Günlük Fiyat */}
            <td className="px-4 py-3">
                <span className="text-sm font-semibold text-foreground">{pkg.dailyPrice} TL</span>
            </td>

            {/* Aylık Fiyat */}
            <td className="px-4 py-3">
                <span className="text-sm font-semibold text-foreground">{pkg.monthlyPrice.toLocaleString('tr-TR')} TL</span>
            </td>

            {/* Kurumsal Ofis */}
            <td className="px-4 py-3 text-center">
                {pkg.hasCorporateOffice ? (
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto" />
                ) : (
                    <span className="text-muted-foreground text-sm">—</span>
                )}
            </td>

            {/* Lisansiye Ofis */}
            <td className="px-4 py-3 text-center">
                {pkg.hasLicenseOffice ? (
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto" />
                ) : (
                    <span className="text-muted-foreground text-sm">—</span>
                )}
            </td>

            {/* İşlemler */}
            <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                    {onEdit && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-500/10 hover:text-blue-600"
                            onClick={() => onEdit(pkg.id)}
                        >
                            <Edit className="h-3.5 w-3.5" />
                        </Button>
                    )}
                    {onDelete && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => onDelete(pkg.id)}
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    )}
                </div>
            </td>
        </tr>
    )
}
