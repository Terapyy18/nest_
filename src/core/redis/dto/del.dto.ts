import { IsString } from 'class-validator';

export class DelDto {
  @IsString()
  key: string;
}