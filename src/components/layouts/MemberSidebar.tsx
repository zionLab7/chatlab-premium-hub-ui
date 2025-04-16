
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
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Video, 
  FileText, 
  MessagesSquare, 
  Home, 
  LifeBuoy, 
  LogOut, 
  Settings,
  User
} from "lucide-react";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

export function MemberSidebar() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const mainMenu: MenuItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      title: "Cursos",
      icon: BookOpen,
      path: "/cursos",
    },
    {
      title: "Lives",
      icon: Video,
      path: "/lives",
    },
    {
      title: "Materiais",
      icon: FileText,
      path: "/materiais",
    },
    {
      title: "Construtor",
      icon: MessagesSquare,
      path: "/construtor",
    },
  ];

  const userMenu: MenuItem[] = [
    {
      title: "Meu Perfil",
      icon: User,
      path: "/perfil",
    },
    {
      title: "Suporte",
      icon: LifeBuoy,
      path: "/suporte",
    },
    {
      title: "Configurações",
      icon: Settings,
      path: "/configuracoes",
    },
  ];

  return (
    <Sidebar className="border-r-0 shadow-md">
      <SidebarHeader>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            CL
          </div>
          <span className="font-bold text-lg">Hub Chat Lab</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenu.map((item) => (
                <SidebarMenuItem
                  key={item.path}
                  active={currentPath === item.path}
                >
                  <SidebarMenuButton asChild>
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
        
        <SidebarGroup>
          <SidebarGroupLabel>Sua Conta</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userMenu.map((item) => (
                <SidebarMenuItem
                  key={item.path}
                  active={currentPath === item.path}
                >
                  <SidebarMenuButton asChild>
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

      <SidebarFooter>
        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50">
          <LogOut className="mr-2 h-5 w-5" />
          <span>Sair</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
