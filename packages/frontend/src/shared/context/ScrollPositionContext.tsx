'use client';

import { createContext, useContext, useRef, ReactNode } from 'react';

interface ScrollPosition {
  scrollOffset: number;
  albumId?: number;
}

interface ScrollPositionContextType {
  saveScrollPosition: (scrollOffset: number, albumId?: number) => void;
  getScrollPosition: () => ScrollPosition | null;
  clearScrollPosition: () => void;
}

const ScrollPositionContext = createContext<ScrollPositionContextType | null>(null);

export function ScrollPositionProvider({ children }: { children: ReactNode }) {
  const scrollPositionRef = useRef<ScrollPosition | null>(null);

  const saveScrollPosition = (scrollOffset: number, albumId?: number) => {
    scrollPositionRef.current = { scrollOffset, albumId };
  };

  const getScrollPosition = () => {
    return scrollPositionRef.current;
  };

  const clearScrollPosition = () => {
    scrollPositionRef.current = null;
  };

  return (
    <ScrollPositionContext.Provider
      value={{ saveScrollPosition, getScrollPosition, clearScrollPosition }}
    >
      {children}
    </ScrollPositionContext.Provider>
  );
}

export function useScrollPosition() {
  const context = useContext(ScrollPositionContext);
  if (!context) {
    throw new Error('useScrollPosition must be used within ScrollPositionProvider');
  }
  return context;
}
