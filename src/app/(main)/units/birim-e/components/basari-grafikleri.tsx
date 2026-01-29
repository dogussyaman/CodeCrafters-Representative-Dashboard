'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    BarChart3,
    TrendingUp,
    Award,
    Target
} from 'lucide-react'

// Generate mock data for charts
const generateChartData = () => {
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
            basariOrani
        })
    }

    return representatives.sort((a, b) => b.toplamTalep - a.toplamTalep)
}

export default function BasariGrafikleri() {
    const [representatives] = useState(generateChartData())

    // Top 10 by request count
    const topByRequests = representatives.slice(0, 10)

    // Top 10 by success rate (with at least 3 requests)
    const topBySuccessRate = representatives
        .filter(rep => rep.toplamTalep >= 3)
        .sort((a, b) => b.basariOrani - a.basariOrani)
        .slice(0, 10)

    const maxRequests = Math.max(...topByRequests.map(r => r.toplamTalep))
    const maxSuccessRate = 100

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-primary/20">
                    <CardHeader className="pb-3">
                        <CardDescription className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            En Yüksek Talep
                        </CardDescription>
                        <CardTitle className="text-2xl">{topByRequests[0]?.toplamTalep || 0}</CardTitle>
                        <p className="text-sm text-muted-foreground">{topByRequests[0]?.temsilciAdi}</p>
                    </CardHeader>
                </Card>

                <Card className="border-2 border-green-500/20">
                    <CardHeader className="pb-3">
                        <CardDescription className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            En Yüksek Başarı
                        </CardDescription>
                        <CardTitle className="text-2xl text-green-500">
                            {topBySuccessRate[0]?.basariOrani || 0}%
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{topBySuccessRate[0]?.temsilciAdi}</p>
                    </CardHeader>
                </Card>

                <Card className="border-2 border-yellow-500/20">
                    <CardHeader className="pb-3">
                        <CardDescription className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-yellow-500" />
                            Ortalama Talep/Temsilci
                        </CardDescription>
                        <CardTitle className="text-2xl text-yellow-500">
                            {Math.round(representatives.reduce((sum, r) => sum + r.toplamTalep, 0) / representatives.length)}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Request Count Chart */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        <CardTitle>En Fazla Talep Gönderen Temsilciler</CardTitle>
                    </div>
                    <CardDescription>
                        Toplam talep sayısına göre ilk 10 temsilci
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {topByRequests.map((rep, index) => {
                            const percentage = (rep.toplamTalep / maxRequests) * 100
                            return (
                                <div key={rep.id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`
                                                flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                                                ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' : ''}
                                                ${index === 1 ? 'bg-gray-400/20 text-gray-400' : ''}
                                                ${index === 2 ? 'bg-orange-500/20 text-orange-500' : ''}
                                                ${index > 2 ? 'bg-primary/10 text-primary' : ''}
                                            `}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{rep.temsilciAdi}</p>
                                                <p className="text-xs text-muted-foreground">{rep.temsilciId}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary" className="font-semibold">
                                                {rep.toplamTalep} talep
                                            </Badge>
                                            <Badge className="bg-green-500/10 text-green-500">
                                                %{rep.basariOrani}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Success Rate Chart */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <CardTitle>En Yüksek Başarı Oranına Sahip Temsilciler</CardTitle>
                    </div>
                    <CardDescription>
                        Başarı oranına göre ilk 10 temsilci (minimum 3 talep)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {topBySuccessRate.map((rep, index) => {
                            const percentage = rep.basariOrani
                            const getColor = (rate: number) => {
                                if (rate >= 80) return 'from-green-500 to-green-600'
                                if (rate >= 60) return 'from-blue-500 to-blue-600'
                                if (rate >= 40) return 'from-yellow-500 to-yellow-600'
                                return 'from-orange-500 to-orange-600'
                            }

                            return (
                                <div key={rep.id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`
                                                flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                                                ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' : ''}
                                                ${index === 1 ? 'bg-gray-400/20 text-gray-400' : ''}
                                                ${index === 2 ? 'bg-orange-500/20 text-orange-500' : ''}
                                                ${index > 2 ? 'bg-primary/10 text-primary' : ''}
                                            `}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{rep.temsilciAdi}</p>
                                                <p className="text-xs text-muted-foreground">{rep.temsilciId}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className="text-xs">
                                                {rep.toplamTalep} talep
                                            </Badge>
                                            <Badge className="bg-green-500/10 text-green-500 font-bold">
                                                <Target className="w-3 h-3 mr-1" />
                                                %{rep.basariOrani}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getColor(percentage)} rounded-full transition-all duration-500`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Combined Performance Chart */}
            <Card className="border-2 border-primary/20">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        <CardTitle>Genel Performans Karşılaştırması</CardTitle>
                    </div>
                    <CardDescription>
                        Talep sayısı ve başarı oranı dengesi en iyi temsilciler
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {representatives
                            .filter(rep => rep.toplamTalep >= 5)
                            .sort((a, b) => {
                                const scoreA = a.toplamTalep * (a.basariOrani / 100)
                                const scoreB = b.toplamTalep * (b.basariOrani / 100)
                                return scoreB - scoreA
                            })
                            .slice(0, 10)
                            .map((rep, index) => {
                                const performanceScore = Math.round(rep.toplamTalep * (rep.basariOrani / 100))
                                const maxScore = Math.max(...representatives.map(r => r.toplamTalep * (r.basariOrani / 100)))
                                const percentage = (performanceScore / maxScore) * 100

                                return (
                                    <div key={rep.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`
                                                    flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                                                    ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' : ''}
                                                    ${index === 1 ? 'bg-gray-400/20 text-gray-400' : ''}
                                                    ${index === 2 ? 'bg-orange-500/20 text-orange-500' : ''}
                                                    ${index > 2 ? 'bg-primary/10 text-primary' : ''}
                                                `}>
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{rep.temsilciAdi}</p>
                                                    <p className="text-xs text-muted-foreground">{rep.temsilciId}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="text-xs">
                                                    {rep.toplamTalep} talep
                                                </Badge>
                                                <Badge className="bg-green-500/10 text-green-500 text-xs">
                                                    %{rep.basariOrani}
                                                </Badge>
                                                <Badge className="bg-primary/10 text-primary font-bold">
                                                    Skor: {performanceScore}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
