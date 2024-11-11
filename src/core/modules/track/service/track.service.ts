import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto, TrackDto } from '@/core/dto/track.dto';
import { Track } from '@/core/models/Track';
import { memoryInstance } from '@/core/memdb/memdb';

@Injectable()
export class TrackService {
  async getAllTracks(): Promise<TrackDto[]> {
    try {
      const tracks: Track[] = memoryInstance.getTracks();
      return plainToInstance(TrackDto, tracks);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTrackById(id: string): Promise<Track> {
    const foundTrack: Promise<Track> = this.findTrackById(id);
    return foundTrack;
  }

  async createTrack(track: CreateTrackDto): Promise<TrackDto> {
    try {
      track['id'] = uuidv4();
      const createdTrack: Track = memoryInstance.createTrack(track);
      return plainToInstance(TrackDto, createdTrack);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateTrack(id: string, trackToUpdate: CreateTrackDto) {
    const track: Track = await this.findTrackById(id);

    try {
      const updatedTrack: Track = memoryInstance.updateTrackById(id, {
        ...track,
        ...trackToUpdate,
      });
      return plainToInstance(TrackDto, updatedTrack);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteTrack(id: string): Promise<void> {
    await this.findTrackById(id);

    try {
      memoryInstance.deleteTrackById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async seekTrackById(id: string): Promise<Track> {
    try {
      return memoryInstance.getTrackById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async findTrackById(id: string): Promise<Track> {
    const track: Track = await this.seekTrackById(id);

    if (!track)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    return track;
  }
}
