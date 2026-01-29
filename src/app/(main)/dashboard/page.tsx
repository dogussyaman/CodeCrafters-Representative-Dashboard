import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Ticket,
  BookOpen,
  UserCog,
  Building2,
  Bell,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  Bot,
  FileText,
  Filter,
  UserPlus,
  AlertTriangle,
  ImageIcon,
  Lightbulb,
  CircleHelp,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [
    { count: contactCount },
    { count: ticketCount },
    { count: trainingCount },
    { count: roleReqCount },
    { count: companyReqCount },
    { count: unreadNotifCount },
  ] = await Promise.all([
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "unread"),
    supabase.from("support_tickets").select("*", { count: "exact", head: true }).in("status", ["open", "in_progress"]),
    supabase.from("training_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("role_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("company_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("notifications").select("*", { count: "exact", head: true }).eq("recipient_id", user.id).is("read_at", null),
  ]);

  const stats = [
    { title: "Okunmamış İletişim", value: contactCount ?? 0, href: "/dashboard/iletisim-mesajlari", icon: MessageSquare },
    { title: "Açık Destek Biletleri", value: ticketCount ?? 0, href: "/dashboard/destek-biletleri", icon: Ticket },
    { title: "Bekleyen Eğitim Talepleri", value: trainingCount ?? 0, href: "/dashboard/egitim-talepleri", icon: BookOpen },
    { title: "Bekleyen Rol Talepleri", value: roleReqCount ?? 0, href: "/dashboard/rol-talepleri", icon: UserCog },
    { title: "Bekleyen Şirket Talepleri", value: companyReqCount ?? 0, href: "/dashboard/sirket-talepleri", icon: Building2 },
    { title: "Okunmamış Bildirimler", value: unreadNotifCount ?? 0, href: "/dashboard/bildirimler", icon: Bell },
  ];

  const ticketTypes = [
    { id: "login_error", label: "Giriş hatası", desc: "Giriş / şifre / hesap erişim sorunları", icon: AlertCircle },
    { id: "feedback", label: "Geri bildirim", desc: "Öneri, şikayet veya memnuniyet bildirimi", icon: MessageSquare },
    { id: "technical", label: "Teknik", desc: "Teknik hata, performans veya entegrasyon", icon: HelpCircle },
    { id: "other", label: "Diğer", desc: "Diğer tüm talepler", icon: FileText },
  ];

  const ticketStatuses = [
    { id: "open", label: "Açık", desc: "Henüz ele alınmadı", icon: Clock },
    { id: "in_progress", label: "İşlemde", desc: "MT tarafından işleniyor", icon: Clock },
    { id: "resolved", label: "Çözüldü", desc: "Çözüm uygulandı", icon: CheckCircle2 },
    { id: "closed", label: "Kapatıldı", desc: "Talep kapatıldı", icon: CheckCircle2 },
  ];

  const mtSteps = [
    { step: 1, title: "Biletleri listele", desc: "Destek Biletleri sayfasında tüm biletleri görüntüle, filtrele (durum, öncelik, tip).", href: "/dashboard/destek-biletleri" },
    { step: 2, title: "Detayı incele", desc: "Bilete tıklayarak konu, açıklama, ekler ve iletişim bilgilerini oku.", href: "/dashboard/destek-biletleri" },
    { step: 3, title: "Atama yap", desc: "Bileti kendine veya başka bir MT/admin'e ata (assigned_to).", href: "/dashboard/destek-biletleri" },
    { step: 4, title: "Durum güncelle", desc: "Açık → İşlemde → Çözüldü → Kapatıldı akışına uygun güncelle.", href: "/dashboard/destek-biletleri" },
    { step: 5, title: "Çözüm notu yaz", desc: "Çözüldü/kapatıldı biletlerde resolution_no veya açıklama ekle.", href: "/dashboard/destek-biletleri" },
  ];

  return (
    <div className="space-y-10">
      {/* Hero - MT Eğitim */}
      <section className="relative overflow-hidden rounded-2xl border bg-linear-to-br from-primary/10 via-background to-primary/5 p-6 md:p-8">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <GraduationCap className="h-5 w-5" />
            MT Eğitim Merkezi
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Destek Biletlerinde Ne Yapılır?
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            CodeCrafters destek sisteminde bilet tipleri, durumlar ve MT olarak sizin adımlarınızı aşağıda özetledik. Hızlı erişim için istatistik kartlarını kullanın.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild>
              <Link href="/dashboard/destek-biletleri" className="gap-2">
                <Ticket className="h-4 w-4" />
                Destek Biletleri
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/chatbot" className="gap-2">
                <Bot className="h-4 w-4" />
                Asistan ile Sor
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bilet tipleri */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Bilet Tipleri
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ticketTypes.map((t) => {
            const Icon = t.icon;
            return (
              <Card key={t.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-base">{t.label}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">{t.desc}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Bilet durumları */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Bilet Durumları
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ticketStatuses.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={s.id === "open" || s.id === "in_progress" ? "default" : "secondary"}>
                      {s.label}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">{s.desc}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Öncelikler */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Öncelik Seviyeleri
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Biletlere öncelik atayarak hangi taleplerin önce ele alınacağını belirleyebilirsiniz. Acil ve yüksek öncelikli biletlere önce bakın.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <Badge variant="outline" className="w-fit">Düşük</Badge>
              <CardDescription className="text-sm">Rutin talepler, genel sorular. Normal sırada işlenir.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Badge variant="secondary" className="w-fit">Orta</Badge>
              <CardDescription className="text-sm">Standart talepler. Makul sürede yanıt verin.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Badge variant="default" className="w-fit">Yüksek</Badge>
              <CardDescription className="text-sm">Önemli sorunlar. Öncelikli ele alın.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Badge variant="destructive" className="w-fit">Acil</Badge>
              <CardDescription className="text-sm">Kritik hatalar, giriş sorunları. Hemen müdahale edin.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Ekler (attachment_urls) */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Ekler ve Dosyalar
        </h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-3">
              Kullanıcılar bilet oluştururken ek (ekran görüntüsü, belge vb.) yükleyebilir. Bu dosyalar <strong>attachment_urls</strong> alanında tutulur.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Bilet detay sayfasında ekleri görüntüleyebilirsiniz.</li>
              <li>Ekler Supabase Storage &quot;support-tickets&quot; bucket&apos;ında saklanır.</li>
              <li>Çözüm üretirken ekleri mutlaka inceleyin; hata tespiti için faydalıdır.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* MT adımları */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          MT Olarak Yapmanız Gerekenler
        </h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {mtSteps.map((item) => (
            <Link key={item.step} href={item.href}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {item.step}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription className="text-sm">{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Hızlı erişim - İstatistikler */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Hızlı Erişim
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.href} className="transition-shadow hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <Button variant="link" className="h-auto p-0 mt-2" asChild>
                    <Link href={item.href} className="flex items-center gap-1">
                      Görüntüle <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Sık Sorulan Sorular */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CircleHelp className="h-5 w-5" />
          Sık Sorulan Sorular
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger>Bilet durumunu ne zaman &quot;İşlemde&quot; yapmalıyım?</AccordionTrigger>
            <AccordionContent>
              Bileti üstlendiğiniz anda durumu <strong>İşlemde</strong> yapın. Böylece diğer MT&apos;ler aynı bilete aynı anda bakmaz ve kullanıcıya tek bir kanal üzerinden yanıt verilir.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>Çözüm notu (resolution_no) nerede yazılır?</AccordionTrigger>
            <AccordionContent>
              Bilet detay sayfasında durumu <strong>Çözüldü</strong> veya <strong>Kapatıldı</strong> yaptığınızda çözüm notu alanını doldurun. Kısa ve net yazın; ne yapıldığı ve kullanıcıya nasıl bilgi verildiği anlaşılır olsun.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>Giriş hatası tipindeki biletlere nasıl yaklaşmalıyım?</AccordionTrigger>
            <AccordionContent>
              Giriş hatası biletlerinde önce kullanıcının e-posta ve hesap durumunu kontrol edin. Şifre sıfırlama, e-posta doğrulama veya hesap kilidi gibi durumları destek ekibi/ admin ile koordine ederek çözün. Mümkünse <strong>Acil</strong> öncelik verin.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4">
            <AccordionTrigger>Bilet ataması (assigned_to) zorunlu mu?</AccordionTrigger>
            <AccordionContent>
              Zorunlu değil ancak önerilir. Atama yaparak sorumluluğu netleştirir ve takip eden kişiyi bilet geçmişinde görebilirsiniz. Atanmamış biletler &quot;açık kuyruk&quot; gibi ele alınabilir; önce onlara bakabilirsiniz.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-5">
            <AccordionTrigger>İletişim mesajları ile destek biletleri farkı nedir?</AccordionTrigger>
            <AccordionContent>
              <strong>Destek biletleri</strong> kullanıcıların site üzerinden açtığı resmi taleplerdir (tip, öncelik, durum takibi vardır). <strong>İletişim mesajları</strong> genel iletişim formundan gelen mesajlardır; ayrı sayfada listelenir ve yanıtlanır.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* İpuçları */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          MT İpuçları
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary font-medium shrink-0">1.</span>
                Gün içinde önce <strong>Açık</strong> ve <strong>Acil / Yüksek</strong> öncelikli biletlere bakın.
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-medium shrink-0">2.</span>
                Bilet detayında kullanıcı e-postası ve açıklamayı okuyun; ekleri (varsa) inceleyin.
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-medium shrink-0">3.</span>
                Çözüm sonrası kullanıcıya e-posta veya bildirimle bilgi vermeyi unutmayın (CodeCrafters tarafında bildirim entegrasyonu varsa otomatik gidebilir).
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-medium shrink-0">4.</span>
                Teknik ve giriş hatası biletlerinde çözümü kısa ve anlaşılır şekilde <strong>resolution_no</strong> alanına yazın; raporlama ve denetim için faydalıdır.
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-medium shrink-0">5.</span>
                Takıldığınızda Asistan sayfasından &quot;Destek bileti tipleri&quot;, &quot;MT adımları&quot; gibi sorularla hızlı hatırlatma alabilirsiniz.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
