export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h1 className="text-xl font-semibold">Temsilci Paneli</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">Bekleyen Görevler</p>
          <p className="text-2xl font-semibold">0</p>
        </div>
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">İşlemde</p>
          <p className="text-2xl font-semibold">0</p>
        </div>
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">Tamamlanan</p>
          <p className="text-2xl font-semibold">0</p>
        </div>
      </div>
      <div className="rounded-md border p-4">
        <p className="text-sm text-muted-foreground">Günlük görevler burada listelenecek.</p>
      </div>
    </div>
  );
}