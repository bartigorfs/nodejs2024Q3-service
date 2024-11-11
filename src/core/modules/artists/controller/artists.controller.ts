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
import { ArtistsService } from '../service/artists.service';
import { Response } from 'express';
import { Artist } from '@/core/models/Artist';
import { CreateArtistDto } from '@/core/dto/artists.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    const artists: Artist[] = await this.artistsService.getAllArtists();
    return artists;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artist> {
    const artist: Artist = await this.artistsService.getArtistById(id);
    return artist;
  }

  @Post()
  async createNewArtist(@Body() artist: CreateArtistDto): Promise<Artist> {
    const newArtist: Artist = await this.artistsService.createArtist(artist);
    return newArtist;
  }

  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() artist: CreateArtistDto,
  ): Promise<Artist> {
    const updatedArtist: Artist = await this.artistsService.updateArtist(
      id,
      artist,
    );
    return updatedArtist;
  }

  @Delete(':id')
  async deleteTrack(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.artistsService.deleteArtist(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
