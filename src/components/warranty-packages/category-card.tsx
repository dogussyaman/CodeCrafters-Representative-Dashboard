'use client'

import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CategoryPricing } from './types'
import { toast } from 'sonner'

interface CategoryCardProps {
    category: CategoryPricing
}

export function CategoryCard({ category }: CategoryCardProps) {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success('Fiyat bilgisi kopyalandı!')
    }

    return (
        <div className="relative group rounded-xl border border-border bg-card/50 p-4 hover:shadow-md transition-all duration-300 hover:border-primary/30">
            {category.badge && (
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[32px] border-t-primary/20 border-l-[32px] border-l-transparent rounded-tr-xl">
                    <span className="absolute -top-7 right-0.5 text-[10px] font-semibold text-primary transform -rotate-45">
                        {category.badge}
                    </span>
                </div>
            )}

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-foreground">{category.label}</h4>
                    {category.badge && (
                        <span className={cn(
                            "text-[10px] font-medium px-2 py-0.5 rounded-full",
                            category.badgeColor || "bg-primary/10 text-primary"
                        )}>
                            {category.badge}
                        </span>
                    )}
                </div>

                <div className="space-y-2">
                    {/* Günlük Ücret */}
                    <div className="flex items-center justify-between group/price">
                        <span className="text-xs text-muted-foreground">Günlük Ücret</span>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-primary">{category.dailyPrice} TL</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-5 w-5 p-0 opacity-0 group-hover/price:opacity-100 transition-opacity"
                                onClick={() => handleCopy(`${category.dailyPrice} TL`)}
                            >
                                <Copy className="h-3 w-3" />
                            </Button>
                            <span className="text-xs text-muted-foreground">+ KDV</span>
                        </div>
                    </div>

                    {/* Aylık Ücret */}
                    <div className="flex items-center justify-between group/price">
                        <span className="text-xs text-muted-foreground">Aylık Ücret</span>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-primary">{category.monthlyPrice} TL</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-5 w-5 p-0 opacity-0 group-hover/price:opacity-100 transition-opacity"
                                onClick={() => handleCopy(`${category.monthlyPrice} TL`)}
                            >
                                <Copy className="h-3 w-3" />
                            </Button>
                            <span className="text-xs text-muted-foreground">+ KDV</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
