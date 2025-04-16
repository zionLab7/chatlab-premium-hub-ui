
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Module } from "@/types/course";
import { useState } from "react";

interface ModuleFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddModule: (module: Partial<Module>) => void;
}

export const ModuleForm = ({ isOpen, onOpenChange, onAddModule }: ModuleFormProps) => {
  const [newModule, setNewModule] = useState<Partial<Module>>({
    title: "",
    description: ""
  });

  const handleSubmit = () => {
    onAddModule(newModule);
    setNewModule({ title: "", description: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>Adicionar Módulo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
