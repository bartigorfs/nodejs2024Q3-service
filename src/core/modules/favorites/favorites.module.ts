import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ValidateUUIDMiddleware } from '../../middlewares/validateuuid/validateuuid.middleware';
import { FavoritesController } from '@/core/modules/favorites/controller/favorites.controller';
import { FavoritesService } from '@/core/modules/favorites/service/favorites.service';
import { TrackService } from '@/core/modules/track/service/track.service';
import { AlbumsService } from '@/core/modules/albums/service/albums.service';
import { ArtistsService } from '@/core/modules/artists/service/artists.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, TrackService, AlbumsService, ArtistsService],
})
export class FavoritesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateUUIDMiddleware)
      .forRoutes('favs/track/:id', 'favs/album/:id', 'favs/artist/:id');
  }
}
