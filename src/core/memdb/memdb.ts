import { IMemoryDB } from '../models/Memory';
import { User } from '../models/User';
import { Track } from '../models/Track';
import { Artist } from '../models/Artist';
import { Album } from '../models/Album';
import { Favorites } from '../models/Favorites';
import { CreateUserDto } from '@/core/dto/user.dto';
import * as console from 'node:console';
import { CreateTrackDto } from '@/core/dto/track.dto';

export class Memory implements IMemoryDB {
  static #mem: Memory;
  private _users: User[] = [];
  private _tracks: Track[] = [];
  private _artists: Artist[] = [];
  private _albums: Album[] = [];
  private _favorites: Favorites[] = [];

  private constructor() {
    console.log('OMG EMPTY CONSTRUCTOR, WHAT TO DO?');
  }

  public static get instance(): Memory {
    if (!Memory.#mem) {
      Memory.#mem = new Memory();
    }

    return Memory.#mem;
  }

  getAlbums(): Album[] {
    return this._albums;
  }

  getArtists(): Artist[] {
    return this._artists;
  }

  getFavorites(): Favorites[] {
    return this._favorites;
  }

  getTracks(): Track[] {
    return this._tracks;
  }

  getUsers(): User[] {
    return this._users;
  }

  createUser(user: CreateUserDto): User {
    user['createdAt'] = Date.now();
    user['updatedAt'] = Date.now();
    this._users.push(user as User);
    return user as User;
  }

  getUserById(userId: string): User {
    return this._users.find((user: User) => user.id === userId);
  }

  updateUserById(userId: string, data: User): User {
    this._users = this._users.map((user: User) => {
      if (user.id === userId) {
        return {
          ...data,
          updatedAt: Date.now(),
          version: ++user.version,
        };
      } else return user;
    });
    return this._users.find((user: User) => user.id === userId);
  }

  deleteUserById(userId: string): void {
    this._users = this._users.filter((user: User) => user.id !== userId);
  }

  createTrack(track: CreateTrackDto): Track {
    this._tracks.push(track as Track);
    return track as Track;
  }

  deleteTrackById(trackId: string): void {
    this._tracks = this._tracks.filter((track: Track) => track.id !== trackId);
  }

  getTrackById(trackId: string): Track {
    return this._tracks.find((track: Track) => track.id === trackId);
  }

  updateTrackById(trackId: string, data: Track): Track {
    this._tracks = this._tracks.map((track: Track) => {
      if (track.id === trackId) {
        return {
          ...data,
        };
      } else return track;
    });
    return this.getTrackById(trackId);
  }
}

export const memoryInstance: Memory = Memory.instance;
