import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { memoryInstance } from '@/core/memdb/memdb';
import { Album } from '@/core/models/Album';
import { CreateAlbumDto } from '@/core/dto/album.dto';

@Injectable()
export class AlbumsService {
  async getAllAlbums(): Promise<Album[]> {
    try {
      return memoryInstance.getAlbums();
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAlbumById(id: string): Promise<Album> {
    const foundArtist: Promise<Album> = this.findAlbumById(id);
    return foundArtist;
  }

  async createAlbum(artist: CreateAlbumDto): Promise<Album> {
    try {
      artist['id'] = uuidv4();
      return memoryInstance.createAlbum(artist as Album);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateAlbum(id: string, artistToUpdate: CreateAlbumDto) {
    const artist: Album = await this.findAlbumById(id);

    try {
      const updatedAlbum: Album = await memoryInstance.updateAlbumById(id, {
        ...artist,
        ...artistToUpdate,
      } as Album);
      return updatedAlbum;
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.findAlbumById(id);

    try {
      memoryInstance.deleteAlbumById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async seekAlbumById(id: string): Promise<Album> {
    try {
      return memoryInstance.getAlbumById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async findAlbumById(id: string): Promise<Album> {
    const album: Album = await this.seekAlbumById(id);

    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    return album;
  }
}
