
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Course } from "@/types/course";

interface AddCourseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCourse: (course: Partial<Course>) => void;
}

export const AddCourseDialog = ({ isOpen, onOpenChange, onAddCourse }: AddCourseDialogProps) => {
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: "",
    description: "",
    instructor: "",
    category: "",
    thumbnail: "",
    modules: []
  });

  const handleAddCourse = () => {
    onAddCourse(newCourse);
    setNewCourse({
      title: "",
      description: "",
      instructor: "",
      category: "",
      thumbnail: "",
      modules: []
    });
    onOpenChange(false);
    toast.success("Curso adicionado com sucesso!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleAddCourse}>Adicionar Curso</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
