import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { TopContact } from "./TopContact";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
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
