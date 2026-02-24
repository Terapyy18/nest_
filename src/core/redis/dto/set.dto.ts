import { IsString, IsOptional, IsNumber } from 'class-validator';

export class SetDto {
  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsNumber()
  ttl?: number; 
}