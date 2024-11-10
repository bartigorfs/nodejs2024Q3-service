import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class TrackDto {
  @Expose()
  id?: string;
  @Expose()
  name: string;
  @Expose()
  duration: number;
  @Expose()
  artistId: string | null;
  @Expose()
  albumId: string | null;
}

export class CreateTrackDto {
  @IsString()
  name: string;
  @IsNumber()
  duration: number;
}
