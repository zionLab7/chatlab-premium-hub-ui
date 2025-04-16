
import React, { useState } from 'react';
import { MemberLayout } from "@/components/layouts/MemberLayout";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { courses } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const allCourses = courses;
  const inProgressCourses = courses.filter(course => course.progress > 0 && course.progress < 100);
  const completedCourses = courses.filter(course => course.progress === 100);
  const notStartedCourses = courses.filter(course => course.progress === 0);
  
  const filterCourses = (courseList: typeof courses) => {
    if (!searchQuery) return courseList;
    return courseList.filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <MemberLayout>
      <div className="flex flex-col space-y-6 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cursos</h1>
            <p className="text-muted-foreground mt-1">
              Explore todos os cursos disponíveis no Hub Chat Lab
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar cursos..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
            <TabsTrigger value="not-started">Não Iniciados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {filterCourses(allCourses).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Nenhum curso encontrado com sua busca.</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>Limpar busca</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterCourses(allCourses).map((course) => (
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
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="in-progress" className="mt-6">
            {filterCourses(inProgressCourses).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Nenhum curso em andamento encontrado.</p>
                {searchQuery ? (
                  <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>Limpar busca</Button>
                ) : (
                  <Button className="mt-4" asChild>
                    <a href="#all">Explorar cursos disponíveis</a>
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterCourses(inProgressCourses).map((course) => (
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
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            {filterCourses(completedCourses).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Você ainda não concluiu nenhum curso.</p>
                {searchQuery ? (
                  <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>Limpar busca</Button>
                ) : (
                  <Button className="mt-4" asChild>
                    <a href="#in-progress">Ver cursos em andamento</a>
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterCourses(completedCourses).map((course) => (
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
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="not-started" className="mt-6">
            {filterCourses(notStartedCourses).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Nenhum curso não iniciado encontrado.</p>
                {searchQuery ? (
                  <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>Limpar busca</Button>
                ) : (
                  <Button className="mt-4" asChild>
                    <a href="#all">Explorar cursos disponíveis</a>
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterCourses(notStartedCourses).map((course) => (
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
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  );
}
