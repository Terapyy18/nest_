import { IsString, IsNumber } from 'class-validator';

export class ExpireDto {
  @IsString()
  key: string;

  @IsNumber()
  ttl: number; 
}