"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (collegeId: string) => void;
  removeFavorite: (collegeId: string) => void;
  isFavorite: (collegeId: string) => boolean;
  toggleFavorite: (collegeId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const save = (updated: string[]) => {
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const addFavorite = (collegeId: string) => {
    if (favorites.includes(collegeId)) return;
    save([...favorites, collegeId]);
  };

  const removeFavorite = (collegeId: string) => {
    save(favorites.filter((id) => id !== collegeId));
  };

  const isFavorite = (collegeId: string) => favorites.includes(collegeId);

  const toggleFavorite = (collegeId: string) => {
    isFavorite(collegeId) ? removeFavorite(collegeId) : addFavorite(collegeId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      toggleFavorite,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}