"use client";

import React, { useState, useEffect } from "react";
import { Adventure, parseAdventure } from "@rpg/engine";
import { GameScreen } from "@/components/game/GameScreen";
import { useSaveState } from "@/lib/useSaveState";

export default function PlayPage({ params }: { params: { slug: string } }) {
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { currentPageSlug, saveProgress, resetProgress, isLoaded } = useSaveState(params.slug);

  useEffect(() => {
    async function loadAdventure() {
      try {
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
  if (!adventure || !isLoaded) return <div className="p-10 text-stone-400">Carregando aventura...</div>;

  const currentPage = adventure.pages[currentPageSlug];

  if (!currentPage) {
    return (
      <div className="p-10">
        <p className="text-red-500">Erro: Página "{currentPageSlug}" não encontrada na aventura.</p>
        <button onClick={resetProgress} className="underline mt-4">
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
      onChoice={saveProgress}
      onReset={resetProgress}
      currentPageSlug={currentPageSlug}
    />
  );
}
