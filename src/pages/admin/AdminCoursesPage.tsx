import { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileSpreadsheet, Filter, Plus, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { AddCourseDialog } from "@/components/admin/courses/AddCourseDialog";
import { ModuleForm } from "@/components/admin/courses/ModuleForm";
import { LessonForm } from "@/components/admin/courses/LessonForm";
import { CourseList } from "@/components/admin/courses/CourseList";
import { Course, Module, Lesson } from "@/types/course";

// Mock data
const courses: Course[] = [
  {
    id: 1,
    title: "Fundamentos de Chatbots",
    description: "Aprenda o básico sobre chatbots e como eles podem revolucionar seu negócio.",
    instructor: "Carlos Mendes",
    category: "Chatbots",
    thumbnail: "https://via.placeholder.com/300x200?text=Fundamentos+de+Chatbots",
    students: 324,
    modules: [
      {
        id: "m1",
        title: "Introdução aos Chatbots",
        description: "Neste módulo você conhecerá os princípios básicos dos chatbots.",
        order: 1,
        lessons: [
          {
            id: "l1",
            title: "O que são chatbots",
            description: "Uma visão geral sobre o que são chatbots e como funcionam.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "12:30",
            order: 1
          },
          {
            id: "l2",
            title: "História dos chatbots",
            description: "Como os chatbots evoluíram ao longo do tempo.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "15:45",
            order: 2
          }
        ]
      },
      {
        id: "m2",
        title: "Construindo seu primeiro chatbot",
        description: "Vamos criar um chatbot simples neste módulo.",
        order: 2,
        lessons: [
          {
            id: "l3",
            title: "Planejamento do chatbot",
            description: "Como planejar a estrutura do seu chatbot.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "18:20",
            order: 1
          }
        ]
      }
    ],
    status: "published"
  },
  {
    id: 2,
    title: "Marketing Digital Avançado",
    description: "Estratégias avançadas de marketing digital para impulsionar suas vendas.",
    instructor: "Ana Silva",
    category: "Marketing",
    thumbnail: "https://via.placeholder.com/300x200?text=Marketing+Digital",
    students: 215,
    modules: [
      {
        id: "m3",
        title: "SEO Avançado",
        description: "Técnicas avançadas de otimização para motores de busca.",
        order: 1,
        lessons: [
          {
            id: "l4",
            title: "Fundamentos de SEO",
            description: "Os princípios fundamentais do SEO moderno.",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            duration: "22:15",
            order: 1
          }
        ]
      }
    ],
    status: "published"
  },
  {
    id: 3,
    title: "Atendimento via WhatsApp",
    description: "Como estruturar um atendimento eficiente usando o WhatsApp Business.",
    instructor: "Roberto Alves",
    category: "Atendimento",
    thumbnail: "https://via.placeholder.com/300x200?text=Atendimento+WhatsApp",
    students: 189,
    modules: [],
    status: "published"
  },
  {
    id: 4,
    title: "Estratégias de Vendas com IA",
    description: "Use inteligência artificial para potencializar sua estratégia de vendas.",
    instructor: "Patricia Costa",
    category: "Estratégia",
    thumbnail: "https://via.placeholder.com/300x200?text=Vendas+com+IA",
    students: 156,
    modules: [],
    status: "draft"
  },
  {
    id: 5,
    title: "Automação de Marketing",
    description: "Ferramentas e técnicas para automatizar seus processos de marketing.",
    instructor: "Ricardo Sousa",
    category: "Marketing",
    thumbnail: "https://via.placeholder.com/300x200?text=Automação+de+Marketing",
    students: 0,
    modules: [],
    status: "draft"
  }
];

const AdminCoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);
  const [isAddLessonDialogOpen, setIsAddLessonDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const filteredCourses = courses.filter((course) => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = (newCourse: Partial<Course>) => {
    console.log("Adicionando curso:", newCourse);
    toast.success("Curso adicionado com sucesso!");
    setIsAddDialogOpen(false);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsEditDialogOpen(true);
  };

  const handleDeleteCourse = (id: number) => {
    console.log("Excluindo curso com ID:", id);
    toast.success("Curso excluído com sucesso!");
  };

  const handleAddModule = (moduleData: Partial<Module>) => {
    if (!selectedCourse) return;
    
    const newModule: Module = {
      id: `m${Date.now()}`,
      title: moduleData.title || "",
      description: moduleData.description || "",
      lessons: [],
      order: selectedCourse.modules.length + 1
    };
    
    setSelectedCourse({
      ...selectedCourse,
      modules: [...selectedCourse.modules, newModule]
    });
    
    toast.success("Módulo adicionado com sucesso!");
    setIsAddModuleDialogOpen(false);
  };

  const handleAddLesson = (lessonData: Partial<Lesson>) => {
    if (!selectedCourse || !selectedModule) return;
    
    const newLesson: Lesson = {
      id: `l${Date.now()}`,
      title: lessonData.title || "",
      description: lessonData.description || "",
      videoUrl: lessonData.videoUrl || "",
      duration: lessonData.duration || "",
      order: selectedModule.lessons.length + 1
    };
    
    const moduleIndex = selectedCourse.modules.findIndex(m => m.id === selectedModule.id);
    const updatedModules = [...selectedCourse.modules];
    updatedModules[moduleIndex] = {
      ...selectedModule,
      lessons: [...selectedModule.lessons, newLesson]
    };
    
    setSelectedCourse({
      ...selectedCourse,
      modules: updatedModules
    });
    
    setSelectedModule({
      ...selectedModule,
      lessons: [...selectedModule.lessons, newLesson]
    });
    
    toast.success("Aula adicionada com sucesso!");
    setIsAddLessonDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Gerenciamento de Cursos</h1>
            <p className="text-muted-foreground">
              Adicione, edite e organize os cursos da plataforma.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Curso
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Escolha o formato</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("Relatório CSV gerado!")}>
                  Exportar como CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Relatório Excel gerado!")}>
                  Exportar como Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Relatório PDF gerado!")}>
                  Exportar como PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar cursos..."
                  className="w-full md:w-[300px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="published">Publicados</TabsTrigger>
                <TabsTrigger value="draft">Rascunhos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <CourseList 
                  courses={filteredCourses}
                  onEdit={handleEditCourse}
                  onDelete={handleDeleteCourse}
                />
              </TabsContent>
              
              <TabsContent value="published">
                <CourseList 
                  courses={filteredCourses.filter(course => course.status === "published")}
                  onEdit={handleEditCourse}
                  onDelete={handleDeleteCourse}
                />
              </TabsContent>
              
              <TabsContent value="draft">
                <CourseList 
                  courses={filteredCourses.filter(course => course.status === "draft")}
                  onEdit={handleEditCourse}
                  onDelete={handleDeleteCourse}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <AddCourseDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddCourse={handleAddCourse}
      />

      <ModuleForm
        isOpen={isAddModuleDialogOpen}
        onOpenChange={setIsAddModuleDialogOpen}
        onAddModule={handleAddModule}
      />

      <LessonForm
        isOpen={isAddLessonDialogOpen}
        onOpenChange={setIsAddLessonDialogOpen}
        onAddLesson={handleAddLesson}
      />
    </AdminLayout>
  );
};

export default AdminCoursesPage;
