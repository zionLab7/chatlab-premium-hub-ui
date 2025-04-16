
"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Video, 
  FileText, 
  MessagesSquare, 
  Home, 
  Users,
  LogOut, 
  Settings,
  BarChart
} from "lucide-react";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

export function AdminSidebar() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const adminMenu: MenuItem[] = [
    {
      title: "Dashboard",
      icon: BarChart,
      path: "/admin",
    },
    {
      title: "Cursos",
      icon: BookOpen,
      path: "/admin/cursos",
    },
    {
      title: "Lives",
      icon: Video,
      path: "/admin/lives",
    },
    {
      title: "Materiais",
      icon: FileText,
      path: "/admin/materiais",
    },
    {
      title: "Construtor",
      icon: MessagesSquare,
      path: "/admin/construtor",
    },
    {
      title: "Usuários",
      icon: Users,
      path: "/admin/usuarios",
    },
    {
      title: "Configurações",
      icon: Settings,
      path: "/admin/configuracoes",
    },
  ];

  return (
    <Sidebar className="border-r-0 shadow-md bg-zinc-900 text-white">
      <SidebarHeader>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            CL
          </div>
          <span className="font-bold text-lg">Administração</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-zinc-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-400">Gerenciamento</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenu.map((item) => (
                <SidebarMenuItem
                  key={item.path}
                  active={currentPath === item.path}
                  className={currentPath === item.path ? "bg-zinc-800" : ""}
                >
                  <SidebarMenuButton 
                    asChild
                    className="hover:bg-zinc-800"
                  >
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="mr-2 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-zinc-900 border-t border-zinc-800">
        <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-zinc-800">
          <LogOut className="mr-2 h-5 w-5" />
          <span>Sair</span>
        </Button>
        <div className="mt-4 px-2 text-xs text-zinc-500 text-center">
          <p>Hub Chat Lab</p>
          <p>Painel de Administração</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
