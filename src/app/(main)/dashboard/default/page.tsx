"use client";

import Link from "next/link";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, BarChart3, ShieldCheck, Bot, ChevronRight } from "lucide-react";
import { HowItWorksSection } from "./how-it-works";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";


export default function DefaultDashboardPage() {
  const themeMode = usePreferencesStore((state) => state.themeMode);
  const phrases = [
    "Kullanıcı dostu arayüz",
    "Tek ekranda tüm bilgiler",
    "Hazır cümlelerle hızlı iletişim",
    "Analitik görünürlük ve karar desteği",
    "Pazarlama etkisini artıran içerikler",
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-10 p-2 md:p-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-50 text-slate-900 shadow-xl ring-1 ring-slate-200/50">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <Image
            src={themeMode === "dark" ? "/headerdark.png" : "/digikoc_hero_light_1763568520718.png"}
            alt="Dashboard Banner"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 dark:bg-linear-to-b dark:from-black/70 dark:via-black/40 dark:to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 px-6 py-12 text-center md:px-12 md:py-16">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/50 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur-md shadow-sm dark:bg-white/50 dark:text-white">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
            v1.0 Yayında
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl dark:text-white">
            DİGİKOÇ <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:bg-linear-to-r dark:from-blue-400 dark:to-indigo-400">AKILLI ÇALIŞMA ASİSTANI</span>
          </h1>

          <div className="h-6 text-base font-medium text-slate-600 md:text-xl dark:text-white">
            <Typewriter
              words={phrases}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>

          <p className="max-w-2xl text-base text-slate-600 md:text-lg leading-relaxed font-medium dark:text-white">
            Satış Birimi, Müşteri Hizmetleri, İkame Hizmetleri ve diğer tüm birimlerin operasyonlarını tek bir merkezden yönetin.
            Hız, verimlilik ve yapay zeka desteği ile iş akışınızı güçlendirin.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="#units">
              <Button className="h-10 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-all hover:scale-105 dark:bg-slate-800 dark:hover:bg-slate-700">
                Birimleri Keşfet
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/chatbot">
              <Button variant="outline" className="h-10 rounded-full border-slate-300 bg-white/60 px-6 text-sm font-semibold text-slate-700 backdrop-blur-sm hover:bg-white hover:text-slate-900 transition-all hover:scale-105 dark:bg-white/60 dark:text-slate-700 dark:hover:bg-white dark:hover:text-slate-900">
                <Bot className="mr-2 h-4 w-4" />
                DigiBot Asistan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <HowItWorksSection />

      {/* Features Grid */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border rounded-2xl bg-white shadow-sm transition-all hover:shadow-md dark:bg-card">
          <CardHeader>
            <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-white text-red-600">
              <Zap className="h-6 w-6" />
            </div>
            <CardTitle>Hız ve Verimlilik</CardTitle>
            <CardDescription>Tek ekrandan tüm verilere erişim ile operasyonel hızınızı artırın.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border rounded-2xl bg-white shadow-sm transition-all hover:shadow-md dark:bg-card">
          <CardHeader>
            <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-white text-orange-600">
              <BarChart3 className="h-6 w-6" />
            </div>
            <CardTitle>Analitik Görüş</CardTitle>
            <CardDescription>Detaylı raporlar ve grafiklerle veriye dayalı kararlar alın.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border rounded-2xl bg-white shadow-sm transition-all hover:shadow-md dark:bg-card">
          <CardHeader>
            <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-white text-blue-700">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <CardTitle>Güvenli Altyapı</CardTitle>
            <CardDescription>Kurumsal güvenlik standartlarına uygun, güvenilir veri yönetimi.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border rounded-2xl bg-white shadow-sm transition-all hover:shadow-md dark:bg-card">
          <CardHeader>
            <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-white text-green-700">
              <Bot className="h-6 w-6" />
            </div>
            <CardTitle>AI Desteği</CardTitle>
            <CardDescription>Yapay zeka asistanı ile içerik üretimi ve müşteri yanıtları.</CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* Units Section */}
      <section id="units" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Birimler</h2>
          <p className="text-muted-foreground">Tüm operasyonel birimlere hızlı erişim</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Satış Birimi */}
          <Link href="/units/birim-a" className="group">
            <Card className="relative h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-red-600">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  SATIŞ BİRİMİ
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardTitle>
                <CardDescription>Satış Birimi operasyon yönetimi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Anasayfa, Hazır Cümleler, Güvence Paketleri ve daha fazlası...
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Müşteri Hizmetleri */}
          <Link href="/units/birim-b" className="group">
            <Card className="relative h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-orange-600">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  MÜŞTERİ HİZMETLERİ
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardTitle>
                <CardDescription>Müşteri Hizmetleri operasyon yönetimi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Operasyonel süreçler ve fiyat teklifi hazırlama modülleri.
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Operasyon Birimi */}
          <Link href="/units/birim-c" className="group">
            <Card className="relative h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  OPERASYON BİRİMİ
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardTitle>
                <CardDescription>Operasyon Birimi operasyon yönetimi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Genel ofis işlemleri ve raporlamalar.
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* İkame Hizmetleri */}
          <Link href="/units/birim-d" className="group">
            <Card className="relative h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  İKAME HİZMETLERİ
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardTitle>
                <CardDescription>İkame Hizmetleri operasyon yönetimi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Bölgeler, Müdürler ve İkame Araç Yönetimi.
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Kurumsal Satış */}
          <Link href="/units/birim-e" className="group">
            <Card className="relative h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-gray-600">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  KURUMSAL SATIŞ
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardTitle>
                <CardDescription>Kurumsal Satış operasyon yönetimi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Kurumsal müşteri yönetimi ve satış raporları.
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Filo Yönetimi */}
          <Link href="/units/birim-f" className="group">
            <Card className="relative h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-black">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  FİLO YÖNETİMİ
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardTitle>
                <CardDescription>Filo Yönetimi operasyon yönetimi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Filo takibi ve operasyonel analizler.
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Admin */}
          <Link href="/units/admin" className="group">
            <Card className="relative h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-green-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  ADMIN
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardTitle>
                <CardDescription>Sistem yönetimi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Kullanıcı yönetimi, ayarlar ve sistem izleme.
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
