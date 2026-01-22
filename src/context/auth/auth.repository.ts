import { Injectable } from "@nestjs/common";
import { UserCredentialsEntity } from "./entities/user-credentials.entity";
import { Repository } from "typeorm";
import { IAuthRepository } from "./auth.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";



@Injectable()
export class authRepository implements IAuthRepository {
    constructor(
        @InjectRepository(UserCredentialsEntity)
        private readonly credentialRepository: Repository<UserCredentialsEntity>
    ) { }

    async findCredentialByEmail(email: string): Promise<UserCredentialsEntity | null> {
        return await this.credentialRepository.findOne({ where: { email } });
    }

    async createCredential(data: Partial<UserCredentialsEntity>): Promise<UserCredentialsEntity> {
        const user = this.credentialRepository.create(data);
        return await this.credentialRepository.save(user);
    }
}
