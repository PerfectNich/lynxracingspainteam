import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  const { ref, isVisible } = useIntersectionObserver(0.2);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id={id}
      className={`py-12 px-5 max-w-[1100px] mx-auto text-center transition-all duration-800 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </section>
  );
}
