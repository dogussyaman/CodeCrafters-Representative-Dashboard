"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReminderCard } from "./_components/reminder-card";
import { ReminderDialog, ReminderData } from "./_components/reminder-dialog";

// Mock Data
const MOCK_REMINDERS: ReminderData[] = [
    {
        id: "1",
        title: "Yıllık İzin Planlaması Hakkında",
        date: "16 Aralık 2025",
        type: "office",
        priority: "high",
        shortDescription: "2026 yılı yıllık izin planlamalarının ay sonuna kadar tamamlanması gerekmektedir.",
        fullDescription: "Değerli Çalışma Arkadaşlarımız,\n\n2026 yılına ait yıllık izin planlamalarınızı 31 Aralık 2025 tarihine kadar tamamlamanız gerekmektedir. İzinlerinizi sistem üzerinden girerek yöneticinizin onayına sununuz.\n\nPlanlama yaparken ekip içi dengeleri gözetmeniz ve projenizin yoğun dönemlerini dikkate almanız önemle rica olunur.\n\nDetaylı bilgi için İK departmanı ile iletişime geçebilirsiniz.",
    },
    {
        id: "2",
        title: "Ofis Tadilat Bilgilendirmesi",
        date: "18 Aralık 2025",
        type: "office",
        priority: "medium",
        shortDescription: "Hafta sonu ofis genelinde yapılacak bakım ve onarım çalışmaları hakkında.",
        fullDescription: "Merhaba,\n\nBu hafta sonu (20-21 Aralık) ofis genelinde elektrik altyapı bakım çalışmaları yapılacaktır. Bu süre zarfında ofis içi sistemlere erişimde kesintiler yaşanabilir.\n\nLütfen Cuma günü çıkarken bilgisayarlarınızı ve elektronik cihazlarınızı kapalı konuma getiriniz.\n\nAnlayışınız için teşekkür ederiz.",
    },
    {
        id: "3",
        title: "Yeni Sağlık Sigortası Poliçeleri",
        date: "10 Ocak 2026",
        type: "insurance",
        priority: "high",
        shortDescription: "Yeni dönem özel sağlık sigortası poliçeleri tanımlanmıştır.",
        fullDescription: "Sayın Çalışanımız,\n\n2026 dönemi Özel Sağlık Sigortası poliçeleriniz yenilenmiş ve sistemde tanımlanmıştır. Yeni poliçe detaylarınıza mobil uygulama üzerinden veya sigorta şirketinin web sitesinden erişebilirsiniz.\n\nYeni dönemde eklenen check-up ve diş bakım avantajlarını incelemeyi unutmayınız.",
    },
    {
        id: "4",
        title: "Kış Kampanyası Başladı",
        date: "15 Aralık 2025",
        type: "insurance",
        priority: "low",
        shortDescription: "Müşterilerimiz için hazırlanan kışa özel konut sigortası kampanyası.",
        fullDescription: "Değerli Temsilcimiz,\n\nKış aylarında artan risklere karşı müşterilerimizi korumak amacıyla hazırlanan 'Sıcak Yuva' konut sigortası kampanyamız başlamıştır. Kampanya kapsamında %20'ye varan indirimler ve ücretsiz kombi bakım hizmeti sunulmaktadır.\n\nKampanya detaylarına satış ekranlarından ulaşabilirsiniz.",
    },
    {
        id: "5",
        title: "Planlı Bakım Çalışması",
        date: "17 Aralık 2025",
        type: "system",
        priority: "medium",
        shortDescription: "CRM sisteminde yapılacak versiyon güncellemesi.",
        fullDescription: "DİKKAT,\n\n17 Aralık 2025 Çarşamba günü 22:00 - 00:00 saatleri arasında CRM sisteminde versiyon geçişi yapılacaktır. Bu saatler arasında sisteme erişim sağlanamayacaktır.\n\nAcil işlemlerinizi bu saatlerden önce tamamlamanız önemle duyurulur.",
    },
    {
        id: "6",
        title: "Güvenlik Güncellemesi",
        date: "15 Aralık 2025",
        type: "system",
        priority: "high",
        shortDescription: "Tüm kullanıcıların şifrelerini yenilemesi gerekmektedir.",
        fullDescription: "Güvenlik politikalarımız gereği 90 günde bir yapılan şifre değişikliği dönemi gelmiştir. Lütfen bir sonraki girişinizde şifrenizi yenileyiniz.\n\Yeni şifrenizin en az 8 karakter, büyük/küçük harf ve özel karakter içermesi gerekmektedir.",
    },
];

export default function RemindingPage() {
    const [selectedReminder, setSelectedReminder] = useState<ReminderData | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleViewDetails = (data: ReminderData) => {
        setSelectedReminder(data);
        setDialogOpen(true);
    };

    const filterReminders = (type: string) => {
        return MOCK_REMINDERS.filter(reminder => reminder.type === type);
    };

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Genel Hatırlatma Bildirimleri</h1>
                <p className="text-muted-foreground">Tüm departman ve sistem bildirimlerini buradan takip edebilirsiniz.</p>
            </div>


            <div className="w-full">
                <Tabs defaultValue="office" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8 h-8">
                        <TabsTrigger value="office" className="text-sm">Ofis Mail Hatırlatmaları</TabsTrigger>
                        <TabsTrigger value="insurance" className="text-sm">Güvence/Kampanya Hatırlatmaları</TabsTrigger>
                        <TabsTrigger value="system" className="text-sm">Sistem Bildirimleri</TabsTrigger>
                    </TabsList>

                    {["office", "insurance", "system"].map((tabValue) => (
                        <TabsContent key={tabValue} value={tabValue} className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in-50 duration-500 slide-in-from-bottom-5">
                                {filterReminders(tabValue).map((reminder) => (
                                    <ReminderCard
                                        key={reminder.id}
                                        data={reminder}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))}
                                {filterReminders(tabValue).length === 0 && (
                                    <div className="col-span-full flex flex-col items-center justify-center p-12 text-center text-muted-foreground border-2 border-dashed rounded-lg bg-muted/10 h-64">
                                        <p className="text-lg font-medium">Bu kategoride hatırlatma bulunmamaktadır.</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>

            <ReminderDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                data={selectedReminder}
            />
        </div>
    )
}