
import { Injectable, Inject } from '@nestjs/common';
import { AUTH_REPOSITORY } from './auth.repository.interface';
import type { IAuthRepository } from './auth.repository.interface';
import { plainToInstance } from 'class-transformer';
import type { IPasswordHasherPort } from './interface/passwordHasher';
import { IPasswordHasher } from './interface/passwordHasher';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, loginDto, RegisterPresenter } from './auth.types';

import { UserCredentialsEntity } from './entities/user-credentials.entity';
import { AuthCredentialsError, AuthRegisterError } from './errors/auth.error';



@Injectable()
export class authService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepo: IAuthRepository,
    @Inject(IPasswordHasher) private readonly passwordHasher: IPasswordHasherPort,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) { }

  async registerUser(registerDTO: RegisterDto) {
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
    });

    return {
      user: plainToInstance(UserCredentialsEntity, createdUser, { excludeExtraneousValues: true }),
    };
  }


  async login(dto: loginDto) {
    const credential = await this.authRepo.findCredentialByEmail(dto.email);
    if (!credential) {
      throw new AuthCredentialsError(
        { email: ['Invalid email or password'] },
        { email: dto.email }
      );
    }


    const isPasswordValid = await this.passwordHasher.comparePassword(dto.password, credential.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Générer le token JWT
    const token = this.jwtService.sign({ userId: credential.id, email: credential.email });

    return {
      user: plainToInstance(UserCredentialsEntity, credential, { excludeExtraneousValues: true }),
      token,
    };

  }


  // async refresh (context: ExecutionContext) {
  //   const req : Context.switchToHttp().getRequest();
  //   const token = req.headers.authorization.split(' ')[1];

  // appel ton token service pour verify le refresh token
  //on recupere le payload sub credentialId
  //grace au payload on demande le credentialEntity + profilEntity
  // on vient recréer notre access + refresh en faisant appel à tokenService.sign
}