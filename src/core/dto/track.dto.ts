import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TrackDto {
  @Exclude()
  id?: string;
  @Expose()
  name: string;
  @Expose()
  duration: number;
  @Exclude()
  artistId: string | null;
  @Exclude()
  albumId: string | null;
}

export class CreateTrackDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsNumber()
  @IsOptional()
  duration: number;
}
