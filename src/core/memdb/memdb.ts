import { IMemoryDB } from '../models/Memory';
import { User } from '../models/User';
import { Track } from '../models/Track';
import { Artist } from '../models/Artist';
import { Album } from '../models/Album';
import { Favorites } from '../models/Favorites';
import { CreateUserDto } from '@/core/dto/user.dto';

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
}

export const memoryInstance: Memory = Memory.instance;
