"use client";

import React, { useState, useEffect } from "react";
import { Adventure, parseAdventure } from "@rpg/engine";
import { GameScreen } from "@/components/game/GameScreen";

// Este componente simula o carregamento da aventura. 
// Na Fase 4, buscaremos os arquivos reais do sistema de arquivos/API.
export default function PlayPage({ params }: { params: { slug: string } }) {
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [currentPageSlug, setCurrentPageSlug] = useState("start");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAdventure() {
      try {
        // Mocking adventure data for Phase 3 integration testing
        // In a real scenario, we would fetch the .md file content here
        const response = await fetch('/api/adventure?slug=' + params.slug);
        const data = await response.json();
        
        if (data.markdown) {
            const parsed = parseAdventure(data.markdown);
            setAdventure(parsed);
        } else {
            setError("Aventura não encontrada.");
        }
      } catch (err) {
        setError("Erro ao carregar a aventura.");
      }
    }

    loadAdventure();
  }, [params.slug]);

  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!adventure) return <div className="p-10 text-stone-400">Carregando aventura...</div>;

  const currentPage = adventure.pages[currentPageSlug];

  if (!currentPage) {
    return (
      <div className="p-10">
        <p className="text-red-500">Erro: Página "{currentPageSlug}" não encontrada na aventura.</p>
        <button onClick={() => setCurrentPageSlug("start")} className="underline mt-4">
          Voltar ao início
        </button>
      </div>
    );
  }

  return (
    <GameScreen
      title={adventure.metadata.title}
      content={currentPage.content}
      choices={currentPage.choices}
      onChoice={(dest) => setCurrentPageSlug(dest)}
    />
  );
}
