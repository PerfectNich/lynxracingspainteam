import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { TopContact } from "./TopContact";
import { SeoManager } from "./SeoManager";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
