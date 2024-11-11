import { Expose } from 'class-transformer';
import { IsEmpty, IsNumber, IsString } from 'class-validator';

export class TrackDto {
  @Expose()
  id?: string;
  @Expose()
  name: string;
  @Expose()
  duration: number;
  @Expose()
  @IsEmpty()
  artistId: string | null;
  @Expose()
  @IsEmpty()
  albumId: string | null;
}

export class CreateTrackDto {
  @IsString()
  name: string;
  @IsNumber()
  duration: number;
}
