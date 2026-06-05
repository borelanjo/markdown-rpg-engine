import matter from "gray-matter";
import { Adventure, AdventureSchema, Page, Choice } from "./types";

export function parseAdventure(markdown: string): Adventure {
  const { data: metadata, content: fullContent } = matter(markdown);

  const pages: Record<string, Page> = {};
  
  // Split content by sections starting with # slug
  // The regex looks for # followed by a slug name at the start of a line
  const sections = fullContent.split(/^#\s+/m).filter(Boolean);

  for (const section of sections) {
    const lines = section.split("\n");
    const slug = lines[0].trim();
    const body = lines.slice(1).join("\n").trim();

    const choices: Choice[] = [];
    
    // Extract choices in format [[Label|slug]]
    const choiceRegex = /\[\[(.*?)\|(.*?)\]\]/g;
    let match;
    let cleanContent = body;

    while ((match = choiceRegex.exec(body)) !== null) {
      choices.push({
        label: match[1].trim(),
        destination: match[2].trim(),
      });
      // Optionally remove choices from content if we want them handled separately by the UI
      cleanContent = cleanContent.replace(match[0], "");
    }

    pages[slug] = {
      slug,
      content: cleanContent.trim(),
      choices,
    };
  }

  const adventure = {
    metadata,
    pages,
  };

  return AdventureSchema.parse(adventure);
}
