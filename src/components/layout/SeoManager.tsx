import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SITE_ORIGIN = "https://lynxracingspainteam.com";
const DEFAULT_IMAGE = `${SITE_ORIGIN}/logo.jpg`;

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

function upsertCanonical(href: string) {
  let element = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function SeoManager() {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const normalizedPath = location.pathname.replace(/^\/(en|ca)(?=\/|$)/, "") || "/";
    const seoKeyMap: Record<string, string> = {
      "/": "home",
      "/agenda": "calendar",
      "/multimedia": "media",
      "/roster": "roster",
      "/palmares": "palmares",
      "/tienda": "shop",
      "/contacto": "contact",
      "/resultados": "results",
    };

    const seoKey = seoKeyMap[normalizedPath] ?? "home";
    const title = t(`seo.${seoKey}.title`);
    const description = t(`seo.${seoKey}.description`);
    const canonicalUrl = `${SITE_ORIGIN}${location.pathname === "/" ? "/" : location.pathname}`;

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
  }, [location.pathname, t]);

  return null;
}
