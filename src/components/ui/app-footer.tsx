import Link from "next/link";
import Image from "next/image";
import { APP_CONFIG } from "@/config/app-config";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function AppFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t bg-card text-card-foreground">
            {/* Gradient Top Border */}
            <div className="h-1 w-full bg-gradient-to-r from-slate-900 via-indigo-500 to-fuchsia-500" />

            <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    {APP_CONFIG.name}
                                </h3>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Akıllı Çalışma Asistanı
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Tüm operasyonel birimleri tek merkezden yönetin. Hız, verimlilik ve yapay zeka desteği.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{APP_CONFIG.copyright}</span>
                            <span>•</span>
                            <span>v{APP_CONFIG.version}</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Hızlı Erişim</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/dashboard/default"
                                    className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                                >
                                    Ana Sayfa
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/templates"
                                    className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                                >
                                    Şablonlar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/editor"
                                    className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                                >
                                    Editör
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/chatbot"
                                    className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                                >
                                    DigiBot Asistan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/profile"
                                    className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                                >
                                    Profil
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Kaynaklar</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/dashboard/help"
                                    className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                                >
                                    Yardım ve Destek
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/education"
                                    className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                                >
                                    Eğitim
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/feedback"
                                    className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                                >
                                    Geri Bildirim
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/help#sss"
                                    className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                                >
                                    Sık Sorulan Sorular
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/help#klavye-kisayollari"
                                    className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                                >
                                    Klavye Kısayolları
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">İletişim</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <a href="mailto:yamandogus251@gmail.com" className="hover:text-foreground transition-colors">
                                    yamandogus251@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>05317617325</span>
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>Bursa, Türkiye</span>
                            </li>
                        </ul>

                        <div className="pt-2">
                            <p className="mb-3 text-xs font-medium text-muted-foreground">Sosyal Medya</p>
                            <div className="flex items-center gap-2">
                                <Link
                                    href="https://www.linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground hover:scale-110"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground hover:scale-110"
                                    aria-label="GitHub"
                                >
                                    <Github className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground hover:scale-110"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 border-t pt-6">
                    <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
                        <p>© {currentYear} {APP_CONFIG.name}. Tüm hakları saklıdır.</p>
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard/help#gizlilik" className="hover:text-foreground transition-colors hover:underline">
                                Gizlilik Politikası
                            </Link>
                            <Link href="/dashboard/help#guvenlik" className="hover:text-foreground transition-colors hover:underline">
                                Güvenlik
                            </Link>
                            <Link href="/dashboard/help#kullanim-kosullari" className="hover:text-foreground transition-colors hover:underline">
                                Kullanım Koşulları
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
