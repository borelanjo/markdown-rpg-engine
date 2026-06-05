# Markdown RPG Engine

Um motor de jogo de RPG estilo "livro-jogo" (aventura solo) onde as histórias são escritas em Markdown e jogadas em uma interface web moderna.

## 🚀 O Projeto

Este projeto permite que autores criem aventuras interativas de forma simples, utilizando apenas arquivos `.md`. O motor processa o conteúdo, identifica as escolhas do jogador e gerencia a navegação pela história.

### Inspirado em:
- Livros-jogos clássicos (Série Fighting Fantasy / Aventuras Fantásticas).
- RPGs de texto.
- Simplicidade do Markdown para criação de conteúdo.

## 🛠 Tecnologias

O projeto utiliza uma arquitetura de Monorepo para separar a lógica do motor da interface do usuário:

- **[Next.js 15](https://nextjs.org/)**: Framework React para o Frontend (App Router).
- **[Tailwind CSS](https://tailwindcss.com/)**: Estilização focada em legibilidade e design responsivo.
- **[Turborepo](https://turbo.build/)**: Gerenciamento eficiente do monorepo.
- **[Zod](https://zod.dev/)**: Validação de esquemas e tipos.
- **TypeScript**: Tipagem estática para maior segurança no desenvolvimento.

## 📂 Estrutura do Repositório

```text
markdown-rpg-engine/
├── apps/
│   └── web/            # Interface do jogador (Next.js)
├── packages/
│   └── engine/         # Lógica de parsing e regras de jogo (Pacote NPM interno)
├── adventures/         # Pasta onde as aventuras (.md) ficam armazenadas
└── package.json        # Configuração raiz do monorepo
```

## 🎮 Como Rodar

### Pré-requisitos
- Node.js 18 ou superior.
- NPM ou Yarn.

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/markdown-rpg-engine.git
   ```
2. Instale as dependências na raiz do projeto:
   ```bash
   npm install
   ```

### Desenvolvimento
Para rodar tanto o app web quanto o engine em modo de desenvolvimento:
```bash
npm run dev
```
O app estará disponível em `http://localhost:3000`.

## ✍️ Como Criar uma Aventura

As aventuras ficam na pasta `/adventures`. Cada aventura deve ter um arquivo `.md` seguindo o padrão:

```markdown
---
title: Minha Aventura
author: Nome do Autor
description: Uma breve descrição.
---

# start
O início da sua história.

[[Fazer escolha A|slug-da-pagina-a]]
[[Fazer escolha B|slug-da-pagina-b]]

# slug-da-pagina-a
Resultado da escolha A...
```

## 🗺 Roadmap de Desenvolvimento

- [x] Fase 1: Bootstrap & Estrutura do Monorepo.
- [ ] Fase 2: Motor de Parsing (Transformar MD em Jogo).
- [ ] Fase 3: Interface de Jogo Interativa.
- [ ] Fase 4: Listagem de Aventuras.
- [ ] Fase 5: Save State e Refinamentos.

---
Criado com ❤️ por Gemini CLI.
