import { PageHeader } from "../../components/common/PageHeader";
import { Section } from "../../components/common/Section";
import { SectionTitle } from "../../components/common/SectionTitle";

export function CalendarPageEN() {
  return (
    <>
      <PageHeader title="Dates" />

      <Section className="!max-w-[1400px]">
        <SectionTitle>Racing Calendar</SectionTitle>
        <div className="flex flex-col lg:flex-row justify-center gap-6">
          <div className="flex-1 shadow-orange-glow rounded-lg overflow-hidden transition-all duration-300 hover:shadow-orange-glow-hover hover:scale-[1.01]">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=MmU4M2UzNGQxYTZhMTE3NWU3NjRmZDhmMGFkY2JmZGI0NzFhYjQyMjdlNTk4NTQxMDUxZjcxNTQ3ZTFjYTU1NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&ctz=Europe/Madrid"
              scrolling="no"
              className="w-full h-[80vh] border-0 md:h-[60vh]"
              title="Racing Calendar"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
