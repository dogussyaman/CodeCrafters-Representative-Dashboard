import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "CodeCraftX MT Dashboard",
  version: packageJson.version,
  copyright: `© ${currentYear}, CodeCraftX MT Dashboard.`,
  meta: {
    title: "CodeCraftX MT Dashboard - Müşteri Temsilcisi Paneli",
    description:
      "CodeCraftX platformu için müşteri temsilcisi ve yönetici paneli. İletişim mesajları, destek biletleri, eğitim/rol/şirket talepleri ve bildirimler.",
  },
};
