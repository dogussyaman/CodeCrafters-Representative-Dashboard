import * as cheerio from "cheerio";

const DANGEROUS_TAGS = ["script", "iframe", "object", "embed", "form"];
const DANGEROUS_ATTR_PREFIX = "on";
const DANGEROUS_PROTOCOLS = ["javascript:", "data:", "vbscript:", "jar:"];

/**
 * Attribute adı veya değerinin XSS açısından tehlikeli olup olmadığını döner.
 * Event handler (on*) ve tehlikeli protokol (javascript:, data:, vb.) kontrolü.
 */
function isDangerousAttribute(name: string, value: string): boolean {
  if (name.toLowerCase().startsWith(DANGEROUS_ATTR_PREFIX)) return true;
  const normalized = value.trim().toLowerCase();
  return DANGEROUS_PROTOCOLS.some((protocol) =>
    normalized.startsWith(protocol)
  );
}

/**
 * HTML içeriğini XSS riskine karşı sadeleştirir.
 * Tehlikeli etiketler ve event handler / tehlikeli protokol kullanımları kaldırılır.
 * Bülten, şablon vb. veritabanı kaynaklı HTML render öncesi kullanılmalıdır.
 *
 * @param html - Sanitize edilecek ham HTML metni
 * @returns Tehlikeli etiket/attribute temizlenmiş HTML; boş veya geçersiz girişte ""
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== "string") return "";

  const $ = cheerio.load(html);

  $(DANGEROUS_TAGS.join(",")).remove();

  $("*").each((_, el) => {
    const $el = $(el);
    const attribs = $el.attr();
    if (!attribs) return;

    const toRemove: string[] = [];
    Object.entries(attribs).forEach(([name, val]) => {
      const value = typeof val === "string" ? val : "";
      if (isDangerousAttribute(name, value)) toRemove.push(name);
    });
    toRemove.forEach((name) => $el.removeAttr(name));
  });

  return $("body").html() ?? "";
}
