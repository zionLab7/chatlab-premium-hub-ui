
import { Course } from "@/types/course";
import { BookOpen, Edit, MoreVertical, MoveUpRight, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface CourseListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

export const CourseList = ({ courses, onEdit, onDelete }: CourseListProps) => {
  return (
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
          {courses.map((course) => (
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
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit(course)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDelete(course.id)}
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
                      <DropdownMenuItem className="text-red-500" onClick={() => onDelete(course.id)}>
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
  );
};
