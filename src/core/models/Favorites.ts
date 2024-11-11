import { Track } from '@/core/models/Track';
import { Album } from '@/core/models/Album';
import { Artist } from '@/core/models/Artist';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
