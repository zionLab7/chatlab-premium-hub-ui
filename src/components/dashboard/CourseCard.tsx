
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
  totalModules: number;
  totalLessons: number;
  category: string;
  duration?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function CourseCard({
  id,
  title,
  description,
  image,
  progress,
  totalModules,
  totalLessons,
  category,
  duration,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {duration}
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="font-medium">
            {category}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(progress)}% concluído</span>
            <span>{totalModules} módulos • {totalLessons} aulas</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link to={`/cursos/${id}`} className="flex items-center justify-center">
            <Play className="mr-2 h-4 w-4" /> Continuar curso
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
