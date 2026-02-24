
import { Injectable, Inject } from '@nestjs/common';
import { AUTH_REPOSITORY } from './auth.repository.interface';
import type { IAuthRepository } from './auth.repository.interface';
import { plainToInstance } from 'class-transformer';
import type { IPasswordHasherPort } from './interface/passwordHasher';
import { IPasswordHasher } from './interface/passwordHasher';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, loginDto, RegisterPresenter } from './auth.types';

import { UserCredentialsEntity } from './entities/user-credentials.entity';
import { AuthCredentialsError, AuthRegisterError, InvalidEmailFormatError, WeakPasswordError, InvalidPasswordError } from './errors/auth.error';
import type { EventBusPort } from 'src/core/events/event-bus.port';
import { EVENT_BUS } from 'src/core/events/event-bus.port';
import { AUTH_USER_REGISTERED_EVENT, UserRegisteredEvent } from './events/user-registered.event';
import { MailService } from 'src/core/mail/mail.service';
import { PermissionMasks } from './auth.permissions';


@Injectable()
export class authService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepo: IAuthRepository,
    @Inject(IPasswordHasher) private readonly passwordHasher: IPasswordHasherPort,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(MailService) private readonly mailService: MailService,
    @Inject(EVENT_BUS) private readonly eventBus: EventBusPort

  ) { }

  async registerUser(registerDTO: RegisterDto) {
    // Vérification du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerDTO.email)) {
      throw new InvalidEmailFormatError(
        { email: ['Invalid email format'] },
        { email: registerDTO.email }
      );
    }

    if (!registerDTO.password || registerDTO.password.length < 8) {
      throw new WeakPasswordError(
        { password: ['Password must be at least 8 characters'] },
        { password: registerDTO.password }
      );
    }
    const emailExists = await this.authRepo.findCredentialByEmail(registerDTO.email);
    if (emailExists) {
      console.log('Email already in use');
      throw new AuthRegisterError(
        { referralCode: ['Email already in use'] },
        { referralCode: registerDTO.email }
      );
    }

    const passwordHash = await this.passwordHasher.hashPassword(registerDTO.password);

    const createdUser = await this.authRepo.createCredential({
      email: registerDTO.email,
      passwordHash: passwordHash,
      permissions: PermissionMasks.STANDARD_USER.toString()
    });

    await this.eventBus.publish(UserRegisteredEvent.create({
      userCredentialId: String(createdUser.id),
      email: String(createdUser.email),
    }));

    return {
      user: plainToInstance(UserCredentialsEntity, createdUser, { excludeExtraneousValues: true }),
    };

  }


  async login(dto: loginDto) {
    // Vérification du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dto.email)) {
      throw new InvalidEmailFormatError(
        { email: ['Invalid email format'] },
        { email: dto.email }
      );
    }
    const credential = await this.authRepo.findCredentialByEmail(dto.email);
    if (!credential) {
      throw new AuthCredentialsError(
        { email: ['Invalid email or password'] },
        { email: dto.email }
      );
    }


    const isPasswordValid = await this.passwordHasher.comparePassword(dto.password, credential.passwordHash);

    if (!isPasswordValid) {
      throw new InvalidPasswordError(
        { password: ['Incorrect password'] },
        { password: dto.password }

      );
    }

    // Générer le token JWT
    const token = this.jwtService.sign({ userId: credential.id, email: credential.email });

    return {
      user: plainToInstance(UserCredentialsEntity, credential, { excludeExtraneousValues: true }),
      token,
    };

  }


  async logout() {
    return { message: 'Logged out successfully' };
  }
}