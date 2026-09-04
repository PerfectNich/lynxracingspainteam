import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { LanguageWrapper } from "./components/layout/LanguageWrapper";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useTranslation } from "react-i18next";

const RosterPage = lazy(() => import("./pages/RosterPage").then((module) => ({ default: module.RosterPage })));
const CalendarPage = lazy(() =>
  import("./pages/CalendarPage").then((module) => ({ default: module.CalendarPage })),
);
const ShopPage = lazy(() => import("./pages/ShopPage").then((module) => ({ default: module.ShopPage })));
const ContactPage = lazy(() =>
  import("./pages/ContactPage").then((module) => ({ default: module.ContactPage })),
);
const MediaPage = lazy(() => import("./pages/MediaPage").then((module) => ({ default: module.MediaPage })));
const PalmaresPage = lazy(() =>
  import("./pages/PalmaresPage").then((module) => ({ default: module.PalmaresPage })),
);

function RouteFallback() {
  const { t } = useTranslation();
  return (
    <div className="min-h-[40vh] px-6 py-16">
      <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-lynx-border bg-lynx-dark-card px-6 py-10 text-center">
        <p
          className="text-sm uppercase tracking-[0.3em] text-lynx-orange"
          style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
        >
          {t("interface.loading")}
        </p>
      </div>
    </div>
  );
}

function ResultsRedirect() {
  const location = useLocation();
  return <Navigate to={location.pathname.replace(/\/resultados$/, "/palmares")} replace />;
}

const pages = (
  <>
    <Route path="*" element={<NotFoundPage />} />
    <Route index element={<HomePage />} />
    <Route
      path="roster"
      element={
        <Suspense fallback={<RouteFallback />}>
          <RosterPage />
        </Suspense>
      }
    />
    <Route
      path="agenda"
      element={
        <Suspense fallback={<RouteFallback />}>
          <CalendarPage />
        </Suspense>
      }
    />
    <Route path="resultados" element={<ResultsRedirect />} />
    <Route
      path="palmares"
      element={
        <Suspense fallback={<RouteFallback />}>
          <PalmaresPage />
        </Suspense>
      }
    />
    <Route
      path="tienda"
      element={
        <Suspense fallback={<RouteFallback />}>
          <ShopPage />
        </Suspense>
      }
    />
    <Route
      path="contacto"
      element={
        <Suspense fallback={<RouteFallback />}>
          <ContactPage />
        </Suspense>
      }
    />
    <Route
      path="multimedia"
      element={
        <Suspense fallback={<RouteFallback />}>
          <MediaPage />
        </Suspense>
      }
    />
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
