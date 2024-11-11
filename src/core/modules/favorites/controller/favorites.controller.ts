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
import { Favorites, FavoritesResponse } from "@/core/models/Favorites";
import { Response } from 'express';
import { TrackService } from '@/core/modules/track/service/track.service';
import { AlbumsService } from '@/core/modules/albums/service/albums.service';
import { ArtistsService } from '@/core/modules/artists/service/artists.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private tracksService: TrackService,
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
  ) {}

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    const favs: FavoritesResponse = await this.favoritesService.getAllFavs();
    console.log(favs);
    return favs;
  }

  @Post('track/:id')
  async addTrackToFavorite(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!(await this.tracksService.seekTrackById(id))) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    await this.favoritesService.addTrackToFavorite(id);
    res.status(HttpStatus.CREATED).send();
  }

  @Delete('track/:id')
  async removeTrackFromFavorite(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!(await this.tracksService.seekTrackById(id))) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    await this.favoritesService.removeTrackFromFavorite(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post('album/:id')
  async addAlbumToFavorite(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!(await this.albumsService.seekAlbumById(id))) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    await this.favoritesService.addAlbumToFavorite(id);
    res.status(HttpStatus.CREATED).send();
  }

  @Delete('album/:id')
  async removeAlbumFromFavorite(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!(await this.albumsService.seekAlbumById(id))) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    await this.favoritesService.removeAlbumFromFavorite(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post('artist/:id')
  async addArtistToFavorite(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!(await this.artistsService.seekArtistById(id))) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    await this.favoritesService.addArtistToFavorite(id);
    res.status(HttpStatus.CREATED).send();
  }

  @Delete('artist/:id')
  async removeArtistFromFavorite(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!(await this.artistsService.seekArtistById(id))) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    await this.favoritesService.removeArtistFromFavorite(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
