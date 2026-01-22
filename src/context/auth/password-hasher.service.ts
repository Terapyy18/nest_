import { Injectable } from "@nestjs/common";
import { IPasswordHasherPort } from "./interface/passwordHasher";
import * as bcrypt from 'bcrypt';


@Injectable()
export class passwordHasherService implements IPasswordHasherPort {
    async hashPassword(password: string): Promise<string> {
        const bcrypt = await import('bcrypt');
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        const bcrypt = await import('bcrypt');
        return bcrypt.compare(password, hashedPassword);
    }
}
