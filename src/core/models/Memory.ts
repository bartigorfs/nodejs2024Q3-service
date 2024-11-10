import { User } from './User';
import { Track } from './Track';
import { Artist } from './Artist';
import { Album } from './Album';
import { Favorites } from './Favorites';
import { CreateUserDto } from '@/core/dto/user.dto';

export interface IMemoryDB {
  getUsers(): User[];
  getTracks(): Track[];
  getArtists(): Artist[];
  getAlbums(): Album[];
  getFavorites(): Favorites[];
  createUser(user: CreateUserDto): User;
}
