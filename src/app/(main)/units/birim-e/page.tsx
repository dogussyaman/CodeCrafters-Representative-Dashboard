'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LayoutDashboard, Users, TrendingUp } from 'lucide-react'
import TalepDurumPaneli from './components/talep-durum-paneli'
import TemsilciPerformans from './components/temsilci-performans'
import BasariGrafikleri from './components/basari-grafikleri'

export default function KurumsalSatisBoPage() {
    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Kurumsal Satış Yönetimi
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Temsilcilerden gelen kurumsal talepleri yönetin ve performansı takip edin
                    </p>
                </div>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="talepler" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3 h-12">
                    <TabsTrigger value="talepler" className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        <span className="hidden sm:inline">Talepler</span>
                    </TabsTrigger>
                    <TabsTrigger value="temsilciler" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="hidden sm:inline">Temsilciler</span>
                    </TabsTrigger>
                    <TabsTrigger value="performans" className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span className="hidden sm:inline">Performans</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="talepler" className="mt-6">
                    <TalepDurumPaneli />
                </TabsContent>

                <TabsContent value="temsilciler" className="mt-6">
                    <TemsilciPerformans />
                </TabsContent>

                <TabsContent value="performans" className="mt-6">
                    <BasariGrafikleri />
                </TabsContent>
            </Tabs>
        </div>
    )
}
