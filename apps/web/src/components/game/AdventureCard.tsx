import Link from "next/link";
import { BookOpen, User } from "lucide-react";

interface AdventureCardProps {
  title: string;
  author: string;
  description?: string;
  slug: string;
}

export function AdventureCard({ title, author, description, slug }: AdventureCardProps) {
  return (
    <Link 
      href={`/play/${slug}`}
      className="group block p-6 rounded-xl border-2 border-stone-200 bg-white transition-all duration-300 hover:border-stone-800 hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-stone-100 rounded-lg group-hover:bg-stone-800 group-hover:text-white transition-colors">
          <BookOpen className="w-6 h-6" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-stone-800">
        {title}
      </h3>
      
      <div className="flex items-center text-stone-500 text-sm mb-4">
        <User className="w-4 h-4 mr-1" />
        <span>{author}</span>
      </div>
      
      {description && (
        <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed">
          {description}
        </p>
      )}
      
      <div className="mt-6 flex items-center text-stone-800 font-semibold text-sm">
        <span>Começar aventura</span>
        <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}
