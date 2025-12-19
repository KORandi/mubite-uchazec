'use client';

import { useEffect, useRef, useState } from 'react';
import type { FixedSizeList as List } from 'react-window';
import { useScrollPosition } from '../context/ScrollPositionContext';

export function useScrollRestoration(albumsLength: number) {
  const { getScrollPosition, clearScrollPosition } = useScrollPosition();
  const listRef = useRef<List>(null);
  const hasRestoredScroll = useRef(false);
  const [currentScrollOffset, setCurrentScrollOffset] = useState(0);

  useEffect(() => {
    if (!hasRestoredScroll.current && albumsLength > 0 && listRef.current) {
      const savedPosition = getScrollPosition();
      if (savedPosition && savedPosition.scrollOffset > 0) {
        listRef.current.scrollTo(savedPosition.scrollOffset);
        hasRestoredScroll.current = true;
        clearScrollPosition();
      }
    }
  }, [albumsLength, getScrollPosition, clearScrollPosition]);

  const handleScroll = ({ scrollOffset }: { scrollOffset: number }) => {
    setCurrentScrollOffset(scrollOffset);
  };

  return {
    listRef,
    currentScrollOffset,
    handleScroll,
  };
}
