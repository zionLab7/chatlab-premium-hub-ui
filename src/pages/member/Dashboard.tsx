
import React from 'react';
import { MemberLayout } from "@/components/layouts/MemberLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { LiveCard } from "@/components/dashboard/LiveCard";
import { dashboardStats, courses, lives } from "@/data/mockData";
import { BookOpen, Video, FileText, BarChart, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const inProgressCourses = courses.filter(course => course.progress > 0 && course.progress < 100).slice(0, 3);
  const upcomingLives = lives.filter(live => !live.isPast).slice(0, 2);

  // Mapeamento dos ícones para os cards de estatísticas
  const getIconByName = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return BookOpen;
      case 'Video':
        return Video;
      case 'FileText':
        return FileText;
      case 'BarChart':
        return BarChart;
      default:
        return BookOpen;
    }
  };

  return (
    <MemberLayout>
      <div className="flex flex-col space-y-8 animate-fadeIn">
        {/* Cabeçalho */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao Hub Chat Lab</h1>
          <p className="text-muted-foreground">
            Explore cursos, veja lives exclusivas e acesse materiais especiais para membros.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((stat, index) => {
            const Icon = getIconByName(stat.icon);
            return (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={Icon}
                className="animate-scaleIn"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            );
          })}
        </div>

        {/* Cursos em Andamento */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Cursos em Andamento</h2>
            <Button variant="outline" asChild>
              <Link to="/cursos">Ver todos os cursos</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                image={course.image}
                progress={course.progress}
                totalModules={course.totalModules}
                totalLessons={course.totalLessons}
                category={course.category}
                duration={course.duration}
                className="animate-scaleIn"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Próximas Lives */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Próximas Lives</h2>
            <Button variant="outline" asChild>
              <Link to="/lives">Ver todas as lives</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingLives.map((live, index) => (
              <LiveCard
                key={live.id}
                id={live.id}
                title={live.title}
                thumbnail={live.thumbnail}
                date={live.date}
                time={live.time}
                isPast={live.isPast}
                externalLink={live.externalLink}
                className="animate-scaleIn"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Acesso Rápido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Acesso Rápido</h2>
          </div>
          
          <div className="bg-primary/10 rounded-lg p-6 flex flex-col items-center text-center hover:bg-primary/20 transition-colors">
            <FileText className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Materiais de Apoio</h3>
            <p className="text-muted-foreground mb-4">Acesse documentos, planilhas e PDFs exclusivos para aprimorar seus conhecimentos.</p>
            <Button asChild>
              <Link to="/materiais">Acessar Materiais</Link>
            </Button>
          </div>
          
          <div className="bg-secondary/20 rounded-lg p-6 flex flex-col items-center text-center hover:bg-secondary/30 transition-colors">
            <Video className="w-12 h-12 mb-4 text-accent" />
            <h3 className="text-xl font-semibold mb-2">Lives Gravadas</h3>
            <p className="text-muted-foreground mb-4">Assista às gravações das lives passadas com conteúdos exclusivos e dicas valiosas.</p>
            <Button variant="secondary" asChild>
              <Link to="/lives?tab=gravadas">Ver Gravações</Link>
            </Button>
          </div>
          
          <div className="bg-accent/10 rounded-lg p-6 flex flex-col items-center text-center hover:bg-accent/20 transition-colors">
            <MessagesSquare className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Construtor de Chatbots</h3>
            <p className="text-muted-foreground mb-4">Utilize nossa ferramenta avançada para criar chatbots inteligentes sem código.</p>
            <Button asChild>
              <Link to="/construtor">Acessar Construtor</Link>
            </Button>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
