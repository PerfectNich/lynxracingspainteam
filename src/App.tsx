import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { LanguageWrapper } from "./components/layout/LanguageWrapper";
import { HomePage } from "./pages/HomePage";
import { RosterPage } from "./pages/RosterPage";
import { CalendarPage } from "./pages/CalendarPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ShopPage } from "./pages/ShopPage";
import { ContactPage } from "./pages/ContactPage";
import { MediaPage } from "./pages/MediaPage";
import { PalmaresPage } from "./pages/PalmaresPage";

const pages = (
  <>
    <Route index element={<HomePage />} />
    <Route path="roster" element={<RosterPage />} />
    <Route path="agenda" element={<CalendarPage />} />
    <Route path="resultados" element={<ResultsPage />} />
    <Route path="palmares" element={<PalmaresPage />} />
    <Route path="tienda" element={<ShopPage />} />
    <Route path="contacto" element={<ContactPage />} />
    <Route path="multimedia" element={<MediaPage />} />
  </>
);

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<LanguageWrapper />}>
          <Route path="/" element={<Layout />}>
            {pages}
          </Route>
          <Route path="/en" element={<Layout />}>
            {pages}
          </Route>
          <Route path="/ca" element={<Layout />}>
            {pages}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
