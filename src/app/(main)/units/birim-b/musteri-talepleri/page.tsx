"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";

export default function Page() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Müşteri Talepleri</h1>
        <p className="text-muted-foreground mt-2">
          Müşteri taleplerini görüntüleyin, yanıtlayın ve takip edin
        </p>
      </div>

      <Tabs defaultValue="bekleyen" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bekleyen">
            <Clock className="mr-2 h-4 w-4" />
            Bekleyen (12)
          </TabsTrigger>
          <TabsTrigger value="devam">
            <MessageSquare className="mr-2 h-4 w-4" />
            Devam Eden (8)
          </TabsTrigger>
          <TabsTrigger value="tamamlanan">
            <CheckCircle className="mr-2 h-4 w-4" />
            Tamamlanan (45)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bekleyen" className="space-y-4">
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Talep #{item}</CardTitle>
                    <CardDescription>Müşteri: Ahmet Yılmaz • 2 saat önce</CardDescription>
                  </div>
                  <Badge variant="outline">Yüksek Öncelik</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Araç kiralama süresini uzatmak istiyorum. Lütfen fiyat bilgisi veriniz.
                </p>
                <div className="flex gap-2">
                  <Button size="sm">Yanıtla</Button>
                  <Button size="sm" variant="outline">
                    Detay
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="devam" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Devam Eden Talepler</CardTitle>
              <CardDescription>Şu anda işlem görmekte olan talepler</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Devam eden talep bulunmamaktadır.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tamamlanan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tamamlanan Talepler</CardTitle>
              <CardDescription>Son 30 günde tamamlanan talepler</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Tamamlanan talep geçmişi görüntüleniyor...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

