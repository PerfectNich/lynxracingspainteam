import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";

import { useEffect, useState } from "react";
import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";

const PALMARÉS_DOC_URL =
  "https://docs.google.com/document/d/e/2PACX-1vS9hKIWP8VZO5K6v3X7-Mcy3n9tCrv8hiwjBkgekQJdMYZAK6LbpC8Q_XfJ_fXwXhpiNC7jtKaYEcZC/pub?output=html";

export function PalmaresPage() {
  const [html, setHtml] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(PALMARÉS_DOC_URL);
        if (!res.ok) throw new Error(res.statusText);
        const text = await res.text();
        setHtml(text);
      } catch (err: any) {
        console.error("Error cargando palmarés:", err);
        setError("No se pudo cargar el palmarés. Comprueba la conexión o el documento.");
      }
    }
    load();
  }, []);

  return (
    <>
      <PageHeader title="Palmarés" />

      <Section>
        {error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : html ? (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <p className="text-lynx-text text-center">Cargando...</p>
        )}
      </Section>
    </>
  );
}
