import { AdventureCard } from "@/components/game/AdventureCard";
import { Book } from "lucide-react";

async function getAdventures() {
  // Chamada direta para a rota de API (Server-side)
  // No Next.js podemos chamar o fs direto no componente se for Server Component, 
  // mas vamos manter a lógica na API para consistência.
  const res = await fetch('http://localhost:3000/api/adventures', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const adventures = await getAdventures();

  return (
    <div className="min-h-screen bg-stone-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-block p-3 bg-stone-900 text-white rounded-2xl mb-6">
            <Book className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight sm:text-5xl mb-4">
            Markdown RPG Engine
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Escolha sua próxima aventura. Histórias interativas escritas em Markdown, 
            jogadas diretamente no seu navegador.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adventures.map((adventure: any) => (
            <AdventureCard 
              key={adventure.slug}
              title={adventure.title}
              author={adventure.author}
              description={adventure.description}
              slug={adventure.slug}
            />
          ))}
          
          {adventures.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-stone-200">
              <p className="text-stone-400">Nenhuma aventura encontrada na pasta /adventures.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
