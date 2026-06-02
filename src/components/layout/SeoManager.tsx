import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SITE_ORIGIN = "https://lynxracingspainteam.com";
const DEFAULT_IMAGE = `${SITE_ORIGIN}/logo.jpg`;

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
}

function replaceMetaGroup(attribute: "name" | "property", key: string, values: string[]) {
  document.head
    .querySelectorAll(`meta[${attribute}="${key}"]`)
    .forEach((element) => element.parentElement?.removeChild(element));

  values.forEach((value) => {
    const element = document.createElement("meta");
    element.setAttribute(attribute, key);
    element.setAttribute("content", value);
    document.head.appendChild(element);
  });
}

function upsertCanonical(href: string) {
  upsertLink('link[rel="canonical"]', {
    rel: "canonical",
    href,
  });
}

export function SeoManager() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const currentLang = location.pathname.startsWith("/en")
      ? "en"
      : location.pathname.startsWith("/ca")
        ? "ca"
        : "es";
    const normalizedPath = location.pathname.replace(/^\/(en|ca)(?=\/|$)/, "") || "/";
    const seoKeyMap: Record<string, string> = {
      "/": "home",
      "/agenda": "calendar",
      "/multimedia": "media",
      "/roster": "roster",
      "/palmares": "palmares",
      "/tienda": "shop",
      "/contacto": "contact",
    };

    const seoKey = seoKeyMap[normalizedPath] ?? "home";
    const title = t(`seo.${seoKey}.title`);
    const description = t(`seo.${seoKey}.description`);
    const canonicalUrl = `${SITE_ORIGIN}${location.pathname === "/" ? "/" : location.pathname}`;
    const localeMap: Record<string, string> = {
      es: "es_ES",
      en: "en_GB",
      ca: "ca_ES",
    };
    const alternateUrls = {
      es: `${SITE_ORIGIN}${normalizedPath === "/" ? "/" : normalizedPath}`,
      en: `${SITE_ORIGIN}/en${normalizedPath === "/" ? "" : normalizedPath}`,
      ca: `${SITE_ORIGIN}/ca${normalizedPath === "/" ? "" : normalizedPath}`,
    };

    document.title = title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });

    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });

    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });

    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: DEFAULT_IMAGE,
    });

    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: localeMap[currentLang],
    });

    replaceMetaGroup(
      "property",
      "og:locale:alternate",
      Object.entries(localeMap)
        .filter(([lang]) => lang !== currentLang)
        .map(([, locale]) => locale),
    );

    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });

    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });

    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: DEFAULT_IMAGE,
    });

    upsertCanonical(canonicalUrl);

    upsertLink('link[rel="alternate"][hreflang="es"]', {
      rel: "alternate",
      hreflang: "es",
      href: alternateUrls.es,
    });

    upsertLink('link[rel="alternate"][hreflang="en"]', {
      rel: "alternate",
      hreflang: "en",
      href: alternateUrls.en,
    });

    upsertLink('link[rel="alternate"][hreflang="ca"]', {
      rel: "alternate",
      hreflang: "ca",
      href: alternateUrls.ca,
    });

    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: "alternate",
      hreflang: "x-default",
      href: alternateUrls.es,
    });
  }, [i18n.language, location.pathname, t]);

  return null;
}
