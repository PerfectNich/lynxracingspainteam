import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { TopContact } from "./TopContact";
import { SeoManager } from "./SeoManager";

function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      requestAnimationFrame(scrollToHash);
      const fallback = window.setTimeout(scrollToHash, 150);

      return () => window.clearTimeout(fallback);
    }

    window.scrollTo(0, 0);
  }, [hash, pathname]);

  return null;
}

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <SeoManager />
      <Header />
      <TopContact />
      <main className="flex-1 pt-[60px]">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
