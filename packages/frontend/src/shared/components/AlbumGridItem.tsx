import { AlbumCard } from './AlbumCard';
import type { AlbumResponseDto } from '../types/album';

interface AlbumGridItemProps {
  album: AlbumResponseDto;
  width: number;
  scrollOffset: number;
}

export function AlbumGridItem({ album, width, scrollOffset }: AlbumGridItemProps) {
  return (
    <div style={{ width: `${width}px` }} className="h-full">
      <AlbumCard album={album} scrollOffset={scrollOffset} />
    </div>
  );
}
