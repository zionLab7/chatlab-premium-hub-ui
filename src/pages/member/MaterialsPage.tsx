
import React, { useState } from 'react';
import { MemberLayout } from "@/components/layouts/MemberLayout";
import { MaterialCard } from "@/components/dashboard/MaterialCard";
import { materials, categoriesMock } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filterMaterials = () => {
    let filtered = materials;
    
    if (selectedCategory) {
      filtered = filtered.filter(material => 
        material.category === selectedCategory
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(material => 
        material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const categories = categoriesMock.map(cat => cat.name);
  const filteredMaterials = filterMaterials();

  return (
    <MemberLayout>
      <div className="flex flex-col space-y-6 animate-fadeIn">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Materiais de Apoio</h1>
          <p className="text-muted-foreground">
            Acesse documentos, planilhas, PDFs e outros recursos exclusivos para membros
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar materiais..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {selectedCategory ? (
            <Button 
              variant="outline" 
              onClick={() => setSelectedCategory(null)}
              className="whitespace-nowrap"
            >
              Limpar filtro
            </Button>
          ) : (
            <div className="hidden md:block">
              <Filter className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm font-medium py-1">Categorias:</span>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {filteredMaterials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Nenhum material encontrado com os filtros atuais.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
            >
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <MaterialCard
                key={material.id}
                id={material.id}
                title={material.title}
                description={material.description}
                category={material.category}
                fileType={material.fileType}
                downloadUrl={material.downloadUrl}
              />
            ))}
          </div>
        )}
      </div>
    </MemberLayout>
  );
}
