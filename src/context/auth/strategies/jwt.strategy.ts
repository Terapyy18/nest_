import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { AUTH_REPOSITORY } from '../auth.repository.interface';
import type { IAuthRepository } from '../auth.repository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(AUTH_REPOSITORY) private readonly authRepo: IAuthRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'bardthytryn', // TODO: Move to env
        });
    }

    async validate(payload: any) {
        const user = await this.authRepo.findCredentialByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
