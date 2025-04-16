
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
  MoreVertical
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

const courses = [
  {
    id: 1,
    title: "Fundamentos de Chatbots",
    description: "Aprenda o básico sobre chatbots e como eles podem revolucionar seu negócio.",
    instructor: "Carlos Mendes",
    category: "Chatbots",
    students: 324,
    modules: 8,
    status: "published"
  },
  {
    id: 2,
    title: "Marketing Digital Avançado",
    description: "Estratégias avançadas de marketing digital para impulsionar suas vendas.",
    instructor: "Ana Silva",
    category: "Marketing",
    students: 215,
    modules: 12,
    status: "published"
  },
  {
    id: 3,
    title: "Atendimento via WhatsApp",
    description: "Como estruturar um atendimento eficiente usando o WhatsApp Business.",
    instructor: "Roberto Alves",
    category: "Atendimento",
    students: 189,
    modules: 6,
    status: "published"
  },
  {
    id: 4,
    title: "Estratégias de Vendas com IA",
    description: "Use inteligência artificial para potencializar sua estratégia de vendas.",
    instructor: "Patricia Costa",
    category: "Estratégia",
    students: 156,
    modules: 10,
    status: "draft"
  },
  {
    id: 5,
    title: "Automação de Marketing",
    description: "Ferramentas e técnicas para automatizar seus processos de marketing.",
    instructor: "Ricardo Sousa",
    category: "Marketing",
    students: 0,
    modules: 9,
    status: "draft"
  }
];

const AdminCoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
    modules: []
  });
  
  const filteredCourses = courses.filter((course) => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = () => {
    // Simulate adding a course
    console.log("Adding course:", newCourse);
    setNewCourse({
      title: "",
      description: "",
      instructor: "",
      category: "",
      modules: []
    });
    setIsAddDialogOpen(false);
    toast.success("Curso adicionado com sucesso!");
  };

  const handleEditCourse = () => {
    // Simulate editing a course
    console.log("Editing course:", selectedCourse);
    setSelectedCourse(null);
    setIsEditDialogOpen(false);
    toast.success("Curso atualizado com sucesso!");
  };

  const handleDeleteCourse = (id: number) => {
    // Simulate deleting a course
    console.log("Deleting course with ID:", id);
    toast.success("Curso excluído com sucesso!");
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
                      placeholder="Descrição do curso"
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
                    <Input type="file" />
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
                              <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-gray-500" />
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
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>Editar Curso</DialogTitle>
                                    <DialogDescription>
                                      Atualize as informações do curso.
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedCourse && (
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
                                        <Label htmlFor="edit-status">Status</Label>
                                        <Select 
                                          defaultValue={selectedCourse.status}
                                          onValueChange={(value) => setSelectedCourse({...selectedCourse, status: value})}
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
                                  )}
                                  <DialogFooter>
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
                                <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                                  <BookOpen className="h-5 w-5 text-gray-500" />
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
                                <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                                  <BookOpen className="h-5 w-5 text-gray-500" />
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
                            <td className="py-3 px-2">{course.modules}</td>
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
