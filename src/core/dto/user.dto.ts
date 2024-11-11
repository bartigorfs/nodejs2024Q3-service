import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserDto {
  @Expose()
  id?: string;
  @Expose()
  login: string;
  @Exclude()
  password: string;
  @Expose()
  version: number;
  @Expose()
  createdAt: number;
  @Expose()
  updatedAt: number;
}

export class CreateUserDto {
  @IsString()
  readonly login: string;
  @IsString()
  readonly password: string;
}

export class UpdatePasswordDto {
  @IsString()
  readonly oldPassword: string; // previous password
  @IsString()
  readonly newPassword: string; // new password
}
