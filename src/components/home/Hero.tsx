export function Hero() {
  return (
    <header className="text-center py-6 md:py-12 px-5 mt-8 bg-gradient-to-r from-[#120000] to-[#1a0a00] border-b-[3px] border-lynx-orange">
      <img
        src="/logo.jpg"
        alt="Logo Lynx Racing"
        className="w-[180px] md:w-[300px] mx-auto mb-3 md:mb-5 drop-shadow-[0_0_12px_rgba(255,106,0,0.6)]"
        loading="lazy"
      />
      <p className="mt-2 md:mt-3 text-sm md:text-xl text-lynx-orange-light">
        Simracing para todos los niveles &middot; MultiSimulador &middot;
        Disfrutar y competir
      </p>
    </header>
  );
}
