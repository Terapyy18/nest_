import { Module, Logger } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { Redis } from 'ioredis';

@Module({
  controllers: [RedisController],
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const logger = new Logger('RedisModule');
        const redisClient = new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
          password: process.env.REDIS_PASSWORD || undefined,
          retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
          },
          reconnectOnError: (err) => {
            const targetError = 'READONLY';
            if (err.message.includes(targetError)) {
              return true;
            }
            return false;
          },
        });

        redisClient.on('error', (err) => {
          logger.error(`Redis connection error: ${err.message}`);
        });

        redisClient.on('connect', () => {
          logger.log('Redis connected');
        });

        redisClient.on('ready', () => {
          logger.log('Redis ready');
        });

        return redisClient;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
