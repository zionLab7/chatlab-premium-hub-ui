
import { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  FileSpreadsheet,
  FileDown,
  MoveUpRight,
  MoreVertical,
  X,
  ChevronDown,
  ChevronUp,
  Youtube
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Tipos para nossos cursos, módulos e aulas
interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  category: string;
  thumbnail: string;
  modules: Module[];
  students: number;
  status: "published" | "draft";
}

// Dados simulados
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
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
    thumbnail: "",
    modules: []
  });
  const [newModule, setNewModule] = useState({
    title: "",
    description: ""
  });
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    videoUrl: "",
    duration: ""
  });
  
  // Formulário para adicionar/editar cursos
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      instructor: "",
      category: "",
      thumbnail: "",
      status: "draft"
    }
  });

  const filteredCourses = courses.filter((course) => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = () => {
    // Simulação de adição de curso
    console.log("Adicionando curso:", newCourse);
    setNewCourse({
      title: "",
      description: "",
      instructor: "",
      category: "",
      thumbnail: "",
      modules: []
    });
    setIsAddDialogOpen(false);
    toast.success("Curso adicionado com sucesso!");
  };

  const handleEditCourse = () => {
    // Simulação de edição de curso
    console.log("Editando curso:", selectedCourse);
    setSelectedCourse(null);
    setIsEditDialogOpen(false);
    toast.success("Curso atualizado com sucesso!");
  };

  const handleDeleteCourse = (id: number) => {
    // Simulação de exclusão de curso
    console.log("Excluindo curso com ID:", id);
    toast.success("Curso excluído com sucesso!");
  };

  const handleAddModule = () => {
    if (!selectedCourse) return;
    
    console.log("Adicionando módulo:", newModule);
    
    // Simulação da adição de um novo módulo ao curso selecionado
    const newModuleObj: Module = {
      id: `m${Date.now()}`,
      title: newModule.title,
      description: newModule.description,
      lessons: [],
      order: selectedCourse.modules.length + 1
    };
    
    // Atualizar o curso selecionado com o novo módulo
    setSelectedCourse({
      ...selectedCourse,
      modules: [...selectedCourse.modules, newModuleObj]
    });
    
    // Limpar o formulário
    setNewModule({
      title: "",
      description: ""
    });
    
    setIsAddModuleDialogOpen(false);
    toast.success("Módulo adicionado com sucesso!");
  };

  const handleAddLesson = () => {
    if (!selectedCourse || !selectedModule) return;
    
    console.log("Adicionando aula:", newLesson);
    
    // Simulação da adição de uma nova aula ao módulo selecionado
    const newLessonObj: Lesson = {
      id: `l${Date.now()}`,
      title: newLesson.title,
      description: newLesson.description,
      videoUrl: newLesson.videoUrl,
      duration: newLesson.duration,
      order: selectedModule.lessons.length + 1
    };
    
    // Encontrar o índice do módulo selecionado
    const moduleIndex = selectedCourse.modules.findIndex(m => m.id === selectedModule.id);
    
    // Atualizar o módulo com a nova aula
    const updatedModules = [...selectedCourse.modules];
    updatedModules[moduleIndex] = {
      ...selectedModule,
      lessons: [...selectedModule.lessons, newLessonObj]
    };
    
    // Atualizar o curso selecionado com os módulos atualizados
    setSelectedCourse({
      ...selectedCourse,
      modules: updatedModules
    });
    
    // Atualizar também o módulo selecionado
    setSelectedModule({
      ...selectedModule,
      lessons: [...selectedModule.lessons, newLessonObj]
    });
    
    // Limpar o formulário
    setNewLesson({
      title: "",
      description: "",
      videoUrl: "",
      duration: ""
    });
    
    setIsAddLessonDialogOpen(false);
    toast.success("Aula adicionada com sucesso!");
  };

  const extractYoutubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Curso
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Curso</DialogTitle>
                  <DialogDescription>
                    Preencha as informações para criar um novo curso na plataforma.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                      placeholder="Nome do curso"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                      placeholder="Descrição detalhada do curso"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="instructor">Instrutor</Label>
                      <Input
                        id="instructor"
                        value={newCourse.instructor}
                        onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                        placeholder="Nome do instrutor"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select onValueChange={(value) => setNewCourse({...newCourse, category: value})}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Chatbots">Chatbots</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Atendimento">Atendimento</SelectItem>
                          <SelectItem value="Estratégia">Estratégia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Thumbnail</Label>
                    <Input 
                      type="text" 
                      placeholder="URL da imagem de thumbnail"
                      value={newCourse.thumbnail}
                      onChange={(e) => setNewCourse({...newCourse, thumbnail: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleAddCourse}>Adicionar Curso</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
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
                  <FileDown className="mr-2 h-4 w-4" />
                  Exportar como CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Relatório Excel gerado!")}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Exportar como Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Relatório PDF gerado!")}>
                  <FileDown className="mr-2 h-4 w-4" />
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
              
              <TabsContent value="all" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium">Curso</th>
                        <th className="text-left py-3 px-2 font-medium">Categoria</th>
                        <th className="text-left py-3 px-2 font-medium">Instrutor</th>
                        <th className="text-left py-3 px-2 font-medium">Alunos</th>
                        <th className="text-left py-3 px-2 font-medium">Status</th>
                        <th className="text-right py-3 px-2 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses.map((course) => (
                        <tr key={course.id} className="border-b">
                          <td className="py-3 px-2">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center overflow-hidden">
                                {course.thumbnail ? (
                                  <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full" />
                                ) : (
                                  <BookOpen className="h-5 w-5 text-gray-500" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{course.title}</div>
                                <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                  {course.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-2">{course.category}</td>
                          <td className="py-3 px-2">{course.instructor}</td>
                          <td className="py-3 px-2">{course.students}</td>
                          <td className="py-3 px-2">
                            {course.status === "published" ? (
                              <Badge variant="success">Publicado</Badge>
                            ) : (
                              <Badge variant="warning">Rascunho</Badge>
                            )}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Dialog open={isEditDialogOpen && selectedCourse?.id === course.id} onOpenChange={(open) => {
                                setIsEditDialogOpen(open);
                                if (!open) setSelectedCourse(null);
                              }}>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => setSelectedCourse(course)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Editar Curso</DialogTitle>
                                    <DialogDescription>
                                      Atualize as informações do curso, módulos e aulas.
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedCourse && (
                                    <div className="space-y-6">
                                      <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-title">Título</Label>
                                          <Input
                                            id="edit-title"
                                            value={selectedCourse.title}
                                            onChange={(e) => setSelectedCourse({...selectedCourse, title: e.target.value})}
                                          />
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-description">Descrição</Label>
                                          <Textarea
                                            id="edit-description"
                                            value={selectedCourse.description}
                                            onChange={(e) => setSelectedCourse({...selectedCourse, description: e.target.value})}
                                          />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div className="grid gap-2">
                                            <Label htmlFor="edit-instructor">Instrutor</Label>
                                            <Input
                                              id="edit-instructor"
                                              value={selectedCourse.instructor}
                                              onChange={(e) => setSelectedCourse({...selectedCourse, instructor: e.target.value})}
                                            />
                                          </div>
                                          <div className="grid gap-2">
                                            <Label htmlFor="edit-category">Categoria</Label>
                                            <Select 
                                              defaultValue={selectedCourse.category}
                                              onValueChange={(value) => setSelectedCourse({...selectedCourse, category: value})}
                                            >
                                              <SelectTrigger id="edit-category">
                                                <SelectValue placeholder="Selecione a categoria" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="Chatbots">Chatbots</SelectItem>
                                                <SelectItem value="Marketing">Marketing</SelectItem>
                                                <SelectItem value="Atendimento">Atendimento</SelectItem>
                                                <SelectItem value="Estratégia">Estratégia</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-thumbnail">Thumbnail</Label>
                                          <Input
                                            id="edit-thumbnail"
                                            type="text"
                                            placeholder="URL da imagem de thumbnail"
                                            value={selectedCourse.thumbnail || ""}
                                            onChange={(e) => setSelectedCourse({...selectedCourse, thumbnail: e.target.value})}
                                          />
                                          {selectedCourse.thumbnail && (
                                            <div className="mt-2 h-[150px] w-full max-w-[300px] rounded overflow-hidden">
                                              <img 
                                                src={selectedCourse.thumbnail} 
                                                alt={selectedCourse.title} 
                                                className="object-cover w-full h-full"
                                              />
                                            </div>
                                          )}
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-status">Status</Label>
                                          <Select 
                                            defaultValue={selectedCourse.status}
                                            onValueChange={(value) => setSelectedCourse({
                                              ...selectedCourse, 
                                              status: value as "published" | "draft"
                                            })}
                                          >
                                            <SelectTrigger id="edit-status">
                                              <SelectValue placeholder="Selecione o status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="published">Publicado</SelectItem>
                                              <SelectItem value="draft">Rascunho</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>

                                      <div className="border-t pt-4">
                                        <div className="flex items-center justify-between mb-4">
                                          <h3 className="text-lg font-medium">Módulos</h3>
                                          <Dialog open={isAddModuleDialogOpen} onOpenChange={setIsAddModuleDialogOpen}>
                                            <DialogTrigger asChild>
                                              <Button size="sm">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Adicionar Módulo
                                              </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[500px]">
                                              <DialogHeader>
                                                <DialogTitle>Adicionar Novo Módulo</DialogTitle>
                                                <DialogDescription>
                                                  Crie um novo módulo para o curso.
                                                </DialogDescription>
                                              </DialogHeader>
                                              <div className="grid gap-4 py-4">
                                                <div className="grid gap-2">
                                                  <Label htmlFor="module-title">Título do Módulo</Label>
                                                  <Input
                                                    id="module-title"
                                                    value={newModule.title}
                                                    onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                                                    placeholder="Ex: Introdução ao tema"
                                                  />
                                                </div>
                                                <div className="grid gap-2">
                                                  <Label htmlFor="module-description">Descrição</Label>
                                                  <Textarea
                                                    id="module-description"
                                                    value={newModule.description}
                                                    onChange={(e) => setNewModule({...newModule, description: e.target.value})}
                                                    placeholder="Descreva o que será abordado neste módulo"
                                                  />
                                                </div>
                                              </div>
                                              <DialogFooter>
                                                <Button variant="outline" onClick={() => setIsAddModuleDialogOpen(false)}>Cancelar</Button>
                                                <Button onClick={handleAddModule}>Adicionar Módulo</Button>
                                              </DialogFooter>
                                            </DialogContent>
                                          </Dialog>
                                        </div>

                                        {selectedCourse.modules.length === 0 ? (
                                          <div className="text-center p-4 bg-gray-50 rounded-md">
                                            <p className="text-gray-500">Nenhum módulo adicionado ainda.</p>
                                          </div>
                                        ) : (
                                          <Accordion type="single" collapsible className="w-full">
                                            {selectedCourse.modules.map((module, index) => (
                                              <AccordionItem key={module.id} value={module.id}>
                                                <AccordionTrigger className="hover:bg-gray-50 px-4">
                                                  <div className="flex items-center text-left">
                                                    <span className="font-medium">{index + 1}. {module.title}</span>
                                                  </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 space-y-4">
                                                  <div className="space-y-2">
                                                    <Label>Descrição</Label>
                                                    <Textarea
                                                      value={module.description}
                                                      onChange={(e) => {
                                                        const updatedModules = [...selectedCourse.modules];
                                                        updatedModules[index] = {
                                                          ...module,
                                                          description: e.target.value
                                                        };
                                                        setSelectedCourse({
                                                          ...selectedCourse,
                                                          modules: updatedModules
                                                        });
                                                      }}
                                                    />
                                                  </div>
                                                  
                                                  <div className="border-t pt-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                      <h4 className="font-medium">Aulas</h4>
                                                      <Dialog open={isAddLessonDialogOpen && selectedModule?.id === module.id} onOpenChange={(open) => {
                                                        setIsAddLessonDialogOpen(open);
                                                        if (open) setSelectedModule(module);
                                                        else setSelectedModule(null);
                                                      }}>
                                                        <DialogTrigger asChild>
                                                          <Button variant="outline" size="sm" onClick={() => setSelectedModule(module)}>
                                                            <Plus className="h-3 w-3 mr-2" />
                                                            Adicionar Aula
                                                          </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[550px]">
                                                          <DialogHeader>
                                                            <DialogTitle>Adicionar Nova Aula</DialogTitle>
                                                            <DialogDescription>
                                                              Crie uma nova aula para o módulo {module.title}.
                                                            </DialogDescription>
                                                          </DialogHeader>
                                                          <div className="grid gap-4 py-4">
                                                            <div className="grid gap-2">
                                                              <Label htmlFor="lesson-title">Título da Aula</Label>
                                                              <Input
                                                                id="lesson-title"
                                                                value={newLesson.title}
                                                                onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                                                                placeholder="Ex: Introdução ao conceito"
                                                              />
                                                            </div>
                                                            <div className="grid gap-2">
                                                              <Label htmlFor="lesson-description">Descrição</Label>
                                                              <Textarea
                                                                id="lesson-description"
                                                                value={newLesson.description}
                                                                onChange={(e) => setNewLesson({...newLesson, description: e.target.value})}
                                                                placeholder="Descreva o conteúdo desta aula"
                                                              />
                                                            </div>
                                                            <div className="grid gap-2">
                                                              <Label htmlFor="lesson-video" className="flex items-center gap-2">
                                                                <Youtube className="h-4 w-4" />
                                                                URL do Vídeo (YouTube)
                                                              </Label>
                                                              <Input
                                                                id="lesson-video"
                                                                value={newLesson.videoUrl}
                                                                onChange={(e) => setNewLesson({...newLesson, videoUrl: e.target.value})}
                                                                placeholder="Ex: https://www.youtube.com/watch?v=..."
                                                              />
                                                              <p className="text-xs text-muted-foreground">
                                                                Cole a URL completa do vídeo no YouTube.
                                                              </p>
                                                            </div>
                                                            <div className="grid gap-2">
                                                              <Label htmlFor="lesson-duration">Duração</Label>
                                                              <Input
                                                                id="lesson-duration"
                                                                value={newLesson.duration}
                                                                onChange={(e) => setNewLesson({...newLesson, duration: e.target.value})}
                                                                placeholder="Ex: 12:30"
                                                              />
                                                            </div>
                                                          </div>
                                                          <DialogFooter>
                                                            <Button variant="outline" onClick={() => setIsAddLessonDialogOpen(false)}>Cancelar</Button>
                                                            <Button onClick={handleAddLesson}>Adicionar Aula</Button>
                                                          </DialogFooter>
                                                        </DialogContent>
                                                      </Dialog>
                                                    </div>
                                                    
                                                    {module.lessons.length === 0 ? (
                                                      <div className="text-center p-3 bg-gray-50 rounded-md">
                                                        <p className="text-sm text-gray-500">Nenhuma aula adicionada ainda.</p>
                                                      </div>
                                                    ) : (
                                                      <div className="space-y-3">
                                                        {module.lessons.map((lesson, lessonIndex) => (
                                                          <div key={lesson.id} className="border rounded-md p-3 space-y-2">
                                                            <div className="flex items-center justify-between">
                                                              <h5 className="font-medium">{lessonIndex + 1}. {lesson.title}</h5>
                                                              <div className="flex space-x-1">
                                                                <Button variant="ghost" size="icon">
                                                                  <Edit className="h-4 w-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="icon">
                                                                  <Trash2 className="h-4 w-4 text-red-500" />
                                                                </Button>
                                                              </div>
                                                            </div>
                                                            <div className="text-sm text-gray-600">{lesson.description}</div>
                                                            <div className="flex items-center text-xs text-gray-500 space-x-3">
                                                              <span className="flex items-center gap-1">
                                                                <Youtube className="h-3 w-3" />
                                                                Vídeo: {lesson.videoUrl ? (
                                                                  <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                                    Ver
                                                                  </a>
                                                                ) : "Não definido"}
                                                              </span>
                                                              <span>Duração: {lesson.duration}</span>
                                                            </div>
                                                            {lesson.videoUrl && extractYoutubeVideoId(lesson.videoUrl) && (
                                                              <div className="mt-2 border rounded overflow-hidden aspect-video">
                                                                <iframe
                                                                  width="100%"
                                                                  height="100%"
                                                                  src={`https://www.youtube.com/embed/${extractYoutubeVideoId(lesson.videoUrl)}`}
                                                                  title={lesson.title}
                                                                  frameBorder="0"
                                                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                  allowFullScreen
                                                                ></iframe>
                                                              </div>
                                                            )}
                                                          </div>
                                                        ))}
                                                      </div>
                                                    )}
                                                  </div>
                                                </AccordionContent>
                                              </AccordionItem>
                                            ))}
                                          </Accordion>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter className="mt-6">
                                    <Button variant="outline" onClick={() => {
                                      setIsEditDialogOpen(false);
                                      setSelectedCourse(null);
                                    }}>Cancelar</Button>
                                    <Button onClick={handleEditCourse}>Salvar Alterações</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteCourse(course.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => toast.success("Visualizando curso")}>
                                    <MoveUpRight className="mr-2 h-4 w-4" />
                                    Visualizar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toast.success("Duplicando curso")}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Duplicar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteCourse(course.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="published" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium">Curso</th>
                        <th className="text-left py-3 px-2 font-medium">Categoria</th>
                        <th className="text-left py-3 px-2 font-medium">Instrutor</th>
                        <th className="text-left py-3 px-2 font-medium">Alunos</th>
                        <th className="text-right py-3 px-2 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses
                        .filter(course => course.status === "published")
                        .map((course) => (
                          <tr key={course.id} className="border-b">
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center overflow-hidden">
                                  {course.thumbnail ? (
                                    <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full" />
                                  ) : (
                                    <BookOpen className="h-5 w-5 text-gray-500" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium">{course.title}</div>
                                  <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                    {course.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-2">{course.category}</td>
                            <td className="py-3 px-2">{course.instructor}</td>
                            <td className="py-3 px-2">{course.students}</td>
                            <td className="py-3 px-2 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="draft" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium">Curso</th>
                        <th className="text-left py-3 px-2 font-medium">Categoria</th>
                        <th className="text-left py-3 px-2 font-medium">Instrutor</th>
                        <th className="text-left py-3 px-2 font-medium">Módulos</th>
                        <th className="text-right py-3 px-2 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses
                        .filter(course => course.status === "draft")
                        .map((course) => (
                          <tr key={course.id} className="border-b">
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center overflow-hidden">
                                  {course.thumbnail ? (
                                    <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full" />
                                  ) : (
                                    <BookOpen className="h-5 w-5 text-gray-500" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium">{course.title}</div>
                                  <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                    {course.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-2">{course.category}</td>
                            <td className="py-3 px-2">{course.instructor}</td>
                            <td className="py-3 px-2">{course.modules.length}</td>
                            <td className="py-3 px-2 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCoursesPage;
