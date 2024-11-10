import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { ValidateUUIDMiddleware } from '../../middlewares/validateuuid/validateuuid.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUUIDMiddleware).forRoutes('user/:id');
  }
}
