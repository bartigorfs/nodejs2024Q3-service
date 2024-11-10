import { User } from './User';
import { Track } from './Track';
import { Artist } from './Artist';
import { Album } from './Album';
import { Favorites } from './Favorites';

export interface IMemoryDB {
  getUsers(): User[];
  getTracks(): Track[];
  getArtists(): Artist[];
  getAlbums(): Album[];
  getFavorites(): Favorites[];
}
