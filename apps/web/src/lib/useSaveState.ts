"use client";

import { useState, useEffect } from "react";

export function useSaveState(adventureSlug: string) {
  const [currentPageSlug, setCurrentPageSlug] = useState<string>("start");
  const [isLoaded, setIsLoaded] = useState(false);

  const STORAGE_KEY = `rpg_save_${adventureSlug}`;

  // Load state on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCurrentPageSlug(saved);
    }
    setIsLoaded(true);
  }, [STORAGE_KEY]);

  // Save state when it changes
  const saveProgress = (slug: string) => {
    setCurrentPageSlug(slug);
    localStorage.setItem(STORAGE_KEY, slug);
  };

  const resetProgress = () => {
    setCurrentPageSlug("start");
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    currentPageSlug,
    saveProgress,
    resetProgress,
    isLoaded
  };
}
