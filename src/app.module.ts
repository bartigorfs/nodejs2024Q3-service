import * as process from 'node:process';
import * as path from 'node:path';
import * as fs from 'fs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from '@/core/modules/user/user.module';
import { TrackModule } from '@/core/modules/track/track.module';
import { ArtistsModule } from '@/core/modules/artists/artists.module';

export const getEnvPath = () => {
  const envPath: string = path.join(process.cwd(), '.env');
  const envExamplePath: string = envPath + '.example';

  if (fs.existsSync(envPath)) {
    return envPath;
  }
  return envExamplePath;
};

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistsModule,
    ConfigModule.forRoot({
      envFilePath: getEnvPath(),
      isGlobal: true,
    }),
  ],
})
export class AppModule {
  static port: string;

  constructor(configService: ConfigService) {
    AppModule.port = configService.get<string>('PORT');
  }
}
