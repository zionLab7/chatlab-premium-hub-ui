
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/member/Dashboard";
import CoursesPage from "./pages/member/CoursesPage";
import LivesPage from "./pages/member/LivesPage";
import MaterialsPage from "./pages/member/MaterialsPage";
import ProfilePage from "./pages/member/ProfilePage";
import SettingsPage from "./pages/member/SettingsPage";
import SupportPage from "./pages/member/SupportPage";
import LoginPage from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCoursesPage from "./pages/admin/AdminCoursesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rota de autenticação */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rota principal que redireciona para o login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Rotas da área de membros */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cursos" element={<CoursesPage />} />
          <Route path="/lives" element={<LivesPage />} />
          <Route path="/materiais" element={<MaterialsPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
          <Route path="/suporte" element={<SupportPage />} />
          
          {/* Rotas da área de administração */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/cursos" element={<AdminCoursesPage />} />
          <Route path="/admin/lives" element={<Navigate to="/admin/cursos" replace />} />
          <Route path="/admin/materiais" element={<Navigate to="/admin/cursos" replace />} />
          <Route path="/admin/construtor" element={<Navigate to="/admin/cursos" replace />} />
          <Route path="/admin/usuarios" element={<Navigate to="/admin/cursos" replace />} />
          <Route path="/admin/configuracoes" element={<Navigate to="/admin/cursos" replace />} />
          
          {/* Rota de fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
