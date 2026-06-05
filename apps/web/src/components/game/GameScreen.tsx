"use client";

import React from "react";
import { Choice } from "@rpg/engine";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface GameScreenProps {
  title: string;
  content: string;
  choices: Choice[];
  onChoice: (destination: string) => void;
}

export function GameScreen({ title, content, choices, onChoice }: GameScreenProps) {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6 min-h-screen flex flex-col">
      <header className="mb-12 border-b border-stone-200 pb-6">
        <h1 className="text-stone-500 text-sm tracking-widest uppercase font-semibold">
          {title}
        </h1>
      </header>

      <main className="flex-grow">
        <div className="prose prose-stone prose-lg lg:prose-xl text-stone-800 leading-relaxed">
          {content.split("\n").map((paragraph, i) => (
            paragraph.trim() ? <p key={i} className="mb-6">{paragraph}</p> : null
          ))}
        </div>
      </main>

      <footer className="mt-12 space-y-4">
        {choices.length > 0 ? (
          <div className="grid gap-3">
            <h2 className="text-stone-400 text-xs uppercase tracking-tighter mb-2 font-medium">
              O que você faz?
            </h2>
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => onChoice(choice.destination)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border-2 border-stone-200",
                  "text-left text-stone-700 font-medium transition-all duration-200",
                  "hover:border-stone-800 hover:bg-stone-50 group"
                )}
              >
                <span>{choice.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-800 transition-colors" />
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-stone-400 italic mb-6">A jornada termina aqui.</p>
            <button
              onClick={() => window.location.reload()}
              className="text-stone-800 font-bold underline underline-offset-4 hover:text-stone-600"
            >
              Jogar novamente
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}
