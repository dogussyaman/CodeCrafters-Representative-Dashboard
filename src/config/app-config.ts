import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "CodeCrafters MT Dashboard",
  version: packageJson.version,
  copyright: `© ${currentYear}, CodeCrafters MT Dashboard.`,
  meta: {
    title: "CodeCrafters MT Dashboard - Müşteri Temsilcisi Paneli",
    description:
      "CodeCrafters platformu için müşteri temsilcisi ve yönetici paneli. İletişim mesajları, destek biletleri, eğitim/rol/şirket talepleri ve bildirimler.",
  },
};
