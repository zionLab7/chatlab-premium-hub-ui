
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Youtube } from "lucide-react";
import { useState } from "react";
import { Lesson } from "@/types/course";

interface LessonFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLesson: (lesson: Partial<Lesson>) => void;
}

export const LessonForm = ({ isOpen, onOpenChange, onAddLesson }: LessonFormProps) => {
  const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
    title: "",
    description: "",
    videoUrl: "",
    duration: ""
  });

  const handleSubmit = () => {
    onAddLesson(newLesson);
    setNewLesson({ title: "", description: "", videoUrl: "", duration: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Aula</DialogTitle>
          <DialogDescription>
            Crie uma nova aula para o módulo.
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>Adicionar Aula</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
