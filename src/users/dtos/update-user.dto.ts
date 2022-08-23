import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  username: string;

  @IsOptional()
  password: string;

  @IsOptional()
  image: string;
}
