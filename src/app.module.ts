import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authModule } from './context/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path/win32';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrinterModule } from './context/ressources/printers/printer.module';
import { MaterialModule } from './context/ressources/materials/material.module';


@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',

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
  }), authModule, PrinterModule, MaterialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


