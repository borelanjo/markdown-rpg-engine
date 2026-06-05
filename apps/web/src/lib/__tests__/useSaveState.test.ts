import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useSaveState } from "../useSaveState";

describe("useSaveState", () => {
  const SLUG = "teste-aventura";
  const STORAGE_KEY = `rpg_save_${SLUG}`;

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("deve iniciar com 'start' se não houver nada salvo", () => {
    const { result } = renderHook(() => useSaveState(SLUG));
    expect(result.current.currentPageSlug).toBe("start");
  });

  it("deve carregar o estado salvo do localStorage", () => {
    localStorage.setItem(STORAGE_KEY, "pagina-salva");
    const { result } = renderHook(() => useSaveState(SLUG));
    
    // O useEffect roda após o render inicial
    expect(result.current.currentPageSlug).toBe("pagina-salva");
  });

  it("deve salvar o progresso no localStorage", () => {
    const { result } = renderHook(() => useSaveState(SLUG));
    
    act(() => {
      result.current.saveProgress("proxima-pagina");
    });

    expect(result.current.currentPageSlug).toBe("proxima-pagina");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("proxima-pagina");
  });

  it("deve resetar o progresso", () => {
    localStorage.setItem(STORAGE_KEY, "pagina-salva");
    const { result } = renderHook(() => useSaveState(SLUG));
    
    act(() => {
      result.current.resetProgress();
    });

    expect(result.current.currentPageSlug).toBe("start");
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
