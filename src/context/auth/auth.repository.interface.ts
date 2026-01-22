import { UserCredentialsEntity } from './entities/user-credentials.entity';

export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY');

export interface IAuthRepository {
    // Define methods for the Auth repository here
    findCredentialByEmail(email: string): Promise<UserCredentialsEntity | null>
    createCredential(data: Partial<UserCredentialsEntity>): Promise<UserCredentialsEntity>
}