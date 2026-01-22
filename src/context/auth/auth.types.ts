import { Expose } from 'class-transformer';
import { IsString, IsStrongPassword, IsEmail } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class loginDto {
    @IsEmail()
    email!: string;
    @IsStrongPassword()
    password!: string;
};

export class UserLoggedPresenter {
    @Expose()
    @IsString()
    email!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

}

export class RegisterDto {
    @IsEmail()
    email!: string;
    @IsStrongPassword()
    password!: string;

    // @CreateDateColumn({ name: 'created_at' })
    // createdAt!: Date;
}

export class RegisterPresenter {
    @IsEmail()
    email!: string;

    @IsStrongPassword()
    password!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}