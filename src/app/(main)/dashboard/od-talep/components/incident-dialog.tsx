"use client"

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type IncidentDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  appName: string | null
  onSubmit?: (data: {
    appName: string
    duration: string
    emails: string[]
    ticketId: string
    details: string
    imageFile?: File | null
  }) => void
}

export default function IncidentDialog({ open, onOpenChange, appName, onSubmit }: IncidentDialogProps) {
  const [duration, setDuration] = React.useState("")
  const [emails, setEmails] = React.useState("")
  const [ticketId, setTicketId] = React.useState("")
  const [details, setDetails] = React.useState("")
  const [imageFile, setImageFile] = React.useState<File | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!appName) return
    const payload = {
      appName,
      duration,
      emails: emails
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      ticketId,
      details,
      imageFile,
    }
    onSubmit?.(payload)
    onOpenChange(false)
    setDuration("")
    setEmails("")
    setTicketId("")
    setDetails("")
    setImageFile(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Vaka Bildirimi</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label>Uygulama</Label>
            <Input value={appName ?? ""} readOnly />
          </div>
          <div className="grid gap-2">
            <Label>Ne kadar süredir hata devam ediyor</Label>
            <Input placeholder="Örn: 2 saat, 3 gündür" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Örnek e-postalar</Label>
            <Textarea placeholder="virgul ile ayırın" value={emails} onChange={(e) => setEmails(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Örnek TİC ID</Label>
            <Input placeholder="Örn: TIC-123456" value={ticketId} onChange={(e) => setTicketId(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Detay</Label>
            <Textarea placeholder="Hata detayını yazın" value={details} onChange={(e) => setDetails(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Görsel ekle</Label>
            <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>İptal</Button>
            <Button type="submit">Gönder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

