import { IMemoryDB } from '../models/Memory';
import { User } from '../models/User';
import { Track } from '../models/Track';
import { Artist } from '../models/Artist';
import { Album } from '../models/Album';
import { Favorites } from '../models/Favorites';

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
}

export const memoryInstance: Memory = Memory.instance;
