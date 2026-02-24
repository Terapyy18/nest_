import { Controller, Post, Get, Delete, Body, Param, Query } from '@nestjs/common';
import { RedisService } from './redis.service';
import { SetDto } from './dto/set.dto';
import { GetDto } from './dto/get.dto';
import { DelDto } from './dto/del.dto';
import { ExpireDto } from './dto/expire.dto';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Post('set')
  async set(@Body() setDto: SetDto): Promise<string> {
    return await this.redisService.set(setDto.key, setDto.value, setDto.ttl);
  }

  @Get('get')
  async get(@Query() getDto: GetDto): Promise<string | null> {
    return await this.redisService.get(getDto.key);
  }

  @Delete('del')
  async del(@Body() delDto: DelDto): Promise<number> {
    return await this.redisService.del(delDto.key);
  }

  @Post('expire')
  async expire(@Body() expireDto: ExpireDto): Promise<number> {
    return await this.redisService.expire(expireDto.key, expireDto.ttl);
  }

  @Get('exists/:key')
  async exists(@Param('key') key: string): Promise<number> {
    return await this.redisService.exists(key);
  }

  @Get('keys')
  async keys(@Query('pattern') pattern: string = '*'): Promise<string[]> {
    return await this.redisService.keys(pattern);
  }
}
