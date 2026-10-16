import { siteFor } from "../data/site";
import { languages, localePath, ui, type Lang } from "../i18n/ui";

const siteUrl = siteFor("fa").url;
const abs = (path: string) => new URL(path, siteUrl).href;
export const orgId = `${siteUrl}/#organization`;
export const personId = `${siteUrl}/#person`;

/** گراف Schema.org صفحه اصلی؛ فقط اطلاعات واقعی (فیلدهای خالی حذف می‌شوند). */
export function siteGraph(lang: Lang = "fa") {
  const site = siteFor(lang);
  const t = ui[lang].site;
  const home = abs(localePath(lang, "/"));
  const { phone, email, whatsapp, telegram } = site.contact;
  const sameAs = [whatsapp, telegram].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: home, name: site.name, inLanguage: languages[lang].tag, publisher: { "@id": orgId } },
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: site.name,
        url: home,
        description: site.description,
        logo: abs("/icon-512.png"),
        image: abs(site.ogImage),
        areaServed: { "@type": "Country", name: t.country },
        serviceType: t.serviceTypes,
        founder: { "@id": personId },
        ...(phone ? { telephone: phone } : {}),
        ...(email ? { email } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
      { "@type": "Person", "@id": personId, name: site.owner, url: abs(localePath(lang, "/about/")), jobTitle: t.jobTitle, worksFor: { "@id": orgId } },
    ],
  };
}
