import AddArticlePage from "@/pages/AddArticlePage";
import ArticlePage from "@/pages/ArticlePage";
import { DashboardPage } from "@/pages/DashboardPage";
import EditArticlePage from "@/pages/EditArticlePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";

export default function LoggedInRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/articles" element={<ArticlePage />} />
      <Route path="/articles/:id" element={<EditArticlePage />} />
      <Route path="/articles/new" element={<AddArticlePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
