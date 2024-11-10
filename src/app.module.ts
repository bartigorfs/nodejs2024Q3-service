import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.example',
      isGlobal: true,
    }),
  ],
})
export class AppModule {
  static port: string;
  constructor(configService: ConfigService) {
    AppModule.port = configService.get('PORT');
  }
}
