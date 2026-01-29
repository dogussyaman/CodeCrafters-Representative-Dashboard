"use client";

import { useState, useEffect } from "react";

export interface Template {
    id: string;
    name: string;
    content: string;
    preview: string;
    unit: string; // Changed from category to unit
    createdAt: string;
}

const DEFAULT_TEMPLATES: Template[] = [
    // SATIŞ BİRİMİ Templates
    {
        id: "unit-a-1",
        name: "Araç Kiralama Fiyat Tablosu (Satış Birimi)",
        preview: "Günlük araç kiralama fiyatları...",
        content: `<h2>SATIŞ BİRİMİ Araç Kiralama Fiyat Tablosu</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr style="background:#f5f5f5"><th>Araç Grubu</th><th>Günlük</th><th>Haftalık</th><th>Aylık</th></tr>
<tr><td>Ekonomik (Sınıf 1)</td><td>750 TL</td><td>5.000 TL</td><td>16.000 TL</td></tr>
<tr><td>Orta (Sınıf 2)</td><td>1.100 TL</td><td>7.000 TL</td><td>23.000 TL</td></tr>
<tr><td>Premium (Sınıf 3)</td><td>1.600 TL</td><td>10.000 TL</td><td>35.000 TL</td></tr>
<tr><td>SUV (Sınıf 4)</td><td>2.000 TL</td><td>13.000 TL</td><td>45.000 TL</td></tr>
</table>
<p><em>*Fiyatlar KDV dahildir. Güvence paketleri ayrıca ücretlendirilir.</em></p>`,
        unit: "SATIŞ BİRİMİ",
        createdAt: new Date().toISOString(),
    },
    {
        id: "unit-a-2",
        name: "Güvence Paketleri Karşılaştırma",
        preview: "Güvence paket detayları...",
        content: `<h2>SATIŞ BİRİMİ Güvence Paketleri</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr style="background:#f5f5f5"><th>Paket</th><th>Kapsam</th><th>Muafiyet</th><th>Günlük Ücret</th></tr>
<tr><td>Temel</td><td>Kasko + Trafik</td><td>12.000 TL</td><td>120 TL</td></tr>
<tr><td>Standart</td><td>Kasko + Trafik + Cam</td><td>6.000 TL</td><td>200 TL</td></tr>
<tr><td>Premium</td><td>Tam Koruma</td><td>0 TL</td><td>250 TL</td></tr>
</table>`,
        unit: "SATIŞ BİRİMİ",
        createdAt: new Date().toISOString(),
    },
    {
        id: "unit-a-3",
        name: "Kampanya Bilgilendirme",
        preview: "Aktif kampanya detayları...",
        content: `<h2>Aralık Ayı Kampanyaları</h2>
<ul>
<li><strong>Erken Rezervasyon:</strong> 7 gün önceden %15 indirim</li>
<li><strong>Hafta Sonu Özel:</strong> Cuma-Pazar arası %20 indirim</li>
<li><strong>Kurumsal Avantaj:</strong> Anlaşmalı firmalara %25 indirim</li>
</ul>
<p><strong>Kampanya Kodu:</strong> ARALIK2024</p>`,
        unit: "SATIŞ BİRİMİ",
        createdAt: new Date().toISOString(),
    },
    {
        id: "unit-a-4",
        name: "VIP Müşteri Karşılama",
        preview: "VIP protokol bilgileri...",
        content: `<h2>VIP Müşteri Karşılama Protokolü</h2>
<ol>
<li>Müşteri havalimanına inmeden araç hazırlanır</li>
<li>Karşılama noktasında isim tabelası ile beklenir</li>
<li>Araç klimalı ve temiz teslim edilir</li>
<li>Premium güvence paketi standart olarak dahildir</li>
</ol>
<p><strong>İletişim:</strong> VIP Hat: 0850 123 45 67</p>`,
        unit: "SATIŞ BİRİMİ",
        createdAt: new Date().toISOString(),
    },
    {
        id: "unit-a-5",
        name: "Yurtdışı Kiralama Prosedürü",
        preview: "Yurtdışı işlem adımları...",
        content: `<h2>Yurtdışı Kiralama Prosedürü</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr style="background:#f5f5f5"><th>Adım</th><th>Açıklama</th><th>Süre</th></tr>
<tr><td>1</td><td>Online Rezervasyon</td><td>5 dk</td></tr>
<tr><td>2</td><td>Evrak Onayı</td><td>1 iş günü</td></tr>
<tr><td>3</td><td>Ödeme</td><td>Anında</td></tr>
<tr><td>4</td><td>Araç Teslimi</td><td>Varış günü</td></tr>
</table>`,
        unit: "SATIŞ BİRİMİ",
        createdAt: new Date().toISOString(),
    },
    // MÜŞTERİ HİZMETLERİ Templates
    {
        id: "unit-b-1",
        name: "Ekonomik Araç Fiyatları",
        preview: "Müşteri Hizmetleri fiyat listesi...",
        content: `<h2>MÜŞTERİ HİZMETLERİ Ekonomik Fiyat Listesi</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr style="background:#f5f5f5"><th>Araç</th><th>Günlük</th><th>Haftalık</th></tr>
<tr><td>Model A</td><td>600 TL</td><td>3.800 TL</td></tr>
<tr><td>Model B</td><td>550 TL</td><td>3.500 TL</td></tr>
<tr><td>Model C</td><td>650 TL</td><td>4.200 TL</td></tr>
</table>`,
        unit: "MÜŞTERİ HİZMETLERİ",
        createdAt: new Date().toISOString(),
    },
    {
        id: "unit-b-2",
        name: "Haftalık Kampanyalar",
        preview: "Bu hafta geçerli kampanyalar...",
        content: `<h2>Bu Hafta Geçerli Kampanyalar</h2>
<ul>
<li><strong>%10 İndirim:</strong> 3 gün ve üzeri kiralamalarda</li>
<li><strong>Ücretsiz Ek Sürücü:</strong> Haftalık kiralamalarda</li>
<li><strong>Bebek Koltuğu Hediye:</strong> Aile paketi seçenlere</li>
</ul>`,
        unit: "MÜŞTERİ HİZMETLERİ",
        createdAt: new Date().toISOString(),
    },
    {
        id: "unit-b-3",
        name: "Güvence Paketi Bilgileri",
        preview: "Birim B güvence seçenekleri...",
        content: `<h2>MÜŞTERİ HİZMETLERİ Güvence Seçenekleri</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr style="background:#f5f5f5"><th>Paket</th><th>Fiyat</th><th>Muafiyet</th></tr>
<tr><td>Ekonomik</td><td>100 TL/gün</td><td>9.000 TL</td></tr>
<tr><td>Konfor</td><td>180 TL/gün</td><td>4.500 TL</td></tr>
<tr><td>Tam Güvence</td><td>230 TL/gün</td><td>0 TL</td></tr>
</table>`,
        unit: "MÜŞTERİ HİZMETLERİ",
        createdAt: new Date().toISOString(),
    },
    {
        id: "unit-b-4",
        name: "Rezervasyon Onay Şablonu",
        preview: "Rezervasyon onay metni...",
        content: `<h2>Rezervasyon Onayı</h2>
<p>Sayın <strong>[MÜŞTERİ ADI]</strong>,</p>
<p>Rezervasyonunuz onaylanmıştır.</p>
<ul>
<li><strong>Rezervasyon No:</strong> [REZ-NO]</li>
<li><strong>Araç:</strong> [ARAÇ MODEL]</li>
<li><strong>Tarih:</strong> [BAŞLANGIÇ] - [BİTİŞ]</li>
<li><strong>Toplam:</strong> [TUTAR] TL</li>
</ul>`,
        unit: "MÜŞTERİ HİZMETLERİ",
        createdAt: new Date().toISOString(),
    },
    {
        id: "unit-b-5",
        name: "Müşteri İletişim Formu",
        preview: "Standart iletişim şablonu...",
        content: `<h2>Müşteri İletişim Şablonu</h2>
<p>Merhaba,</p>
<p>Bizi tercih ettiğiniz için teşekkür ederiz.</p>
<p>Talebiniz değerlendirilmektedir. En kısa sürede size dönüş yapılacaktır.</p>
<p><strong>Çağrı Merkezi:</strong> 0850 111 22 33</p>`,
        unit: "MÜŞTERİ HİZMETLERİ",
        createdAt: new Date().toISOString(),
    },
    // OPERASYON BİRİMİ Templates
    {
        id: "unit-c-1",
        name: "Lokasyonlar ve İletişim",
        preview: "Lokasyon adresleri ve telefonları...",
        content: `<h2>Lokasyonlar</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr style="background:#f5f5f5"><th>Şehir</th><th>Adres</th><th>Telefon</th></tr>
<tr><td>İstanbul</td><td>Merkez Ofis</td><td>0212 111 22 33</td></tr>
<tr><td>Ankara</td><td>Bölge Ofisi</td><td>0312 222 33 44</td></tr>
<tr><td>İzmir</td><td>Bölge Ofisi</td><td>0232 333 44 55</td></tr>
</table>`,
        unit: "OPERASYON BİRİMİ",
        createdAt: new Date().toISOString(),
    },
    {
        id: "unit-c-2",
        name: "Çalışma Saatleri",
        preview: "Çalışma saatleri...",
        content: `<h2>Çalışma Saatleri</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr style="background:#f5f5f5"><th>Gün</th><th>Açılış</th><th>Kapanış</th></tr>
<tr><td>Pazartesi-Cuma</td><td>08:00</td><td>20:00</td></tr>
<tr><td>Cumartesi</td><td>09:00</td><td>18:00</td></tr>
<tr><td>Pazar</td><td>10:00</td><td>16:00</td></tr>
</table>
<p><em>*Havalimanı lokasyonları 7/24 açıktır.</em></p>`,
        unit: "OPERASYON BİRİMİ",
        createdAt: new Date().toISOString(),
    },
    // İKAME HİZMETLERİ Templates
    {
        id: "unit-d-1",
        name: "İkame Araç Fiyat Listesi",
        preview: "İkame araç ücretleri...",
        content: `<h2>İkame Araç Fiyat Listesi</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr style="background:#f5f5f5"><th>Segment</th><th>Günlük</th><th>Km Limiti</th></tr>
<tr><td>A Segment</td><td>450 TL</td><td>100 km</td></tr>
<tr><td>B Segment</td><td>650 TL</td><td>150 km</td></tr>
<tr><td>C Segment</td><td>900 TL</td><td>200 km</td></tr>
<tr><td>SUV</td><td>1.300 TL</td><td>200 km</td></tr>
</table>`,
        unit: "İKAME HİZMETLERİ",
        createdAt: new Date().toISOString(),
    },
    {
        id: "unit-d-2",
        name: "Bölge Müdürleri İletişim",
        preview: "Bölge müdürleri listesi...",
        content: `<h2>Bölge Müdürleri</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr style="background:#f5f5f5"><th>Bölge</th><th>Müdür</th><th>Telefon</th></tr>
<tr><td>Marmara</td><td>Ali Kaya</td><td>0532 111 22 33</td></tr>
<tr><td>Ege</td><td>Veli Demir</td><td>0533 222 33 44</td></tr>
</table>`,
        unit: "İKAME HİZMETLERİ",
        createdAt: new Date().toISOString(),
    },
    // KURUMSAL SATIŞ Templates
    {
        id: "unit-e-1",
        name: "Kurumsal Fiyat Teklifi",
        preview: "Kurumsal teklif şablonu...",
        content: `<h2>Kurumsal Fiyat Teklifi</h2>
<p><strong>Firma:</strong> [FİRMA ADI]</p>
<p><strong>Tarih:</strong> [TARİH]</p>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr style="background:#f5f5f5"><th>Araç Grubu</th><th>Adet</th><th>Aylık Fiyat</th><th>Toplam</th></tr>
<tr><td>Ekonomik</td><td>10</td><td>14.000 TL</td><td>140.000 TL</td></tr>
<tr><td>Orta</td><td>5</td><td>20.000 TL</td><td>100.000 TL</td></tr>
<tr><td><strong>Genel Toplam</strong></td><td></td><td></td><td><strong>240.000 TL</strong></td></tr>
</table>`,
        unit: "KURUMSAL SATIŞ",
        createdAt: new Date().toISOString(),
    },
    // FİLO YÖNETİMİ Templates
    {
        id: "unit-f-1",
        name: "Filo Durum Raporu",
        preview: "Güncel filo durumu...",
        content: `<h2>Filo Durum Raporu</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr style="background:#f5f5f5"><th>Durum</th><th>Adet</th><th>Oran</th></tr>
<tr><td>Kirada</td><td>280</td><td>%85</td></tr>
<tr><td>Müsait</td><td>32</td><td>%10</td></tr>
<tr><td>Bakımda</td><td>10</td><td>%3</td></tr>
<tr><td>Transfer</td><td>8</td><td>%2</td></tr>
</table>`,
        unit: "FİLO YÖNETİMİ",
        createdAt: new Date().toISOString(),
    },
    // ADMIN Templates
    {
        id: "admin-1",
        name: "Kullanıcı Yönetim Tablosu",
        preview: "Aktif kullanıcı listesi...",
        content: `<h2>Kullanıcı Yönetim Tablosu</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
<tr style="background:#f5f5f5"><th>Kullanıcı</th><th>Rol</th><th>Birim</th><th>Durum</th></tr>
<tr><td>admin@company.com</td><td>Admin</td><td>Tümü</td><td>✓ Aktif</td></tr>
<tr><td>user1@company.com</td><td>Temsilci</td><td>Satış Birimi</td><td>✓ Aktif</td></tr>
<tr><td>user2@company.com</td><td>Temsilci</td><td>Müşteri Hizmetleri</td><td>✓ Aktif</td></tr>
</table>`,
        unit: "ADMIN",
        createdAt: new Date().toISOString(),
    },
];

export function useTemplates() {
    const [templates, setTemplates] = useState<Template[]>(DEFAULT_TEMPLATES);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const saved = localStorage.getItem("editor-templates");
            if (saved) {
                try {
                    setTemplates(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse templates", e);
                }
            }
            setIsLoaded(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("editor-templates", JSON.stringify(templates));
        }
    }, [templates, isLoaded]);

    const addTemplate = (template: Omit<Template, "id" | "createdAt">) => {
        const newTemplate: Template = {
            ...template,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };
        setTemplates((prev) => [...prev, newTemplate]);
    };

    const deleteTemplate = (id: string) => {
        setTemplates((prev) => prev.filter((t) => t.id !== id));
    };

    const updateTemplate = (id: string, updates: Partial<Template>) => {
        setTemplates((prev) =>
            prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
        );
    };

    return {
        templates,
        addTemplate,
        deleteTemplate,
        updateTemplate,
        isLoaded,
    };
}
