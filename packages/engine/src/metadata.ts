import matter from "gray-matter";
import { AdventureSchema } from "./types";

/**
 * Extrai apenas os metadados de um Markdown de aventura.
 * Útil para listagem sem carregar todo o conteúdo.
 */
export function getAdventureMetadata(markdown: string) {
  const { data } = matter(markdown);
  
  // Usamos um subset do schema para validação
  const MetadataSchema = AdventureSchema.shape.metadata;
  return MetadataSchema.parse(data);
}
