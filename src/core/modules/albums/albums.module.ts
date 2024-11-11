import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ValidateUUIDMiddleware } from '../../middlewares/validateuuid/validateuuid.middleware';
import { AlbumsController } from '@/core/modules/albums/controller/albums.controller';
import { AlbumsService } from '@/core/modules/albums/service/albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUUIDMiddleware).forRoutes('album/:id');
  }
}
