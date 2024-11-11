import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { FavoritesService } from '../service/favorites.service';
import { Favorites } from '@/core/models/Favorites';
import { Response } from 'express';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async findAll(): Promise<Favorites> {
    const favs: Favorites = await this.favoritesService.getAllFavs();
    return favs;
  }

  @Post('track/:id')
  async addTrackToFavorite(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.favoritesService.addTrackToFavorite(id);
    res.status(HttpStatus.CREATED).send();
  }

  @Delete('track/:id')
  async removeTrackFromFavorite(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.favoritesService.addTrackToFavorite(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post('album/:id')
  async addAlbumToFavorite(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.favoritesService.addAlbumToFavorite(id);
    res.status(HttpStatus.CREATED).send();
  }

  @Delete('album/:id')
  async removeAlbumFromFavorite(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.favoritesService.removeAlbumFromFavorite(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post('artist/:id')
  async addArtistToFavorite(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.favoritesService.addArtistToFavorite(id);
    res.status(HttpStatus.CREATED).send();
  }

  @Delete('artist/:id')
  async removeArtistFromFavorite(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.favoritesService.removeArtistFromFavorite(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<Album> {
  //   const artist: Album = await this.favoritesService.getAlbumById(id);
  //   return artist;
  // }
  //
  // @Post()
  // async createNewArtist(@Body() artist: CreateAlbumDto): Promise<Album> {
  //   const newArtist: Album = await this.favoritesService.createAlbum(artist);
  //   return newArtist;
  // }
  //
  // @Put(':id')
  // async updateAlbum(
  //   @Param('id') id: string,
  //   @Body() artist: CreateAlbumDto,
  // ): Promise<Album> {
  //   const updatedArtist: Album = await this.favoritesService.updateAlbum(
  //     id,
  //     artist,
  //   );
  //   return updatedArtist;
  // }
  //
  // @Delete(':id')
  // async deleteAlbum(
  //   @Param('id') id: string,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   await this.favoritesService.deleteAlbum(id);
  //   res.status(HttpStatus.NO_CONTENT).send();
  // }
}
