
import React, { useState } from 'react';
import { MemberLayout } from "@/components/layouts/MemberLayout";
import { LiveCard } from "@/components/dashboard/LiveCard";
import { lives } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

export default function LivesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const upcomingLives = lives.filter(live => !live.isPast);
  const pastLives = lives.filter(live => live.isPast);
  
  const filterLives = (livesList: typeof lives) => {
    if (!searchQuery) return livesList;
    return livesList.filter(live => 
      live.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <MemberLayout>
      <div className="flex flex-col space-y-6 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lives</h1>
            <p className="text-muted-foreground mt-1">
              Assista às lives ao vivo e gravações exclusivas do Hub Chat Lab
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar lives..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Próximas Lives</TabsTrigger>
            <TabsTrigger value="past">Lives Gravadas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            {filterLives(upcomingLives).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  {searchQuery ? 'Nenhuma live encontrada com sua busca.' : 'Não há lives agendadas no momento.'}
                </p>
                {searchQuery && (
                  <button className="text-primary hover:underline mt-2" onClick={() => setSearchQuery("")}>
                    Limpar busca
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterLives(upcomingLives).map((live) => (
                  <LiveCard
                    key={live.id}
                    id={live.id}
                    title={live.title}
                    thumbnail={live.thumbnail}
                    date={live.date}
                    time={live.time}
                    isPast={live.isPast}
                    externalLink={live.externalLink}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="mt-6">
            {filterLives(pastLives).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  {searchQuery ? 'Nenhuma gravação encontrada com sua busca.' : 'Não há gravações disponíveis no momento.'}
                </p>
                {searchQuery && (
                  <button className="text-primary hover:underline mt-2" onClick={() => setSearchQuery("")}>
                    Limpar busca
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterLives(pastLives).map((live) => (
                  <LiveCard
                    key={live.id}
                    id={live.id}
                    title={live.title}
                    thumbnail={live.thumbnail}
                    date={live.date}
                    time={live.time}
                    isPast={live.isPast}
                    externalLink={live.externalLink}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  );
}
