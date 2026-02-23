import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { RosterPage } from "./pages/RosterPage";
import { CalendarPage } from "./pages/CalendarPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ShopPage } from "./pages/ShopPage";
import { ContactPage } from "./pages/ContactPage";
import { MediaPage } from "./pages/MediaPage";
import { PalmaresPage } from "./pages/PalmaresPage";
import { PalmaresPageEN } from "./pages/en/PalmaresPage";
import { HomePageEN } from "./pages/en/HomePage";
import { RosterPageEN } from "./pages/en/RosterPage";
import { CalendarPageEN } from "./pages/en/CalendarPage";
import { ResultsPageEN } from "./pages/en/ResultsPage";
import { ShopPageEN } from "./pages/en/ShopPage";
import { ContactPageEN } from "./pages/en/ContactPage";
import { MediaPageEN } from "./pages/en/MediaPage";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* English routes */}
          <Route path="en" element={<Layout />}>
            <Route index element={<HomePageEN />} />
            <Route path="roster" element={<RosterPageEN />} />
            <Route path="agenda" element={<CalendarPageEN />} />
            <Route path="resultados" element={<ResultsPageEN />} />
            <Route path="palmares" element={<PalmaresPageEN />} />
            <Route path="tienda" element={<ShopPageEN />} />
            <Route path="contacto" element={<ContactPageEN />} />
            <Route path="multimedia" element={<MediaPageEN />} />
          </Route>
          <Route path="roster" element={<RosterPage />} />
          <Route path="agenda" element={<CalendarPage />} />
          <Route path="resultados" element={<ResultsPage />} />
          <Route path="palmares" element={<PalmaresPage />} />
          <Route path="tienda" element={<ShopPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="multimedia" element={<MediaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
