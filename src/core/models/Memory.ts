import { User } from './User';
import { Track } from './Track';
import { Artist } from './Artist';
import { Album } from './Album';
import { Favorites } from './Favorites';
import { CreateUserDto } from '@/core/dto/user.dto';
import { CreateTrackDto } from '@/core/dto/track.dto';
import { CreateArtistDto } from '@/core/dto/artist.dto';
import { CreateAlbumDto } from '@/core/dto/album.dto';

export interface IMemoryDB {
  // Users
  getUsers(): User[];
  createUser(user: CreateUserDto): User;
  getUserById(userId: string): User;
  updateUserById(userId: string, data: User): User;
  deleteUserById(userId: string): void;
  // Track
  getTracks(): Track[];
  createTrack(track: CreateTrackDto): Track;
  getTrackById(trackId: string): Track;
  updateTrackById(trackId: string, data: Track): Track;
  deleteTrackById(trackId: string): void;
  //Artists
  getArtists(): Artist[];
  createArtist(artist: CreateArtistDto): Artist;
  getArtistById(artistId: string): Artist;
  updateArtistById(artistId: string, data: Artist): Artist;
  deleteArtistById(artistId: string): void;
  //Albums
  getAlbums(): Album[];
  createAlbum(album: CreateAlbumDto): Album;
  getAlbumById(albumId: string): Album;
  updateAlbumById(albumId: string, data: Album): Album;
  deleteAlbumById(albumId: string): void;
  //Favorites
  getFavorites(): Favorites;
}
