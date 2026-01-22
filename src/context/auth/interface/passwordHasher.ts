export const IPasswordHasher = Symbol('IPasswordHasher');

export interface IPasswordHasherPort {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    
}