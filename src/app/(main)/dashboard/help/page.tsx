"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HelpCircle,
  Mail,
  MessageSquare,
  BookOpen,
  Shield,
  Phone,
  ExternalLink,
  Keyboard,
  Video,
  FileText,
  Lightbulb,
  Search,
  Settings,
  Users,
  Lock
} from "lucide-react";

export default function HelpPage() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <HelpCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Yardım ve Destek</h1>
            <p className="text-muted-foreground mt-2">Sık sorulan sorular, kullanım rehberleri ve destek kanalları.</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/dashboard/feedback">Geri Bildirim Gönder</Link>
        </Button>
      </div>

      {/* Quick Start Guide */}
      <Card id="baslangic">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle>Hızlı Başlangıç Rehberi</CardTitle>
          </div>
          <CardDescription>DİGİKOÇ'u kullanmaya başlama adımları</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">1</span>
                Giriş Yapın
              </h4>
              <p className="text-sm text-muted-foreground">
                Kullanıcı bilgilerinizle sisteme giriş yapın. İlk girişte profil bilgilerinizi kontrol edin.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">2</span>
                Biriminizi Seçin
              </h4>
              <p className="text-sm text-muted-foreground">
                Ana sayfadan çalıştığınız birime (Satış Birimi, Müşteri Hizmetleri, Operasyon Birimi, vb.) tıklayarak giriş yapın.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">3</span>
                Özellikleri Keşfedin
              </h4>
              <p className="text-sm text-muted-foreground">
                Hazır cümleler, şablonlar, editör ve DigiBot gibi özellikleri kullanmaya başlayın.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">4</span>
                Verimli Çalışın
              </h4>
              <p className="text-sm text-muted-foreground">
                Klavye kısayollarını öğrenin ve iş akışınızı hızlandırın.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expanded FAQ */}
      <Card id="sss">
        <CardHeader>
          <CardTitle>Sık Sorulan Sorular (SSS)</CardTitle>
          <CardDescription>Sistemi kullanırken aklınıza gelebilecek sorular ve cevapları.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {/* General */}
            <AccordionItem value="item-1">
              <AccordionTrigger>Genel arama nasıl çalışır?</AccordionTrigger>
              <AccordionContent>
                Üst menüdeki arama alanına yazdığınız kelimeler birim ve içerik tiplerine göre filtrelenir.
                Sonuçlarda birim rozetleri görünür. Arama, sayfa başlıkları, içerikler ve etiketler içinde gerçekleştirilir.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Hazır cümle ve şablonlar nereden yönetilir?</AccordionTrigger>
              <AccordionContent>
                Şablonlar bölümünde kaydedebilir, düzenleyebilir ve kopyalayabilirsiniz. Hazır cümleler her birim sayfasında ilgili
                bölümde bulunur. Editör'den yeni şablon oluşturabilir ve birim seçerek kaydedebilirsiniz.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Şablon nasıl oluşturulur?</AccordionTrigger>
              <AccordionContent>
                Editör sayfasına gidin, içeriğinizi yazın veya formatlamayı yapın. Sağ üst köşedeki "Şablon Olarak Kaydet" butonuna
                tıklayın, şablona bir isim verin ve ilgili birimi seçin. Şablonunuz artık "Şablonlar" sayfasında görünecektir.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Güvence paketleri bilgisi nasıl görüntülenir?</AccordionTrigger>
              <AccordionContent>
                İlgili birimde "Güvence Paketleri" menüsüne tıklayın. Burada tüm paket detaylarını,
                fiyatları ve kapsamları görebilirsiniz. Paket bilgilerini kopyalayabilir veya müşterilerinizle paylaşabilirsiniz.
              </AccordionContent>
            </AccordionItem>

            {/* DigiBot */}
            <AccordionItem value="item-5">
              <AccordionTrigger>DigiBot nasıl kullanılır?</AccordionTrigger>
              <AccordionContent>
                Üst menüden "DigiBot" butonuna tıklayarak asistanı açabilirsiniz. DigiBot ile müşteri sorularına cevap hazırlayabilir,
                içerik üretebilir ve hızlı bilgi alabilirsiniz. Sorunuzu yazın ve yapay zeka size yardımcı olacaktır.
              </AccordionContent>
            </AccordionItem>

            {/* Birimler */}
            <AccordionItem value="item-6">
              <AccordionTrigger>Farklı birimlere nasıl geçiş yapılır?
                <Badge variant="outline">Yeni</Badge>
              </AccordionTrigger>
              <AccordionContent>
                Sol menüdeki "Birimler" bölümünden istediğiniz birime tıklayarak geçiş yapabilirsiniz. Her birimin kendine
                özgü hazır cümleleri, kampanyaları ve özellikleri bulunmaktadır.
              </AccordionContent>
            </AccordionItem>

            {/* Bildirimler */}
            <AccordionItem value="item-7">
              <AccordionTrigger>Bildirimleri nereden kontrol edebilirim?</AccordionTrigger>
              <AccordionContent>
                Sağ üst köşedeki çan simgesine tıklayarak bildirimlerinizi görebilirsiniz. Yeni günceller, kampanyalar
                ve önemli duyurular burada listelenr. Tüm bildirimleri görüntülemek için "Bildirimler" sayfasına gidebilirsiniz.
              </AccordionContent>
            </AccordionItem>

            {/* Kampanyalar */}
            <AccordionItem value="item-8">
              <AccordionTrigger>Kampanya bilgilerine nasıl ulaşırım?</AccordionTrigger>
              <AccordionContent>
                Her birim sayfasında "Kampanyalar" bölümü bulunur. Güncel kampanyaları, indirim oranlarını ve detayları
                bu sayfalardan görüntüleyebilirsiniz. Kampanya detaylarını kopyalayarak müşterilerinize iletebilirsiniz.
              </AccordionContent>
            </AccordionItem>

            {/* Profil */}
            <AccordionItem value="item-9">
              <AccordionTrigger>Profil bilgilerimi nasıl güncellerim?</AccordionTrigger>
              <AccordionContent>
                Sağ üst köşedeki profil simgesine tıklayın ve "Profil" seçeneğini seçin. Burada kişisel bilgilerinizi,
                şifrenizi ve tercihlerinizi güncelleyebilirsiniz.
              </AccordionContent>
            </AccordionItem>

            {/* Tema */}
            <AccordionItem value="item-10">
              <AccordionTrigger>Karanlık/Aydınlık mod nasıl değiştirilir?</AccordionTrigger>
              <AccordionContent>
                Sağ üst köşedeki güneş/ay simgesine tıklayarak tema modunu değiştirebilirsiniz. Tercihiniz otomatik
                olarak kaydedilir ve bir sonraki girişinizde aynı tema ile karşılanırsınız.
              </AccordionContent>
            </AccordionItem>

            {/* Editör */}
            <AccordionItem value="item-11">
              <AccordionTrigger>Editör'de hangi formatlama seçenekleri var?</AccordionTrigger>
              <AccordionContent>
                Editör'de metin formatlama (kalın, italik, altı çizili), başlıklar, listeler, bağlantılar ve daha fazlası
                bulunur. Araç çubuğundaki butonları kullanarak içeriğinizi zenginleştirebilirsiniz.
              </AccordionContent>
            </AccordionItem>

            {/* Performans */}
            <AccordionItem value="item-12">
              <AccordionTrigger>Sistem yavaş çalışıyorsa ne yapmalıyım?</AccordionTrigger>
              <AccordionContent>
                Tarayıcınızın önbelleğini temizleyin, farklı bir tarayıcı deneyin veya internet bağlantınızı kontrol edin.
                Sorun devam ederse destek ekibiyle iletişime geçin.
              </AccordionContent>
            </AccordionItem>

            {/* Oturum */}
            <AccordionItem value="item-13">
              <AccordionTrigger>Oturum süresi ne kadar?</AccordionTrigger>
              <AccordionContent>
                Güvenlik nedeniyle oturumunuz belirli bir süre hareketsiz kaldığında sonlanır. Tekrar giriş yapmanız
                gerekecektir. Aktif çalışırken oturumunuz otomatik olarak yenilenir.
              </AccordionContent>
            </AccordionItem >

            {/* Veri */}
            < AccordionItem value="item-14" >
              <AccordionTrigger>Verilerim güvende mi?</AccordionTrigger>
              <AccordionContent>
                Evet, tüm verileriniz şifrelenmiş şekilde saklanır ve kurumsal güvenlik standartlarına uygun olarak
                korunur. Yetkilendirme sistemi sayesinde sadece yetkili kullanıcılar verilere erişebilir.
              </AccordionContent>
            </AccordionItem >

            {/* Destek */}
            < AccordionItem value="item-15" >
              <AccordionTrigger>Bir sorun yaşadığımda kime ulaşmalıyım?</AccordionTrigger>
              <AccordionContent>
                E-posta (support@digikoc.com), çağrı merkezi (0 850 000 00 00) veya DigiBot asistanı üzerinden
                destek alabilirsiniz. Geri bildirim formu üzerinden de talepte bulunabilirsiniz.
              </AccordionContent>
            </AccordionItem >
          </Accordion >
        </CardContent >
      </Card >

      {/* Step-by-Step Guides */}
      < Card id="kilavuzlar" >
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle>Adım Adım Kılavuzlar</CardTitle>
          </div>
          <CardDescription>Yaygın görevler için detaylı rehberler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4 space-y-3">
              <h4 className="font-semibold">Şablon Oluşturma</h4>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Üst menüden "Editör" butonuna tıklayın</li>
                <li>İçeriğinizi yazın ve formatlamayı yapın</li>
                <li>"Şablon Olarak Kaydet" butonuna tıklayın</li>
                <li>Şablona bir isim verin</li>
                <li>İlgili birimi seçin</li>
                <li>"Kaydet" butonuna tıklayın</li>
              </ol>
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <h4 className="font-semibold">Hazır Cümle Kullanma</h4>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>İlgili birim sayfasına gidin</li>
                <li>"Hazır Cümleler" menüsüne tıklayın</li>
                <li>Arama kutusunu kullanarak cümleyi bulun</li>
                <li>Cümle kartındaki "Kopyala" butonuna tıklayın</li>
                <li>İstediğiniz yere yapıştırın</li>
              </ol>
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <h4 className="font-semibold">Kampanya Bilgisi Paylaşma</h4>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>İlgili birime gidin</li>
                <li>"Kampanyalar" sayfasına tıklayın</li>
                <li>İlgili kampanya kartını bulun</li>
                <li>Kampanya detaylarını okuyun</li>
                <li>"Kopyala" veya "Paylaş" butonunu kullanın</li>
              </ol>
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <h4 className="font-semibold">DigiBot ile İçerik Üretme</h4>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Üst menüden "DigiBot" butonuna tıklayın</li>
                <li>Mesaj kutusuna isteğinizi yazın</li>
                <li>"Gönder" butonuna tıklayın veya Enter'a basın</li>
                <li>Yanıtı bekleyin</li>
                <li>Oluşturulan içeriği kopyalayın</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card >

      {/* Keyboard Shortcuts */}
      < Card id="klavye-kisayollari" >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Keyboard className="h-5 w-5 text-primary" />
            <CardTitle>Klavye Kısayolları</CardTitle>
          </div>
          <CardDescription>İş akışınızı hızlandırmak için kısayollar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Badge variant="outline">Genel</Badge>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Arama</span>
                  <Badge variant="secondary" className="font-mono">Ctrl + K</Badge>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Sidebar Aç/Kapat</span>
                  <Badge variant="secondary" className="font-mono">Ctrl + B</Badge>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Ayarlar</span>
                  <Badge variant="secondary" className="font-mono">Ctrl + ,</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Badge variant="outline">Editör</Badge>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Kalın Yazı</span>
                  <Badge variant="secondary" className="font-mono">Ctrl + B</Badge>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">İtalik</span>
                  <Badge variant="secondary" className="font-mono">Ctrl + I</Badge>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground">Kaydet</span>
                  <Badge variant="secondary" className="font-mono">Ctrl + S</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card >

      {/* Troubleshooting */}
      < Card id="sorun-giderme" >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <CardTitle>Sorun Giderme</CardTitle>
          </div>
          <CardDescription>Yaygın sorunlar ve çözümleri</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold mb-2">Sayfa yüklenmiyor</h4>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Çözüm:</strong> Sayfayı yenileyin (F5), tarayıcı önbelleğini temizleyin veya gizli mod kullanın.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h4 className="font-semibold mb-2">Giriş yapamıyorum</h4>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Çözüm:</strong> Kullanıcı adı ve şifrenizi kontrol edin. Şifrenizi unuttuysanız "Şifremi Unuttum"
              linkini kullanın. Sorun devam ederse sistem yöneticinize başvurun.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h4 className="font-semibold mb-2">Şablonlar görünmüyor</h4>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Çözüm:</strong> Doğru birim sekmesinde olduğunuzdan emin olun. Arama filtresini temizleyin.
              Henüz şablon oluşturmadıysanız Editör'den yeni şablon ekleyin.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h4 className="font-semibold mb-2">DigiBot yanıt vermiyor</h4>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Çözüm:</strong> İnternet bağlantınızı kontrol edin. Sayfayı yenileyin. Çok uzun sorular yerine
              kısa ve net sorular sorun.
            </p>
          </div>
        </CardContent>
      </Card >

      {/* System Requirements */}
      < Card id="sistem-gereksinimleri" >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Sistem Gereksinimleri</CardTitle>
          </div>
          <CardDescription>Optimal performans için öneriler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Desteklenen Tarayıcılar</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Google Chrome (son 2 versiyon)</li>
                <li>Mozilla Firefox (son 2 versiyon)</li>
                <li>Microsoft Edge (son 2 versiyon)</li>
                <li>Safari (son 2 versiyon)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Önerilen Ayarlar</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Ekran Çözünürlüğü: 1366x768 ve üzeri</li>
                <li>İnternet Hızı: En az 5 Mbps</li>
                <li>JavaScript: Etkin</li>
                <li>Çerezler: İzin verilmeli</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card >

      {/* Video Tutorials */}
      < Card id="video-egitimler" >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            <CardTitle>Video Eğitimler</CardTitle>
          </div>
          <CardDescription>Görsel rehberler ile öğrenin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4 text-center space-y-2">
              <div className="w-full aspect-video bg-muted rounded-md flex items-center justify-center">
                <Video className="h-12 w-12 text-muted-foreground" />
              </div>
              <h4 className="font-semibold text-sm">Başlangıç Eğitimi</h4>
              <p className="text-xs text-muted-foreground">Sisteme giriş ve temel özellikler</p>
              <Badge variant="outline" className="text-xs">Yakında</Badge>
            </div>

            <div className="rounded-lg border p-4 text-center space-y-2">
              <div className="w-full aspect-video bg-muted rounded-md flex items-center justify-center">
                <Video className="h-12 w-12 text-muted-foreground" />
              </div>
              <h4 className="font-semibold text-sm">İleri Seviye</h4>
              <p className="text-xs text-muted-foreground">Editör ve şablon yönetimi</p>
              <Badge variant="outline" className="text-xs">Yakında</Badge>
            </div>

            <div className="rounded-lg border p-4 text-center space-y-2">
              <div className="w-full aspect-video bg-muted rounded-md flex items-center justify-center">
                <Video className="h-12 w-12 text-muted-foreground" />
              </div>
              <h4 className="font-semibold text-sm">DigiBot Kullanımı</h4>
              <p className="text-xs text-muted-foreground">AI asistan ile verimli çalışma</p>
              <Badge variant="outline" className="text-xs">Yakında</Badge>
            </div>
          </div>
        </CardContent>
      </Card >

      {/* Contact Channels - Enhanced */}
      < div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <CardTitle>E-posta Destek</CardTitle>
            </div>
            <CardDescription>Resmi talepler ve raporlamalar için.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="mailto:support@digikoc.com" className="text-sm text-primary hover:underline">
              support@digikoc.com
            </a>
            <p className="text-xs text-muted-foreground">Yanıt süresi: 24 saat içinde</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <CardTitle>Canlı Yardım</CardTitle>
            </div>
            <CardDescription>Hızlı sorular için sohbet asistanı.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/chatbot">DigiBot'u Aç</Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-2">7/24 aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <CardTitle>Çağrı Merkezi</CardTitle>
            </div>
            <CardDescription>08:30–18:00 arasında hizmet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm font-semibold">0 850 000 00 00</div>
            <p className="text-xs text-muted-foreground">Hafta içi mesai saatleri</p>
          </CardContent>
        </Card>
      </div >

      {/* Resources - Enhanced */}
      < Card id="kaynaklar" >
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <CardTitle>Kaynaklar ve Belgeler</CardTitle>
          </div>
          <CardDescription>Kılavuzlar, politika ve güvenlik bilgileri.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Başlangıç Rehberi</span>
              </div>
              <p className="text-sm text-muted-foreground">Temel ekranlar ve iş akışları hakkında detaylı bilgi.</p>
            </div>

            <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors" id="guvenlik">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Güvenlik ve Erişim</span>
              </div>
              <p className="text-sm text-muted-foreground">Hesap rolleri, yetkiler ve veri koruma politikaları.</p>
            </div>

            <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors" id="gizlilik">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Gizlilik Politikası</span>
              </div>
              <p className="text-sm text-muted-foreground">Kişisel verilerinizin nasıl korunduğu ve kullanıldığı.</p>
            </div>

            <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Kullanıcı Yetkileri</span>
              </div>
              <p className="text-sm text-muted-foreground">Rol bazlı erişim hakları ve yetkilendirme sistemi.</p>
            </div>

            <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors" id="kullanim-kosullari">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Kullanım Koşulları</span>
              </div>
              <p className="text-sm text-muted-foreground">Sistemin kullanımına dair kurallar ve sorumluluklar.</p>
            </div>

            <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Search className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">API Dokümantasyonu</span>
              </div>
              <p className="text-sm text-muted-foreground">Geliştiriciler için teknik dokümantasyon.</p>
            </div>
          </div>
        </CardContent>
      </Card >
    </div >
  );
}