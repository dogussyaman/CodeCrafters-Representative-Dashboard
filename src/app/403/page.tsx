export default function Page() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2 text-center p-6">
      <h1 className="text-2xl font-semibold">Yetkisiz erişim</h1>
      <p className="text-muted-foreground">Bu sayfaya erişim yetkiniz bulunmuyor.</p>
    </div>
  );
}