import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';

import { memoryInstance } from '@/core/memdb/memdb';
import { FavoritesResponse } from '@/core/models/Favorites';

@Injectable()
export class FavoritesService {
  async getAllFavs(): Promise<FavoritesResponse> {
    try {
      return memoryInstance.getFavorites();
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addTrackToFavorite(@Param('id') id: string): Promise<void> {
    try {
      await memoryInstance.addTrackToFavorites(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeTrackFromFavorite(@Param('id') id: string): Promise<void> {
    try {
      await memoryInstance.removeTrackFromFavorites(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addAlbumToFavorite(@Param('id') id: string): Promise<void> {
    try {
      await memoryInstance.addAlbumToFavorites(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeAlbumFromFavorite(@Param('id') id: string): Promise<void> {
    try {
      await memoryInstance.removeAlbumFromFavorites(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addArtistToFavorite(@Param('id') id: string): Promise<void> {
    try {
      await memoryInstance.addArtistToFavorites(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeArtistFromFavorite(@Param('id') id: string): Promise<void> {
    try {
      await memoryInstance.removeArtistFromFavorites(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
