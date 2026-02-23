interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <h2
      className={`text-white border-l-[5px] border-lynx-orange pl-4 mt-8 mb-8 text-3xl md:text-4xl text-center animate-glow ${className}`}
    >
      {children}
    </h2>
  );
}
