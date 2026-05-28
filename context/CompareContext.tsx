"use client";

import React, { createContext, useContext, useState } from "react";

interface College {
  id: string;
  name: string;
  location: string;
  rank?: number;
  fees?: number;
  placement?: string;
  rating?: number;
  images: string[];
  slug: string;
  stream?: string;
}

interface CompareContextType {
  compareList: College[];
  addToCompare: (college: College) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<College[]>([]);

  const addToCompare = (college: College) => {
    if (compareList.length >= 3) return;
    if (compareList.find((c) => c.id === college.id)) return;
    setCompareList([...compareList, college]);
  };

  const removeFromCompare = (id: string) => {
    setCompareList(compareList.filter((c) => c.id !== id));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (id: string) => !!compareList.find((c) => c.id === id);

  return (
    <CompareContext.Provider value={{
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
      isFull: compareList.length >= 3,
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}