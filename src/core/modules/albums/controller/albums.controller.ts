import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AlbumsService } from '../service/albums.service';
import { Response } from 'express';
import { Album } from '@/core/models/Album';
import { CreateAlbumDto } from '@/core/dto/album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    const artists: Album[] = await this.albumsService.getAllAlbums();
    return artists;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    const artist: Album = await this.albumsService.getAlbumById(id);
    return artist;
  }

  @Post()
  async createNewArtist(@Body() artist: CreateAlbumDto): Promise<Album> {
    const newArtist: Album = await this.albumsService.createAlbum(artist);
    return newArtist;
  }

  @Put(':id')
  async updateAlbum(
    @Param('id') id: string,
    @Body() artist: CreateAlbumDto,
  ): Promise<Album> {
    const updatedArtist: Album = await this.albumsService.updateAlbum(
      id,
      artist,
    );
    return updatedArtist;
  }

  @Delete(':id')
  async deleteAlbum(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.albumsService.deleteAlbum(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
