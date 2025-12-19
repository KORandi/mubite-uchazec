'use client';

import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { AlbumGridRow } from './AlbumGridRow';
import type { AlbumResponseDto } from '../types/album';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

interface VirtualizedGridProps {
  albums: AlbumResponseDto[];
  columns: number;
  itemWidth: number;
  itemHeight: number;
  listHeight: number;
  hasNextPage: boolean;
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: () => void;
}

export function VirtualizedGrid({
  albums,
  columns,
  itemWidth,
  itemHeight,
  listHeight,
  hasNextPage,
  isItemLoaded,
  loadMoreItems,
}: VirtualizedGridProps) {
  const itemCount = hasNextPage ? albums.length + 1 : albums.length;
  const rowCount = Math.ceil(itemCount / columns);
  const { listRef, currentScrollOffset, handleScroll } = useScrollRestoration(albums.length);

  return (
    <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
      {({ onItemsRendered, ref }) => (
        <List
          height={listHeight}
          itemCount={rowCount}
          itemSize={itemHeight}
          width="100%"
          onScroll={handleScroll}
          onItemsRendered={({
            visibleStartIndex,
            visibleStopIndex,
            overscanStartIndex,
            overscanStopIndex,
          }) => {
            const startIndex = visibleStartIndex * columns;
            const stopIndex = Math.min(visibleStopIndex * columns + columns - 1, itemCount - 1);
            onItemsRendered({
              visibleStartIndex: startIndex,
              visibleStopIndex: stopIndex,
              overscanStartIndex: overscanStartIndex * columns,
              overscanStopIndex: Math.min(overscanStopIndex * columns + columns - 1, itemCount - 1),
            });
          }}
          ref={(list) => {
            listRef.current = list;
            if (typeof ref === 'function') {
              ref(list);
            }
          }}
        >
          {({ index, style }) => (
            <AlbumGridRow
              index={index}
              style={style}
              albums={albums}
              columns={columns}
              itemWidth={itemWidth}
              isItemLoaded={isItemLoaded}
              scrollOffset={currentScrollOffset}
            />
          )}
        </List>
      )}
    </InfiniteLoader>
  );
}
