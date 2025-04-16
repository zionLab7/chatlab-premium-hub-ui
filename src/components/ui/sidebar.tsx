
import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Contexto para gerenciar o estado da sidebar
interface SidebarContextValue {
  expanded: boolean;
  toggleExpanded: () => void;
  setExpanded: (expanded: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  expanded: true,
  toggleExpanded: () => {},
  setExpanded: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

// Provedor do contexto da sidebar
interface SidebarProviderProps {
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function SidebarProvider({
  children,
  defaultExpanded = true,
}: SidebarProviderProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <SidebarContext.Provider
      value={{ expanded, toggleExpanded, setExpanded }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// Sidebar principal
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  const { expanded } = useSidebar();

  return (
    <aside
      className={cn(
        "group w-full h-full overflow-hidden bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
        expanded ? "md:w-64" : "md:w-16",
        "transition-all duration-300 ease-in-out",
        className
      )}
      data-expanded={expanded}
      {...props}
    >
      <div className="h-full w-full flex flex-col">
        {children}
      </div>
    </aside>
  );
}

// Conteúdo da sidebar
interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SidebarContent({
  className,
  children,
  ...props
}: SidebarContentProps) {
  return (
    <div
      className={cn("p-2 flex-1 overflow-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Rodapé da sidebar
interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SidebarFooter({
  className,
  children,
  ...props
}: SidebarFooterProps) {
  return (
    <div
      className={cn(
        "p-2 mt-auto border-t border-sidebar-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Cabeçalho da sidebar
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SidebarHeader({
  className,
  children,
  ...props
}: SidebarHeaderProps) {
  const { expanded } = useSidebar();

  return (
    <div
      className={cn(
        "p-4 flex items-center justify-between border-b border-sidebar-border h-16",
        className
      )}
      {...props}
    >
      {expanded && children ? (
        children
      ) : (
        <div className="flex items-center justify-center w-full">
          {!expanded && (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              CL
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Grupo de itens na sidebar
interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SidebarGroup({
  className,
  children,
  ...props
}: SidebarGroupProps) {
  return (
    <div
      className={cn("mb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Rótulo de grupo na sidebar
interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SidebarGroupLabel({
  className,
  children,
  ...props
}: SidebarGroupLabelProps) {
  const { expanded } = useSidebar();

  if (!expanded) {
    return null;
  }

  return (
    <div
      className={cn(
        "px-2 pt-4 pb-2 text-xs font-semibold text-sidebar-foreground/70 tracking-wider uppercase",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Conteúdo de grupo na sidebar
interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SidebarGroupContent({
  className,
  children,
  ...props
}: SidebarGroupContentProps) {
  return (
    <div
      className={cn("space-y-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Menu da sidebar
interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SidebarMenu({
  className,
  children,
  ...props
}: SidebarMenuProps) {
  return (
    <div
      className={cn("space-y-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Item de menu da sidebar
interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  active?: boolean;
}

export function SidebarMenuItem({
  className,
  children,
  active,
  ...props
}: SidebarMenuItemProps) {
  return (
    <div
      className={cn(
        "text-sidebar-foreground",
        active && "bg-sidebar-accent text-sidebar-accent-foreground",
        className
      )}
      data-active={active}
      {...props}
    >
      {children}
    </div>
  );
}

// Botão de menu da sidebar
interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  asChild?: boolean;
}

export function SidebarMenuButton({
  className,
  asChild,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { expanded } = useSidebar();
  const Comp = asChild ? React.Fragment : "button";
  
  return (
    <Comp
      className={cn(
        "group flex items-center gap-2 rounded-md px-3 py-2 w-full text-sm font-medium",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        expanded ? "justify-start" : "justify-center",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

// Botão para alternar o estado da sidebar
interface SidebarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function SidebarTrigger({
  className,
  children,
  ...props
}: SidebarTriggerProps) {
  const { expanded, toggleExpanded } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-9 w-9 p-0 rounded-full",
        className
      )}
      onClick={toggleExpanded}
      {...props}
    >
      {children || (expanded ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      ))}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
