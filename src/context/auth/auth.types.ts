import { Expose } from 'class-transformer';
import { IsString, IsStrongPassword, IsEmail } from 'class-validator';
import { CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
    @ApiProperty({ description: 'User email', example: 'user@example.com' })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: 'User password', example: 'StrongPass123!' })
    @IsStrongPassword()
    password!: string;
};

export class UserLoggedPresenter {
    @ApiProperty({ description: 'User email' })
    @Expose()
    @IsString()
    email!: string;

    @ApiProperty({ description: 'Account creation date' })
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}

export class RegisterDto {
    @ApiProperty({ description: 'User email', example: 'user@example.com' })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: 'User password', example: 'StrongPass123!' })
    @IsStrongPassword()
    password!: string;
}

export class RegisterPresenter {
    @ApiProperty({ description: 'User email' })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: 'User password' })
    @IsStrongPassword()
    password!: string;

    @ApiProperty({ description: 'Account creation date' })
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}