import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';

import { memoryInstance } from '@/core/memdb/memdb';
import { Favorites } from '@/core/models/Favorites';

@Injectable()
export class FavoritesService {
  async getAllFavs(): Promise<Favorites> {
    try {
      return memoryInstance.getFavorites();
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addTrackToFavorite(@Param('id') id: string): Promise<void> {}

  async removeTrackFromFavorite(@Param('id') id: string): Promise<void> {}

  async addAlbumToFavorite(@Param('id') id: string): Promise<void> {}

  async removeAlbumFromFavorite(@Param('id') id: string): Promise<void> {}

  async addArtistToFavorite(@Param('id') id: string): Promise<void> {}

  async removeArtistFromFavorite(@Param('id') id: string): Promise<void> {}

  // async getAlbumById(id: string): Promise<Album> {
  //   const foundArtist: Promise<Album> = this.findAlbumById(id);
  //   return foundArtist;
  // }
  //
  // async createAlbum(artist: CreateAlbumDto): Promise<Album> {
  //   try {
  //     artist['id'] = uuidv4();
  //     const createdAlbum: Album = memoryInstance.createAlbum(artist as Album);
  //     return createdAlbum;
  //   } catch (error) {
  //     throw new HttpException(
  //       error.message || 'Unknown error',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
  //
  // async updateAlbum(id: string, artistToUpdate: CreateAlbumDto) {
  //   const artist: Album = await this.findAlbumById(id);
  //
  //   try {
  //     const updatedAlbum: Album = memoryInstance.updateAlbumById(id, {
  //       ...artist,
  //       ...artistToUpdate,
  //     } as Album);
  //     return updatedAlbum;
  //   } catch (error) {
  //     throw new HttpException(
  //       error.message || 'Unknown error',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
  //
  // async deleteAlbum(id: string): Promise<void> {
  //   await this.findAlbumById(id);
  //
  //   try {
  //     memoryInstance.deleteAlbumById(id);
  //   } catch (error) {
  //     throw new HttpException(
  //       error.message || 'Unknown error',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
  //
  // private async findAlbumById(id: string): Promise<Album> {
  //   let album: Album;
  //
  //   try {
  //     album = memoryInstance.getAlbumById(id);
  //   } catch (error) {
  //     throw new HttpException(
  //       error.message || 'Unknown error',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  //
  //   if (!album) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   return album;
  // }
}
