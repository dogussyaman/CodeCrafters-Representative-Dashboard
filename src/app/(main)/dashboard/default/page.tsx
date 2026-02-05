"use client";

import Link from "next/link";
import { Ticket, Bot, BookOpen, MessageSquare, HelpCircle, ArrowRight, GraduationCap, UserCog, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DefaultDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 p-2 md:p-0">
      {/* Hero - CodeCraftX MT */}
      <section className="relative overflow-hidden rounded-2xl border bg-linear-to-br from-primary/10 via-background to-primary/5 p-6 md:p-10">
        <div className="relative z-10 space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium">
            <GraduationCap className="h-3.5 w-3.5" />
            CodeCraftX MT Dashboard
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Destek Biletleri ve Talepler
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Müşteri temsilcisi (MT) olarak destek biletlerini yönetin, iletişim mesajlarına bakın, eğitim / rol / şirket taleplerini işleyin. Panel sayfasında kısa eğitim ve hızlı erişim kartlarına ulaşabilirsiniz.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild>
              <Link href="/dashboard" className="gap-2">
                Panele Git
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/destek-biletleri" className="gap-2">
                <Ticket className="h-4 w-4" />
                Destek Biletleri
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/chatbot" className="gap-2">
                <Bot className="h-4 w-4" />
                Asistan
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ana ekranlar - CodeCraftX MT */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Ana Ekranlar</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-muted">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">Panel & Eğitim</CardTitle>
                </div>
                <CardDescription>
                  Destek biletleri eğitimi, bilet tipleri/durumlar ve hızlı erişim kartları.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/dashboard/destek-biletleri">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-muted">
                    <Ticket className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">Destek Biletleri</CardTitle>
                </div>
                <CardDescription>
                  Biletleri listele, filtrele, detay incele, atama yap, durum güncelle, çözüm notu yaz.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/dashboard/chatbot">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-muted">
                    <Bot className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">Asistan</CardTitle>
                </div>
                <CardDescription>
                  Destek biletleri ve süreçler hakkında soru sor, hızlı yanıt al.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/dashboard/iletisim-mesajlari">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-muted">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">İletişim Mesajları</CardTitle>
                </div>
                <CardDescription>
                  Gelen iletişim mesajlarını görüntüle ve yanıtla.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/dashboard/egitim-talepleri">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-muted">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">Eğitim Talepleri</CardTitle>
                </div>
                <CardDescription>
                  Eğitim taleplerini incele ve işle.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/dashboard/help">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-muted">
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">Yardım</CardTitle>
                </div>
                <CardDescription>
                  Sık sorulan sorular ve kullanım rehberleri.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>

      {/* Her talepte nasıl ilerlenir - Accordion + Badge */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Her Talepte Nasıl İlerlenir?</h2>
        <p className="text-sm text-muted-foreground">
          Aşağıda her talep türü için adım adım ilerleme rehberi ve ilgili durum/tipler badge ile gösterilmiştir.
        </p>
        <Card className="overflow-hidden border-muted/50 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="destek-biletleri" className="border-b border-l-4 border-l-primary px-4 first:rounded-t-lg">
              <AccordionTrigger className="hover:no-underline hover:bg-muted/40 py-5 px-0 rounded-lg">
                <div className="flex flex-1 items-center gap-4 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-foreground">Destek Biletleri</span>
                  <span className="ml-auto flex flex-wrap gap-1.5 justify-end">
                    <Badge variant="outline" className="text-xs font-normal">Giriş hatası</Badge>
                    <Badge variant="secondary" className="text-xs font-normal">Geri bildirim</Badge>
                    <Badge variant="secondary" className="text-xs font-normal">Teknik</Badge>
                    <Badge variant="outline" className="text-xs font-normal">Diğer</Badge>
                  </span>
                </div>
              </AccordionTrigger>
            <AccordionContent className="border-t border-muted/50 pt-4 pl-14">
              <div className="space-y-3 text-sm">
                <p className="font-medium">Bilet tipleri:</p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary">login_error</Badge>
                  <Badge variant="secondary">feedback</Badge>
                  <Badge variant="secondary">technical</Badge>
                  <Badge variant="secondary">other</Badge>
                </div>
                <p className="font-medium">Durum akışı:</p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge>Açık</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="secondary">İşlemde</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="outline">Çözüldü</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="outline">Kapatıldı</Badge>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Destek Biletleri sayfasında listeyi açın; durum / öncelik / tip ile filtreleyin.</li>
                  <li>Bilete tıklayıp detayı okuyun; ekleri (varsa) inceleyin.</li>
                  <li>Bileti kendinize veya başka MT&apos;ye atayın; durumu <Badge variant="secondary" className="text-xs">İşlemde</Badge> yapın.</li>
                  <li>Çözüm sonrası durumu <Badge variant="outline" className="text-xs">Çözüldü</Badge> veya <Badge variant="outline" className="text-xs">Kapatıldı</Badge> yapın; çözüm notu (resolution_no) yazın.</li>
                </ol>
                <Button variant="link" className="h-auto p-0 text-sm" asChild>
                  <Link href="/dashboard/destek-biletleri" className="gap-1">
                    Destek Biletleri sayfasına git <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="iletisim-mesajlari" className="border-b border-l-4 border-l-blue-500 px-4">
            <AccordionTrigger className="hover:no-underline hover:bg-muted/40 py-5 px-0 rounded-lg">
              <div className="flex flex-1 items-center gap-4 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="font-semibold text-foreground">İletişim Mesajları</span>
                <span className="ml-auto flex flex-wrap gap-1.5 justify-end">
                  <Badge variant="default" className="text-xs font-normal">Okunmamış</Badge>
                  <Badge variant="secondary" className="text-xs font-normal">Okundu</Badge>
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-muted/50 pt-4 pl-14">
              <div className="space-y-3 text-sm">
                <p className="font-medium">Mesaj durumları:</p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge>unread</Badge>
                  <Badge variant="secondary">read</Badge>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>İletişim Mesajları sayfasında gelen mesajları listeleyin.</li>
                  <li><Badge className="text-xs">Okunmamış</Badge> mesajlara önce bakın; konu ve içeriği okuyun.</li>
                  <li>Yanıt gerekiyorsa e-posta veya sistem üzerinden yanıtlayın.</li>
                  <li>İşlem bitince mesajı <Badge variant="secondary" className="text-xs">Okundu</Badge> olarak işaretleyin.</li>
                </ol>
                <Button variant="link" className="h-auto p-0 text-sm" asChild>
                  <Link href="/dashboard/iletisim-mesajlari" className="gap-1">
                    İletişim Mesajları sayfasına git <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="egitim-talepleri" className="border-b border-l-4 border-l-amber-500 px-4">
            <AccordionTrigger className="hover:no-underline hover:bg-muted/40 py-5 px-0 rounded-lg">
              <div className="flex flex-1 items-center gap-4 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="font-semibold text-foreground">Eğitim Talepleri</span>
                <span className="ml-auto flex flex-wrap gap-1.5 justify-end">
                  <Badge variant="default" className="text-xs font-normal">Beklemede</Badge>
                  <Badge variant="secondary" className="text-xs font-normal">Onaylandı</Badge>
                  <Badge variant="outline" className="text-xs font-normal">Reddedildi</Badge>
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-muted/50 pt-4 pl-14">
              <div className="space-y-3 text-sm">
                <p className="font-medium">Talep durumları:</p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge>pending</Badge>
                  <Badge variant="secondary">approved</Badge>
                  <Badge variant="outline">rejected</Badge>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Eğitim Talepleri sayfasında <Badge className="text-xs">Beklemede</Badge> talepleri listeleyin.</li>
                  <li>Talep detayını inceleyin (kim, hangi eğitim, gerekçe).</li>
                  <li>Uygunsa talebi <Badge variant="secondary" className="text-xs">Onaylandı</Badge> yapın; gerekirse eğitim tarihi / not ekleyin.</li>
                  <li>Uygun değilse <Badge variant="outline" className="text-xs">Reddedildi</Badge> yapıp gerekçe belirtin.</li>
                </ol>
                <Button variant="link" className="h-auto p-0 text-sm" asChild>
                  <Link href="/dashboard/egitim-talepleri" className="gap-1">
                    Eğitim Talepleri sayfasına git <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rol-talepleri" className="border-b border-l-4 border-l-violet-500 px-4">
            <AccordionTrigger className="hover:no-underline hover:bg-muted/40 py-5 px-0 rounded-lg">
              <div className="flex flex-1 items-center gap-4 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <UserCog className="h-5 w-5" />
                </div>
                <span className="font-semibold text-foreground">Rol Talepleri</span>
                <span className="ml-auto flex flex-wrap gap-1.5 justify-end">
                  <Badge variant="default" className="text-xs font-normal">Beklemede</Badge>
                  <Badge variant="secondary" className="text-xs font-normal">Onaylandı</Badge>
                  <Badge variant="outline" className="text-xs font-normal">Reddedildi</Badge>
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-muted/50 pt-4 pl-14">
              <div className="space-y-3 text-sm">
                <p className="font-medium">Talep durumları:</p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge>pending</Badge>
                  <Badge variant="secondary">approved</Badge>
                  <Badge variant="outline">rejected</Badge>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Rol Talepleri sayfasında <Badge className="text-xs">Beklemede</Badge> talepleri açın.</li>
                  <li>Kullanıcı bilgisi ve talep edilen rolü (mt, admin vb.) kontrol edin.</li>
                  <li>Yetkili iseniz talebi <Badge variant="secondary" className="text-xs">Onaylandı</Badge> veya <Badge variant="outline" className="text-xs">Reddedildi</Badge> yapın.</li>
                  <li>Onay sonrası kullanıcıya bildirim / e-posta ile bilgi verin (sistem entegrasyonu varsa otomatik olabilir).</li>
                </ol>
                <Button variant="link" className="h-auto p-0 text-sm" asChild>
                  <Link href="/dashboard/rol-talepleri" className="gap-1">
                    Rol Talepleri sayfasına git <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sirket-talepleri" className="border-l-4 border-l-slate-600 px-4 last:border-b-0">
            <AccordionTrigger className="hover:no-underline hover:bg-muted/40 py-5 px-0 rounded-lg">
              <div className="flex flex-1 items-center gap-4 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-600/10 text-slate-600 dark:text-slate-400">
                  <Building2 className="h-5 w-5" />
                </div>
                <span className="font-semibold text-foreground">Şirket Talepleri</span>
                <span className="ml-auto flex flex-wrap gap-1.5 justify-end">
                  <Badge variant="default" className="text-xs font-normal">Beklemede</Badge>
                  <Badge variant="secondary" className="text-xs font-normal">Onaylandı</Badge>
                  <Badge variant="outline" className="text-xs font-normal">Reddedildi</Badge>
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-muted/50 pt-4 pl-14">
              <div className="space-y-3 text-sm">
                <p className="font-medium">Talep durumları:</p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge>pending</Badge>
                  <Badge variant="secondary">approved</Badge>
                  <Badge variant="outline">rejected</Badge>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Şirket Talepleri sayfasında <Badge className="text-xs">Beklemede</Badge> talepleri inceleyin.</li>
                  <li>Şirket adı, iletişim bilgileri ve talep detayını okuyun.</li>
                  <li>Uygunsa talebi <Badge variant="secondary" className="text-xs">Onaylandı</Badge> yapın; şirket kaydı oluşturma / yetkilendirme adımlarını tamamlayın.</li>
                  <li>Uygun değilse <Badge variant="outline" className="text-xs">Reddedildi</Badge> yapıp gerekçe ekleyin.</li>
                </ol>
                <Button variant="link" className="h-auto p-0 text-sm" asChild>
                  <Link href="/dashboard/sirket-talepleri" className="gap-1">
                    Şirket Talepleri sayfasına git <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </Card>
      </section>
    </div>
  );
}
