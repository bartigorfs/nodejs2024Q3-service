import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '@/core/dto/user.dto';
import { CreateTrackDto } from '@/core/dto/track.dto';
import { CreateArtistDto } from '@/core/dto/artist.dto';
import { CreateAlbumDto } from '@/core/dto/album.dto';
import { User } from '@/core/models/User';
import { Track } from '@/core/models/Track';
import { Artist } from '@/core/models/Artist';
import { Album } from '@/core/models/Album';
import { Favorites, FavoritesResponse } from '@/core/models/Favorites';

const prisma = new PrismaClient();

export class Memory {
  static #mem: Memory;

  private constructor() {
    console.log('eMpTy CoNsTruCtor!1!');
  }

  public static get instance(): Memory {
    if (!Memory.#mem) {
      Memory.#mem = new Memory();
    }
    return Memory.#mem;
  }

  async getUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async getTracks(): Promise<Track[]> {
    return prisma.track.findMany();
  }

  async getArtists(): Promise<Artist[]> {
    return prisma.artist.findMany();
  }

  async getAlbums(): Promise<Album[]> {
    return prisma.album.findMany();
  }

  async createUser(user: CreateUserDto) {
    return prisma.user.create({
      data: {
        ...user,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 1,
      },
    });
  }

  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async updateUserById(userId: string, data: Partial<CreateUserDto>) {
    return prisma.user.update({
      where: { id: userId },
      data: { ...data, updatedAt: Date.now() },
    });
  }

  async deleteUserById(userId: string) {
    return prisma.user.delete({
      where: { id: userId },
    });
  }

  async createTrack(track: CreateTrackDto) {
    return prisma.track.create({
      data: track,
    });
  }

  async getTrackById(trackId: string) {
    return prisma.track.findUnique({
      where: { id: trackId },
    });
  }

  async updateTrackById(trackId: string, data: Partial<CreateTrackDto>) {
    return prisma.track.update({
      where: { id: trackId },
      data,
    });
  }

  async deleteTrackById(trackId: string) {
    return prisma.track.delete({
      where: { id: trackId },
    });
  }

  async createArtist(artist: CreateArtistDto) {
    return prisma.artist.create({
      data: artist,
    });
  }

  async getArtistById(artistId: string) {
    return prisma.artist.findUnique({
      where: { id: artistId },
    });
  }

  async updateArtistById(artistId: string, data: Partial<CreateArtistDto>) {
    return prisma.artist.update({
      where: { id: artistId },
      data,
    });
  }

  async deleteArtistById(artistId: string) {
    return prisma.artist.delete({
      where: { id: artistId },
    });
  }

  async createAlbum(album: CreateAlbumDto) {
    return prisma.album.create({
      data: album,
    });
  }

  async getAlbumById(albumId: string) {
    return prisma.album.findUnique({
      where: { id: albumId },
    });
  }

  async updateAlbumById(albumId: string, data: Partial<CreateAlbumDto>) {
    return prisma.album.update({
      where: { id: albumId },
      data,
    });
  }

  async deleteAlbumById(albumId: string) {
    return prisma.album.delete({
      where: { id: albumId },
    });
  }

  async addTrackToFavorites(trackId: string) {
    const favorites = await prisma.favorites.update({
      where: { id: 'favoriteId' },
      data: {
        tracks: { push: trackId },
      },
    });

    return favorites;
  }

  async removeTrackFromFavorites(trackId: string) {
    const favorites = await prisma.favorites.update({
      where: { id: 'favoriteId' },
      data: {
        tracks: {
          set: await this.getUpdatedTracks(trackId),
        },
      },
    });

    return favorites;
  }

  private async getUpdatedTracks(trackId: string): Promise<string[]> {
    const favorites = await prisma.favorites.findUnique({
      where: { id: 'favoriteId' },
    });

    return favorites?.tracks.filter((id: string) => id !== trackId) || [];
  }

  async addAlbumToFavorites(albumId: string) {
    const favorites = await prisma.favorites.update({
      where: { id: 'favoriteId' },
      data: {
        albums: { push: albumId },
      },
    });

    return favorites;
  }

  async removeAlbumFromFavorites(albumId: string) {
    const favorites = await prisma.favorites.update({
      where: { id: 'favoriteId' },
      data: {
        albums: {
          set: await this.getUpdatedAlbums(albumId),
        },
      },
    });

    return favorites;
  }

  private async getUpdatedAlbums(albumId: string): Promise<string[]> {
    const favorites = await prisma.favorites.findUnique({
      where: { id: 'favoriteId' },
    });

    return favorites?.albums.filter((id: string) => id !== albumId) || [];
  }

  async addArtistToFavorites(artistId: string) {
    const favorites = await prisma.favorites.update({
      where: { id: 'favoriteId' },
      data: {
        artists: { push: artistId },
      },
    });

    return favorites;
  }

  async removeArtistFromFavorites(artistId: string) {
    const favorites = await prisma.favorites.update({
      where: { id: 'favoriteId' },
      data: {
        artists: {
          set: await this.getUpdatedArtists(artistId),
        },
      },
    });

    return favorites;
  }

  private async getUpdatedArtists(artistId: string): Promise<string[]> {
    const favorites = await prisma.favorites.findUnique({
      where: { id: 'favoriteId' },
    });

    return favorites?.artists.filter((id: string) => id !== artistId) || [];
  }

  async getFavorites(): Promise<FavoritesResponse> {
    const favorites = await prisma.favorites.findUnique({
      where: { id: 'favoriteId' },
      include: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        artists: true,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        albums: true,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tracks: true,
      },
    });

    const artists = await prisma.artist.findMany({
      where: { id: { in: favorites?.artists || [] } },
    });
    const albums = await prisma.album.findMany({
      where: { id: { in: favorites?.albums || [] } },
    });
    const tracks = await prisma.track.findMany({
      where: { id: { in: favorites?.tracks || [] } },
    });

    return { artists, albums, tracks };
  }
}

export const memoryInstance: Memory = Memory.instance;
