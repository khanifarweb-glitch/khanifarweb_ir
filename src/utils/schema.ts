import { site } from "../data/site";

const abs = (path: string) => new URL(path, site.url).href;
export const orgId = `${site.url}/#organization`;
export const personId = `${site.url}/#person`;

/** گراف Schema.org صفحه اصلی؛ فقط اطلاعات واقعی (فیلدهای خالی حذف می‌شوند). */
export function siteGraph() {
  const { phone, email, whatsapp, telegram } = site.contact;
  const sameAs = [whatsapp, telegram].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: "fa-IR", publisher: { "@id": orgId } },
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: site.name,
        url: site.url,
        description: site.description,
        logo: abs("/icon-512.png"),
        image: abs(site.ogImage),
        areaServed: { "@type": "Country", name: "ایران" },
        serviceType: ["طراحی سایت", "پشتیبانی سایت", "خدمات و آموزش هوش مصنوعی"],
        founder: { "@id": personId },
        ...(phone ? { telephone: phone } : {}),
        ...(email ? { email } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
      { "@type": "Person", "@id": personId, name: site.owner, url: abs("/about/"), jobTitle: "طراح و توسعه‌دهنده وب", worksFor: { "@id": orgId } },
    ],
  };
}
