"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Page() {
  const [feedback, setFeedback] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast.error("Geri bildirim metni boş olamaz");
      return;
    }
    toast.success("Geri bildiriminiz alındı");
    setFeedback("");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Yeni şifre en az 8 karakter olmalı");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifre ile doğrulama eşleşmiyor");
      return;
    }
    if (newPassword === currentPassword) {
      toast.error("Yeni şifre mevcut şifre ile aynı olamaz");
      return;
    }
    toast.success("Şifreniz başarıyla güncellendi");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profil</h1>
        <p className="text-sm text-muted-foreground">Hesap bilgileri, geri bildirim ve şifre yönetimi</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hesap Bilgileri</CardTitle>
          <CardDescription>İsim ve e-posta bilgileri görüntülenir, düzenlenemez.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>İsim Soyisim</Label>
            <Input value="Doğuş Yaman" readOnly />
          </div>
          <div className="space-y-2">
            <Label>E-posta</Label>
            <Input value="arham.khan@example.com" readOnly />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Geri Bildirim</CardTitle>
          <CardDescription>Ürün veya operasyon ile ilgili önerilerinizi iletin.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitFeedback} className="space-y-3">
            <div className="space-y-2">
              <Label>Mesajınız</Label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                placeholder="Geri bildiriminizi yazın..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Button type="submit">Gönder</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Şifre Değiştir</CardTitle>
          <CardDescription>Yeni şifrenizi belirleyin.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Mevcut Şifre</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Mevcut şifreniz"
              />
            </div>
            <div className="space-y-2">
              <Label>Yeni Şifre</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="En az 8 karakter"
              />
            </div>
            <div className="space-y-2">
              <Label>Yeni Şifre (Tekrar)</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Yeni şifrenizi tekrar yazın"
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Şifreyi Güncelle</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

