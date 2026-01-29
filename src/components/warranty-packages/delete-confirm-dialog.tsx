'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle, X } from 'lucide-react'

interface DeleteConfirmDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    packageName: string
}

export function DeleteConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    packageName
}: DeleteConfirmDialogProps) {
    if (!isOpen) return null

    const handleConfirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative w-full max-w-md bg-card border-2 border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-transparent to-destructive/5 pointer-events-none" />

                {/* Header */}
                <div className="relative flex items-center justify-between p-6 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-foreground">Paketi Sil</h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0 hover:bg-muted transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="relative p-6 space-y-4">
                    <p className="text-sm text-foreground">
                        <span className="font-semibold text-destructive">{packageName}</span> paketini silmek istediğinizden emin misiniz?
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Bu işlem geri alınamaz. Paket kalıcı olarak silinecektir.
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4">
                        <Button
                            onClick={handleConfirm}
                            className="flex-1 h-10 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Evet, Sil
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-10 hover:bg-muted transition-colors"
                        >
                            İptal
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
