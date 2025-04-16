
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveCardProps {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  time: string;
  isPast: boolean;
  externalLink: string;
  className?: string;
  style?: React.CSSProperties;
}

export function LiveCard({
  id,
  title,
  thumbnail,
  date,
  time,
  isPast,
  externalLink,
}: LiveCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <Badge 
            variant={isPast ? "secondary" : "default"} 
            className="font-medium"
          >
            {isPast ? "Gravação" : "Ao vivo"}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <div className="flex flex-col space-y-2 mt-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{date}</span>
          </div>
          {!isPast && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              <span>{time}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          asChild 
          variant={isPast ? "secondary" : "default"}
          className={cn(
            "w-full",
            isPast ? "bg-secondary hover:bg-secondary/90" : ""
          )}
        >
          <a 
            href={externalLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            {isPast ? "Assistir gravação" : "Participar da live"}
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
