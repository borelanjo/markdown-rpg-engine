import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GameScreen } from "../GameScreen";

describe("GameScreen", () => {
  const mockProps = {
    title: "Aventura Teste",
    content: "Você está em uma sala vazia.",
    choices: [
      { label: "Abrir a porta", destination: "sala-b" },
      { label: "Gritar por ajuda", destination: "gritar" },
    ],
    onChoice: vi.fn(),
  };

  it("deve renderizar o título e o conteúdo", () => {
    render(<GameScreen {...mockProps} />);
    expect(screen.getByText("Aventura Teste")).toBeInTheDocument();
    expect(screen.getByText("Você está em uma sala vazia.")).toBeInTheDocument();
  });

  it("deve renderizar os botões de escolha", () => {
    render(<GameScreen {...mockProps} />);
    expect(screen.getByText("Abrir a porta")).toBeInTheDocument();
    expect(screen.getByText("Gritar por ajuda")).toBeInTheDocument();
  });

  it("deve chamar onChoice quando um botão é clicado", () => {
    render(<GameScreen {...mockProps} />);
    fireEvent.click(screen.getByText("Abrir a porta"));
    expect(mockProps.onChoice).toHaveBeenCalledWith("sala-b");
  });

  it("deve mostrar botão de reiniciar quando não houver escolhas", () => {
    render(<GameScreen {...mockProps} choices={[]} />);
    expect(screen.getByText("A jornada termina aqui.")).toBeInTheDocument();
    expect(screen.getByText("Jogar novamente")).toBeInTheDocument();
  });
});
