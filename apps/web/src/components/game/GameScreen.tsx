"use client";

import React from "react";
import { Choice } from "@rpg/engine";
import { cn } from "@/lib/utils";
import { ChevronRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GameScreenProps {
  title: string;
  content: string;
  choices: Choice[];
  onChoice: (destination: string) => void;
  onReset: () => void;
  currentPageSlug: string;
}

export function GameScreen({ title, content, choices, onChoice, onReset, currentPageSlug }: GameScreenProps) {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6 min-h-screen flex flex-col font-serif">
      <header className="mb-12 border-b border-stone-200 pb-6 flex justify-between items-center">
        <h1 className="text-stone-500 text-xs tracking-widest uppercase font-sans font-semibold">
          {title}
        </h1>
        <button 
          onClick={onReset}
          className="text-stone-400 hover:text-stone-800 transition-colors flex items-center gap-1 text-xs uppercase tracking-tighter"
          title="Reiniciar Aventura"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reiniciar</span>
        </button>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageSlug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="prose prose-stone prose-lg lg:prose-xl text-stone-800 leading-relaxed selection:bg-stone-200">
              {content.split("\n").map((paragraph, i) => (
                paragraph.trim() ? <p key={i} className="mb-6 first-letter:text-3xl first-letter:font-bold first-letter:mr-1">{paragraph}</p> : null
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="mt-16 space-y-4">
        {choices.length > 0 ? (
          <div className="grid gap-3">
            <h2 className="text-stone-400 text-xs uppercase tracking-widest mb-4 font-sans font-bold">
              Escolha seu destino
            </h2>
            {choices.map((choice, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => onChoice(choice.destination)}
                className={cn(
                  "flex items-center justify-between p-5 rounded-xl border-2 border-stone-100 bg-white",
                  "text-left text-stone-700 font-sans font-medium transition-all duration-300",
                  "hover:border-stone-800 hover:shadow-md active:scale-[0.98] group"
                )}
              >
                <span>{choice.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-stone-800 transform group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center py-12 border-t border-stone-100"
          >
            <p className="text-stone-400 italic mb-8 font-serif">A jornada termina aqui.</p>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-full font-sans font-bold hover:bg-stone-800 transition-colors shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              Jogar novamente
            </button>
          </motion.div>
        )}
      </footer>
    </div>
  );
}
