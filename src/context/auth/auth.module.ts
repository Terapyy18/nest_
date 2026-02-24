import { Module } from '@nestjs/common';
import { authController } from './auth.controller';
import { authService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCredentialsEntity } from './entities/user-credentials.entity';
import { AUTH_REPOSITORY } from './auth.repository.interface';
import { authRepository } from './auth.repository';
import { passwordHasherService } from './password-hasher.service';
import { IPasswordHasher } from './interface/passwordHasher';
import { JwtModule } from '@nestjs/jwt';
import { SendUserRegisteredHandler } from './handlers/send-user-registered-handler';
import { MailModule } from '../../core/mail/mail.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCredentialsEntity]),
    JwtModule.register({
      secret: 'bardthytryn',
      signOptions: { expiresIn: '12000s' },
    }),
    MailModule,
  ],
  controllers: [authController],
  providers: [
    authService,
    SendUserRegisteredHandler,
    JwtStrategy,
    JwtAuthGuard,
    PermissionsGuard,
    { provide: AUTH_REPOSITORY, useClass: authRepository },
    { provide: IPasswordHasher, useClass: passwordHasherService },
  ],
  exports: [
    JwtAuthGuard,
    PermissionsGuard,
    JwtStrategy,
  ],
})
export class authModule { }
