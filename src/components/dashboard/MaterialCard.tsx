
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileIcon } from "lucide-react";

interface MaterialCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: string; // 'pdf', 'doc', 'xls', etc.
  downloadUrl: string;
}

export function MaterialCard({
  id,
  title,
  description,
  category,
  fileType,
  downloadUrl,
}: MaterialCardProps) {
  const getIcon = () => {
    switch (fileType) {
      case 'pdf':
        return <FileIcon className="h-12 w-12 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileIcon className="h-12 w-12 text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <FileIcon className="h-12 w-12 text-green-500" />;
      case 'ppt':
      case 'pptx':
        return <FileIcon className="h-12 w-12 text-orange-500" />;
      default:
        return <FileIcon className="h-12 w-12 text-gray-500" />;
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <Badge className="mb-2" variant="secondary">
            {category}
          </Badge>
          <div className="text-xs uppercase bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {fileType}
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2 mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <div className="flex justify-center my-4">
          {getIcon()}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <a 
            href={downloadUrl} 
            download 
            className="flex items-center justify-center"
          >
            <Download className="mr-2 h-4 w-4" /> Baixar material
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
