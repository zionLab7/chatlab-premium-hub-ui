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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rota principal que redireciona para o dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Rotas da área de membros */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cursos" element={<CoursesPage />} />
          <Route path="/lives" element={<LivesPage />} />
          <Route path="/materiais" element={<MaterialsPage />} />
          
          {/* Rota de fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
