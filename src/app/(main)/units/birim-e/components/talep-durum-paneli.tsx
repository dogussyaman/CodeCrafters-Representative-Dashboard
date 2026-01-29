'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    CheckCircle2,
    Clock,
    XCircle,
    Search,
    Filter,
    Eye,
    User,
    Mail,
    Building2,
    Calendar
} from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// Mock data - 120 representatives sending requests
const generateMockRequests = () => {
    const statuses = ['basarili', 'askida', 'basarisiz'] as const
    const requests = []

    for (let i = 1; i <= 120; i++) {
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        requests.push({
            id: i,
            temsilciId: `TMS-${1000 + i}`,
            temsilciAdi: `Temsilci ${i}`,
            musteriEmail: `musteri${i}@sirket.com`,
            musteriTicaret: `${100000 + i * 123}`,
            detay: `Kurumsal satış talebi detayı ${i}`,
            tarih: new Date(2025, 10, Math.floor(Math.random() * 20) + 1).toLocaleDateString('tr-TR'),
            durum: randomStatus
        })
    }
    return requests
}

type RequestStatus = 'basarili' | 'askida' | 'basarisiz'

interface Request {
    id: number
    temsilciId: string
    temsilciAdi: string
    musteriEmail: string
    musteriTicaret: string
    detay: string
    tarih: string
    durum: RequestStatus
}

export default function TalepDurumPaneli() {
    const [requests] = useState<Request[]>(generateMockRequests())
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState<RequestStatus | 'all'>('all')

    const filteredRequests = requests.filter(req => {
        const matchesSearch =
            req.temsilciAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.temsilciId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.musteriEmail.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter = filterStatus === 'all' || req.durum === filterStatus

        return matchesSearch && matchesFilter
    })

    const stats = {
        basarili: requests.filter(r => r.durum === 'basarili').length,
        askida: requests.filter(r => r.durum === 'askida').length,
        basarisiz: requests.filter(r => r.durum === 'basarisiz').length,
        toplam: requests.length
    }

    const getStatusBadge = (status: RequestStatus) => {
        const variants = {
            basarili: { variant: 'default' as const, icon: CheckCircle2, text: 'Başarılı', className: 'bg-green-500/10 text-green-500 hover:bg-green-500/20' },
            askida: { variant: 'secondary' as const, icon: Clock, text: 'Askıda', className: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' },
            basarisiz: { variant: 'destructive' as const, icon: XCircle, text: 'Başarısız', className: 'bg-red-500/10 text-red-500 hover:bg-red-500/20' }
        }
        const config = variants[status]
        const Icon = config.icon
        return (
            <Badge className={config.className}>
                <Icon className="w-3 h-3 mr-1" />
                {config.text}
            </Badge>
        )
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-2 hover:border-primary/50 transition-all duration-300">
                    <CardHeader className="pb-3">
                        <CardDescription>Toplam Talep</CardDescription>
                        <CardTitle className="text-3xl">{stats.toplam}</CardTitle>
                    </CardHeader>
                </Card>

                <Card className="border-2 border-green-500/20 hover:border-green-500/50 transition-all duration-300">
                    <CardHeader className="pb-3">
                        <CardDescription className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Başarılı
                        </CardDescription>
                        <CardTitle className="text-3xl text-green-500">{stats.basarili}</CardTitle>
                    </CardHeader>
                </Card>

                <Card className="border-2 border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300">
                    <CardHeader className="pb-3">
                        <CardDescription className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-500" />
                            Askıda
                        </CardDescription>
                        <CardTitle className="text-3xl text-yellow-500">{stats.askida}</CardTitle>
                    </CardHeader>
                </Card>

                <Card className="border-2 border-red-500/20 hover:border-red-500/50 transition-all duration-300">
                    <CardHeader className="pb-3">
                        <CardDescription className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            Başarısız
                        </CardDescription>
                        <CardTitle className="text-3xl text-red-500">{stats.basarisiz}</CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="relative flex-1 w-full sm:max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Temsilci veya müşteri ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <Button
                                variant={filterStatus === 'all' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilterStatus('all')}
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Tümü
                            </Button>
                            <Button
                                variant={filterStatus === 'basarili' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilterStatus('basarili')}
                                className={filterStatus === 'basarili' ? 'bg-green-500 hover:bg-green-600' : ''}
                            >
                                Başarılı
                            </Button>
                            <Button
                                variant={filterStatus === 'askida' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilterStatus('askida')}
                                className={filterStatus === 'askida' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                            >
                                Askıda
                            </Button>
                            <Button
                                variant={filterStatus === 'basarisiz' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilterStatus('basarisiz')}
                                className={filterStatus === 'basarisiz' ? 'bg-red-500 hover:bg-red-600' : ''}
                            >
                                Başarısız
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {filteredRequests.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                Talep bulunamadı
                            </div>
                        ) : (
                            filteredRequests.map((request) => (
                                <Card key={request.id} className="hover:shadow-md transition-all duration-300 border-l-4 border-l-primary/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-muted-foreground" />
                                                        <span className="font-semibold">{request.temsilciAdi}</span>
                                                        <Badge variant="outline" className="text-xs">
                                                            {request.temsilciId}
                                                        </Badge>
                                                    </div>
                                                    {getStatusBadge(request.durum)}
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-4 h-4" />
                                                        {request.musteriEmail}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="w-4 h-4" />
                                                        {request.musteriTicaret}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        {request.tarih}
                                                    </div>
                                                </div>
                                            </div>

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Talep Detayı #{request.id}</DialogTitle>
                                                        <DialogDescription>
                                                            Kurumsal satış talebi detaylı bilgileri
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4 mt-4">
                                                        <div>
                                                            <label className="text-sm font-medium">Temsilci</label>
                                                            <p className="text-sm text-muted-foreground">{request.temsilciAdi} ({request.temsilciId})</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">Müşteri Email</label>
                                                            <p className="text-sm text-muted-foreground">{request.musteriEmail}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">Ticaret Sicil No</label>
                                                            <p className="text-sm text-muted-foreground">{request.musteriTicaret}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">Tarih</label>
                                                            <p className="text-sm text-muted-foreground">{request.tarih}</p>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">Durum</label>
                                                            <div className="mt-1">{getStatusBadge(request.durum)}</div>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium">Detay</label>
                                                            <p className="text-sm text-muted-foreground mt-1">{request.detay}</p>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
