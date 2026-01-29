"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Paperclip, Image as ImageIcon, FileText, Send } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  subject: z.string().min(3, "Başlık en az 3 karakter olmalı"),
  category: z.string().min(1, "Kategori seçin"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı"),
});

type FormValues = z.infer<typeof schema>;

export default function FeedbackPage() {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "", category: "", message: "" },
  });

  const onSubmit = (values: FormValues) => {
    toast.success("Geri bildirim gönderildi");
    form.reset();
    setFiles([]);
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.currentTarget.files ? Array.from(e.currentTarget.files) : [];
    setFiles((prev) => [...prev, ...f]);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6 p-6 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Geri Bildirim</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Form</CardTitle>
          <CardDescription>Görsel veya dosya ekleyebilirsiniz.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Başlık</FormLabel>
                      <FormControl>
                        <Input placeholder="Kısa başlık" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <FormControl>
                        <Input placeholder="Örn. Arama, Şablonlar, Kampanya" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mesaj</FormLabel>
                    <FormControl>
                      <Textarea rows={6} placeholder="Geri bildiriminizi yazın" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" className="gap-2" onClick={() => document.getElementById("fb-files")?.click()}>
                    <Paperclip className="h-4 w-4" />
                    Dosya Ekle
                  </Button>
                  <input id="fb-files" type="file" className="hidden" multiple accept="image/*,.pdf,.doc,.docx,.txt" onChange={handleFiles} />
                </div>
                {files.length > 0 && (
                  <div className="rounded-lg border p-3 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted/30 rounded-md p-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {file.type.startsWith("image/") ? (
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-sm truncate">{file.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {Math.round(file.size / 1024)} KB
                          </Badge>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          Kaldır
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Alert className="bg-card/50">
                <AlertDescription className="text-sm">Gönderimler değerlendirme için kayıt altına alınır.</AlertDescription>
              </Alert>

              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  <Send className="h-4 w-4" />
                  Gönder
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}