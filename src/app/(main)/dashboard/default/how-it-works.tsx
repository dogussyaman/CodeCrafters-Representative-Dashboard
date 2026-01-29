"use client";

import Link from "next/link";
import { BookOpen, HelpCircle, LifeBuoy, Search, MessageSquare, Pencil, Bot, FileText, LayoutDashboard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FeatureCardProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  items?: string[];
};

function FeatureCard({ title, description, href, icon, items }: FeatureCardProps) {
  return (
    <Link href={href} className="group">
      <Card className="h-full border rounded-2xl shadow-sm transition-all hover:shadow-md hover:border-muted">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background text-muted-foreground">
                {icon}
              </div>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </div>
          </div>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>
        {items?.length ? (
          <CardContent>
            <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
              {items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </CardContent>
        ) : null}
      </Card>
    </Link>
  );
}

export function HowItWorksSection() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold tracking-tight">Nasıl Çalışır?</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Tüm birimler tek bir kurumsal arayüzde toplanır. Bilgiye erişim, işlem yapma ve destek alma
          akışları sade ve tutarlı bir yapıda ilerler.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background text-muted-foreground">
              <LayoutDashboard className="size-5" />
            </div>
            <CardTitle className="text-lg font-semibold">Birim Mantığı</CardTitle>
          </div>
          <CardDescription className="mt-2">
            Her birim, benzer bilgi mimarisiyle yönetilir. Aşağıdaki başlıklar çoğu birimde bulunur ve
            operasyonları standart hale getirir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Genel</div>
              <div className="text-sm text-muted-foreground">Birime ait özet bilgiler ve hızlı geçişler.</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Ayarlar</div>
              <div className="text-sm text-muted-foreground">Tercihler, sınırlar ve yapılandırmalar.</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Hazır Cümleler</div>
              <div className="text-sm text-muted-foreground">Standart iletişim şablonları ve metinler.</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Operasyon</div>
              <div className="text-sm text-muted-foreground">Günlük iş akışları ve işlem ekranları.</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Raporlar</div>
              <div className="text-sm text-muted-foreground">Performans ve görünürlük metrikleri.</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Başlıca Ekranlar</h3>
        <p className="text-sm text-muted-foreground">Bilgiye erişebileceğiniz ve işlem yapabileceğiniz temel sayfalar.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="Eğitim"
          description="Birim bazlı dersler ve içeriklerle yetkinlik geliştirme."
          href="/dashboard/education"
          icon={<BookOpen className="size-5" />}
          items={["Ders kartları ve içerik akışı", "Eğitim birimi sekmeleri", "Pratik rehberler"]}
        />
        <FeatureCard
          title="Yardım"
          description="Nasıl yapılır rehberleri ve süreç açıklamaları."
          href="/dashboard/help"
          icon={<HelpCircle className="size-5" />}
          items={["Sık sorulan sorular", "İş adımı rehberleri", "Politika ve prosedürler"]}
        />
        <FeatureCard
          title="Destek"
          description="Destek talepleri ve bildirim takibi."
          href="/units/admin/ticket-sistemi"
          icon={<LifeBuoy className="size-5" />}
          items={["Talep oluşturma ve izleme", "Durum güncellemeleri", "İlgili birime yönlendirme"]}
        />
        <FeatureCard
          title="Genel Arama"
          description="Sayfa, şablon ve içerik araması tek noktada."
          href="/dashboard/search"
          icon={<Search className="size-5" />}
          items={["Birimler arası arama", "Şablon ve metin bulma", "İlgili ekrana hızlı geçiş"]}
        />
        <FeatureCard
          title="Geri Bildirim"
          description="Operasyon ve ürün geliştirmeye yönelik geri bildirim."
          href="/dashboard/feedback"
          icon={<MessageSquare className="size-5" />}
          items={["Geliştirme önerileri", "Hata raporları", "Önceliklendirme"]}
        />
        <FeatureCard
          title="Editör"
          description="Şablonlarla içerik üretimi ve düzenleme."
          href="/dashboard/editor"
          icon={<Pencil className="size-5" />}
          items={["Şablon yükleme", "Metin düzenleme", "İçerik kaydetme"]}
        />
        <FeatureCard
          title="Chatbot"
          description="DigiBot ile akıllı yardım ve hızlı yanıtlar."
          href="/dashboard/chatbot"
          icon={<Bot className="size-5" />}
          items={["Hazır cevaplar", "Süreç yönlendirme", "Operasyonel ipuçları"]}
        />
        <FeatureCard
          title="Şablonlar"
          description="Birimlere göre hazır metin ve içerik setleri."
          href="/dashboard/templates"
          icon={<FileText className="size-5" />}
          items={["Birim seçimi", "Şablon önizleme", "Kullanım ipuçları"]}
        />
      </div>
    </section>
  );
}
