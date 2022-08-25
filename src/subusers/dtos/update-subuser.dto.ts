import { IsOptional } from 'class-validator';

export class UpdateSubuserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  image: string;
}
