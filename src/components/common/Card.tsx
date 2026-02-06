interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-lynx-dark-card border border-lynx-border rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-orange-glow ${className}`}
    >
      {children}
    </div>
  );
}
