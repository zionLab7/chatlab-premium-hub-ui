
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MemberSidebar } from "@/components/layouts/MemberSidebar";
import { ReactNode } from "react";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MemberLayoutProps {
  children: ReactNode;
}

export function MemberLayout({ children }: MemberLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <MemberSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="h-16 border-b flex items-center justify-between px-4 bg-white">
            <div className="flex items-center">
              <SidebarTrigger className="mr-2" />
              <h1 className="text-lg font-medium text-gray-700 hidden md:block">Hub Chat Lab</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Usuário" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-zinc-50 p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
