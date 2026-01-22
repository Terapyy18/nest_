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

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCredentialsEntity]),
    JwtModule.register({
      secret: 'bardthytryn',
      signOptions: { expiresIn: '12000s' },
    }),
  ],
  controllers: [authController],
  providers: [
    authService,
    { provide: AUTH_REPOSITORY, useClass: authRepository },
    { provide: IPasswordHasher, useClass: passwordHasherService },
  ],
  exports: [],
})
export class authModule { }
