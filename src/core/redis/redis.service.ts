import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async set(key: string, value: string, ttl?: number): Promise<string> {
    if (ttl) {
      return await this.redisClient.setex(key, ttl, value);
    }
    return await this.redisClient.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async del(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }

  async expire(key: string, ttl: number): Promise<number> {
    return await this.redisClient.expire(key, ttl);
  }

  async exists(key: string): Promise<number> {
    return await this.redisClient.exists(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return await this.redisClient.keys(pattern);
  }
}
