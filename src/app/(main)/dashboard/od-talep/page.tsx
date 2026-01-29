"use client";
import React from "react";
import IncidentDialog from "./components/incident-dialog";
import { toast } from "sonner";
import { actionItems } from "./_data/action-items";

const page = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedAppName, setSelectedAppName] = React.useState<string | null>(null);

  return (
    <div className="mx-auto max-w-6xl space-y-6 min-h-screen">
      <div className="grid grid-cols-1 items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actionItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedAppName(item.name);
              setIsDialogOpen(true);
            }}
            className="bg-card p-4 rounded-md border border-border text-center cursor-pointer transition hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex flex-col items-center gap-2">
              {item.icon}
              <span>{item.name}</span>
            </div>
          </button>
        ))}
      </div>

      <IncidentDialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
        appName={selectedAppName}
        onSubmit={async (data) => {
          try {
            const toDataUrl = async (file?: File | null) => {
              if (!file) return undefined as string | undefined;
              const reader = new FileReader();
              const p = new Promise<string>((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = () => reject(new Error("read_error"));
              });
              reader.readAsDataURL(file);
              return await p;
            };

            const image = await toDataUrl(data.imageFile);
            const incident = {
              id: crypto.randomUUID(),
              appName: data.appName,
              duration: data.duration,
              emails: data.emails,
              ticketId: data.ticketId,
              details: data.details,
              image,
              status: "Yeni" as const,
              createdAt: new Date().toISOString(),
            };

            const key = "vaka_bildirimleri";
            const existing = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
            const list = existing ? (JSON.parse(existing) as any[]) : [];
            list.unshift(incident);
            if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(list));
            toast.success("Vaka bildirimi kaydedildi");
          } catch {
            toast.error("Vaka bildirimi kaydedilemedi");
          }
        }}
      />
    </div>
  );
};

export default page;
