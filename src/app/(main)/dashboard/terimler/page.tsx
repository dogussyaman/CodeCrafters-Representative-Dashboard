import { redirect } from "next/navigation";
import { TERMS_BASE_PATH } from "@/config/terms-config";

const DEFAULT_LETTER = "a";

/**
 * /dashboard/terimler → /dashboard/terimler/a yönlendirmesi.
 * SEO: Tek canonical URL (harf bazlı sayfalar).
 */
export default function TerimlerPage() {
  redirect(`${TERMS_BASE_PATH}/${DEFAULT_LETTER}`);
}
