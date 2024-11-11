import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { memoryInstance } from '@/core/memdb/memdb';
import { Artist } from '@/core/models/Artist';
import { CreateArtistDto } from '@/core/dto/artist.dto';

@Injectable()
export class ArtistsService {
  async getAllArtists(): Promise<Artist[]> {
    try {
      return memoryInstance.getArtists();
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getArtistById(id: string): Promise<Artist> {
    const foundArtist: Promise<Artist> = this.findArtistById(id);
    return foundArtist;
  }

  async createArtist(artist: CreateArtistDto): Promise<Artist> {
    try {
      artist['id'] = uuidv4();
      const createdArtist: Artist = memoryInstance.createArtist(
        artist as Artist,
      );
      return createdArtist;
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateArtist(id: string, artistToUpdate: CreateArtistDto) {
    const artist: Artist = await this.findArtistById(id);

    try {
      const updatedArtist: Artist = memoryInstance.updateArtistById(id, {
        ...artist,
        ...artistToUpdate,
      } as Artist);
      return updatedArtist;
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteArtist(id: string): Promise<void> {
    await this.findArtistById(id);

    try {
      memoryInstance.deleteArtistById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async seekArtistById(id: string): Promise<Artist> {
    try {
      return memoryInstance.getArtistById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async findArtistById(id: string): Promise<Artist> {
    const artist: Artist = await this.seekArtistById(id);

    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return artist;
  }
}
