import { describe, it, expect } from "vitest";
import { parseAdventure } from "../parser";

describe("parseAdventure", () => {
  const mockMarkdown = `---
title: Aventura Teste
author: Autor Teste
description: Descrição Teste
---

# start
Bem-vindo ao início.

[[Ir para o fim|fim]]

# fim
Este é o fim.
`;

  it("deve processar corretamente os metadados", () => {
    const adventure = parseAdventure(mockMarkdown);
    expect(adventure.metadata.title).toBe("Aventura Teste");
    expect(adventure.metadata.author).toBe("Autor Teste");
  });

  it("deve identificar as páginas corretamente", () => {
    const adventure = parseAdventure(mockMarkdown);
    expect(Object.keys(adventure.pages)).toContain("start");
    expect(Object.keys(adventure.pages)).toContain("fim");
  });

  it("deve extrair as escolhas corretamente", () => {
    const adventure = parseAdventure(mockMarkdown);
    const startPage = adventure.pages["start"];
    expect(startPage.choices).toHaveLength(1);
    expect(startPage.choices[0]).toEqual({
      label: "Ir para o fim",
      destination: "fim",
    });
  });

  it("deve remover a marcação de escolha do conteúdo da página", () => {
    const adventure = parseAdventure(mockMarkdown);
    const startPage = adventure.pages["start"];
    expect(startPage.content).not.toContain("[[");
    expect(startPage.content).toContain("Bem-vindo ao início.");
  });

  it("deve lançar erro se o markdown for inválido (Zod)", () => {
    const invalidMarkdown = `---
title: Aventura Sem Autor
---
# start
Olá.
`;
    expect(() => parseAdventure(invalidMarkdown)).toThrow();
  });
});
