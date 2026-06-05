import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AdventureCard } from "../AdventureCard";

describe("AdventureCard", () => {
  const mockProps = {
    title: "O Castelo Assombrado",
    author: "Mestre do Medo",
    description: "Uma noite sombria em um castelo.",
    slug: "castelo-assombrado",
  };

  it("deve renderizar os detalhes da aventura", () => {
    render(<AdventureCard {...mockProps} />);
    expect(screen.getByText("O Castelo Assombrado")).toBeInTheDocument();
    expect(screen.getByText("Mestre do Medo")).toBeInTheDocument();
    expect(screen.getByText("Uma noite sombria em um castelo.")).toBeInTheDocument();
  });

  it("deve conter o link correto para jogar", () => {
    render(<AdventureCard {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/play/castelo-assombrado");
  });
});
