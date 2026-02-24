import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authModule } from './context/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path/win32';
import { TypeOrmModule } from '@nestjs/typeorm';
import { eventModule } from './core/events/event.module';
import { MailModule } from './core/mail/mail.module';
import { PricingModule } from './context/pricing/pricing.module';
import { RedisModule } from './core/redis/redis.module';
import { RessourcesModule } from './context/ressources/ressources.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST') || 'localhost',
        port: config.get<number>('DB_PORT') || 3306,
        username: config.get<string>('DB_USERNAME') || 'root',
        password: config.get<string>('DB_PASSWORD') || '',
        database: config.get<string>('DB_DATABASE') || 'nest',

        synchronize: config.get<boolean>('DB_SYNCHRONIZE') ?? true,
        logging: config.get<boolean>('DB_LOGGING') ?? false,

        autoLoadEntities: true,

        charset: 'utf8mb4',
        timezone: 'Z',
        // ssl: toBool(dbSsl) ? { rejectUnauthorized: false } : undefined,

        migrations: [
          join(process.cwd(), 'dist/core/database/migrations/*.js'),
          join(process.cwd(), 'src/core/database/migrations/*.ts'),
        ],
      })
    }), eventModule, authModule, MailModule, PricingModule, RedisModule, RessourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
