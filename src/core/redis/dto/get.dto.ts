import { IsString } from 'class-validator';

export class GetDto {
  @IsString()
  key: string;
}