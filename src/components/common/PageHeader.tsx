interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="text-center py-18 px-5 mt-8 bg-gradient-to-r from-[#120000] to-[#1a0a00] border-b-[3px] border-lynx-orange">
      <h1 className="text-lynx-orange text-3xl md:text-5xl tracking-wider m-0">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-lg text-lynx-orange-light">{subtitle}</p>
      )}
    </header>
  );
}
