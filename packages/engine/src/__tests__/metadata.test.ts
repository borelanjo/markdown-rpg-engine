import { describe, it, expect } from "vitest";
import { getAdventureMetadata } from "../metadata";

describe("getAdventureMetadata", () => {
  const mockMarkdown = `---
title: Aventura Incrível
author: Explorador
description: Uma jornada épica.
---
# start
Conteúdo ignorado pelo extrator de metadados.
`;

  it("deve extrair título, autor e descrição corretamente", () => {
    const metadata = getAdventureMetadata(mockMarkdown);
    expect(metadata.title).toBe("Aventura Incrível");
    expect(metadata.author).toBe("Explorador");
    expect(metadata.description).toBe("Uma jornada épica.");
  });

  it("deve funcionar mesmo sem descrição", () => {
    const simpleMarkdown = `---
title: Título
author: Autor
---
`;
    const metadata = getAdventureMetadata(simpleMarkdown);
    expect(metadata.title).toBe("Título");
    expect(metadata.author).toBe("Autor");
    expect(metadata.description).toBeUndefined();
  });
});
