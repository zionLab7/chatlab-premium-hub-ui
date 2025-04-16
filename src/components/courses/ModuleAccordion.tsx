
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Lock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
  videoUrl: string;
}

interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  progress: number;
}

interface ModuleAccordionProps {
  modules: Module[];
  currentModuleId?: string;
  currentLessonId?: string;
  courseId: string;
}

export function ModuleAccordion({
  modules,
  currentModuleId,
  currentLessonId,
  courseId,
}: ModuleAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={currentModuleId}
    >
      {modules.map((module) => (
        <AccordionItem key={module.id} value={module.id} className="border-b">
          <AccordionTrigger className="hover:bg-muted/30 px-4 py-2 [&[data-state=open]]:bg-muted/40">
            <div className="flex flex-col items-start w-full">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-medium text-left">{module.title}</h3>
                <Badge variant="secondary" className="ml-2">
                  {module.lessons.length} {module.lessons.length === 1 ? 'aula' : 'aulas'}
                </Badge>
              </div>
              <div className="w-full mt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{Math.round(module.progress)}% concluído</span>
                </div>
                <Progress value={module.progress} className="h-1" />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-1">
            <div className="space-y-1 px-1">
              {module.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/cursos/${courseId}/modulo/${module.id}/aula/${lesson.id}`}
                  className={cn(
                    "flex items-center justify-between py-2 px-4 rounded-md text-sm",
                    lesson.isLocked ? "opacity-60 pointer-events-none" : "hover:bg-muted/60",
                    currentLessonId === lesson.id && "bg-primary/10 font-medium"
                  )}
                >
                  <div className="flex items-center">
                    {lesson.isLocked ? (
                      <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                    ) : lesson.isCompleted ? (
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    ) : currentLessonId === lesson.id ? (
                      <PlayCircle className="h-4 w-4 mr-2 text-primary" />
                    ) : (
                      <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                    )}
                    <span>{lesson.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {lesson.duration}
                  </span>
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
