'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
    Search,
    TrendingUp,
    TrendingDown,
    User,
    Award,
    Target
} from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// Generate mock representative data
const generateRepresentativeData = () => {
    const representatives = []

    for (let i = 1; i <= 120; i++) {
        const basarili = Math.floor(Math.random() * 10)
        const askida = Math.floor(Math.random() * 5)
        const basarisiz = Math.floor(Math.random() * 8)
        const toplam = basarili + askida + basarisiz
        const basariOrani = toplam > 0 ? Math.round((basarili / toplam) * 100) : 0

        representatives.push({
            id: i,
            temsilciId: `TMS-${1000 + i}`,
            temsilciAdi: `Temsilci ${i}`,
            toplamTalep: toplam,
            basarili,
            askida,
            basarisiz,
            basariOrani
        })
    }

    // Sort by success rate
    return representatives.sort((a, b) => b.basariOrani - a.basariOrani)
}

interface Representative {
    id: number
    temsilciId: string
    temsilciAdi: string
    toplamTalep: number
    basarili: number
    askida: number
    basarisiz: number
    basariOrani: number
}

export default function TemsilciPerformans() {
    const [representatives] = useState<Representative[]>(generateRepresentativeData())
    const [searchTerm, setSearchTerm] = useState('')

    const filteredReps = representatives.filter(rep =>
        rep.temsilciAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rep.temsilciId.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const topPerformers = representatives.slice(0, 5)
    const totalRequests = representatives.reduce((sum, rep) => sum + rep.toplamTalep, 0)
    const avgSuccessRate = Math.round(
        representatives.reduce((sum, rep) => sum + rep.basariOrani, 0) / representatives.length
    )

    const getSuccessRateBadge = (rate: number) => {
        if (rate >= 70) return { className: 'bg-green-500/10 text-green-500', icon: TrendingUp }
        if (rate >= 40) return { className: 'bg-yellow-500/10 text-yellow-500', icon: Target }
        return { className: 'bg-red-500/10 text-red-500', icon: TrendingDown }
    }

    return (
        <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 hover:border-primary/50 transition-all duration-300">
                    <CardHeader className="pb-3">
                        <CardDescription className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Toplam Temsilci
                        </CardDescription>
                        <CardTitle className="text-3xl">{representatives.length}</CardTitle>
                    </CardHeader>
                </Card>

                <Card className="border-2 hover:border-primary/50 transition-all duration-300">
                    <CardHeader className="pb-3">
                        <CardDescription className="flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Toplam Talep
                        </CardDescription>
                        <CardTitle className="text-3xl">{totalRequests}</CardTitle>
                    </CardHeader>
                </Card>

                <Card className="border-2 hover:border-primary/50 transition-all duration-300">
                    <CardHeader className="pb-3">
                        <CardDescription className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Ortalama Başarı
                        </CardDescription>
                        <CardTitle className="text-3xl">{avgSuccessRate}%</CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Top Performers */}
            <Card className="border-2 border-primary/20">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        <CardTitle>En Başarılı Temsilciler</CardTitle>
                    </div>
                    <CardDescription>
                        Başarı oranına göre ilk 5 temsilci
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {topPerformers.map((rep, index) => {
                            const badge = getSuccessRateBadge(rep.basariOrani)
                            const Icon = badge.icon
                            return (
                                <div
                                    key={rep.id}
                                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            flex items-center justify-center w-10 h-10 rounded-full font-bold
                                            ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' : ''}
                                            ${index === 1 ? 'bg-gray-400/20 text-gray-400' : ''}
                                            ${index === 2 ? 'bg-orange-500/20 text-orange-500' : ''}
                                            ${index > 2 ? 'bg-primary/10 text-primary' : ''}
                                        `}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{rep.temsilciAdi}</p>
                                            <p className="text-sm text-muted-foreground">{rep.temsilciId}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Toplam Talep</p>
                                            <p className="font-semibold">{rep.toplamTalep}</p>
                                        </div>
                                        <Badge className={badge.className}>
                                            <Icon className="w-3 h-3 mr-1" />
                                            %{rep.basariOrani}
                                        </Badge>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* All Representatives Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Tüm Temsilciler</CardTitle>
                    <CardDescription>
                        Temsilci performans detayları ve talep istatistikleri
                    </CardDescription>
                    <div className="relative max-w-sm mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Temsilci ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Sıra</TableHead>
                                    <TableHead>Temsilci</TableHead>
                                    <TableHead className="text-center">Toplam</TableHead>
                                    <TableHead className="text-center">Başarılı</TableHead>
                                    <TableHead className="text-center">Askıda</TableHead>
                                    <TableHead className="text-center">Başarısız</TableHead>
                                    <TableHead className="text-right">Başarı Oranı</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredReps.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                            Temsilci bulunamadı
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredReps.map((rep, index) => {
                                        const badge = getSuccessRateBadge(rep.basariOrani)
                                        const Icon = badge.icon
                                        return (
                                            <TableRow key={rep.id} className="hover:bg-muted/50">
                                                <TableCell className="font-medium">#{index + 1}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{rep.temsilciAdi}</p>
                                                        <p className="text-sm text-muted-foreground">{rep.temsilciId}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center font-semibold">{rep.toplamTalep}</TableCell>
                                                <TableCell className="text-center">
                                                    <Badge className="bg-green-500/10 text-green-500">
                                                        {rep.basarili}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge className="bg-yellow-500/10 text-yellow-500">
                                                        {rep.askida}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge className="bg-red-500/10 text-red-500">
                                                        {rep.basarisiz}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Badge className={badge.className}>
                                                        <Icon className="w-3 h-3 mr-1" />
                                                        {rep.basariOrani}%
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
