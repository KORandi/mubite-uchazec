'use client';

import { AlbumResponseDto } from '../types/album';
import Link from 'next/link';
import { AvatarCircle } from './AvatarCircle';
import { Card } from './Card';
import { useScrollPosition } from '../context/ScrollPositionContext';

interface AlbumCardProps {
  album: AlbumResponseDto;
  scrollOffset?: number;
}

export function AlbumCard({ album, scrollOffset = 0 }: AlbumCardProps) {
  const { saveScrollPosition } = useScrollPosition();

  const handleClick = () => {
    saveScrollPosition(scrollOffset, album.id);
  };

  return (
    <Link href={`/albums/${album.id}`} onClick={handleClick}>
      <Card variant="interactive" className="h-full cursor-pointer">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <AvatarCircle id={album.id} size="small" />
          </div>
          <div className="grow">
            <h3 className="text-lg font-semibold text-white mb-2">{album.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>User {album.userId}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
