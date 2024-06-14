import DetailArticlePage from "@/pages/DetailArticlePage";
import GlobalArticlePage from "@/pages/GlobalArticlePage";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";

export default function LoggedOutRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/articles" element={<GlobalArticlePage />} />
      <Route path="/articles/:id" element={<DetailArticlePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
