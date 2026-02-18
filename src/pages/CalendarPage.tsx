import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";
import { SectionTitle } from "../components/common/SectionTitle";

export function CalendarPage() {
  return (
    <>
      <PageHeader title="Fechas" />

      <Section className="!max-w-[1400px]">
        <SectionTitle>Calendario de Carreras</SectionTitle>
        {/* layout: calendar on left and sidebar on right */}
        <div className="flex flex-col lg:flex-row justify-center gap-6">
          <div className="flex-1 shadow-orange-glow rounded-lg overflow-hidden transition-all duration-300 hover:shadow-orange-glow-hover hover:scale-[1.01]">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=MmU4M2UzNGQxYTZhMTE3NWU3NjRmZDhmMGFkY2JmZGI0NzFhYjQyMjdlNTk4NTQxMDUxZjcxNTQ3ZTFjYTU1NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&ctz=Europe/Madrid"
              scrolling="no"
              className="w-full h-[80vh] border-0 md:h-[60vh]"
              title="Calendario de Carreras"
            />
          </div>
          {/* sidebar for upcoming race info */}
          <aside className="w-full lg:w-[300px] flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Próxima Carrera</h2>
              {/* Placeholder for image or label */}
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-500">Imagen/Info aquí</span>
              </div>
              <p className="text-sm">
                Detalles de la próxima carrera, fecha, lugar, etc. Puedes
                reemplazar este texto y añadir una imagen o rótulo.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
