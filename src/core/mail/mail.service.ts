import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('SMTP_HOST'),
            port: Number(this.configService.get<number>('SMTP_PORT')),
            secure: this.configService.get<string>('SMTP_SECURITY') === 'true',
            auth: {
                user: this.configService.get<string>('SMTP_USER'),
                pass: this.configService.get<string>('SMTP_PASS'),
            },
        });
    }

    async sendMail(options: nodemailer.SendMailOptions) {
        return this.transporter.sendMail(options);
    }

    getTestMessageUrl(info: nodemailer.SentMessageInfo) {
        return nodemailer.getTestMessageUrl(info);
    }

    async sendUserWelcome(user: { email: string; userId: string }) {
        const from = this.configService.get<string>('SMTP_FROM') || '"No Reply" <noreply@example.com>';

        await this.sendMail({
            from,
            to: user.email,
            subject: 'Welcome to Nest App!',
            text: `Welcome! Your user ID is ${user.userId}.`,
            html: `<b>Welcome!</b><br>Your user ID is ${user.userId}.`,
        });

        console.log(`Email sent to ${user.email}`);
    }
}

