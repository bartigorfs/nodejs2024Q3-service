import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ValidateUUIDMiddleware } from '../../middlewares/validateuuid/validateuuid.middleware';
import { ArtistsController } from '@/core/modules/artists/controller/artists.controller';
import { ArtistsService } from '@/core/modules/artists/service/artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUUIDMiddleware).forRoutes('artist/:id');
  }
}
