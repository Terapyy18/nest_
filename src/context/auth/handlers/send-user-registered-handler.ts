import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AUTH_USER_REGISTERED_EVENT, type UserRegisteredPayload } from "../events/user-registered.event";
import { MailService } from "../../../core/mail/mail.service";


@Injectable()
export class SendUserRegisteredHandler {
    constructor(
        @Inject(MailService) private readonly mailService: MailService) { }

    @OnEvent(AUTH_USER_REGISTERED_EVENT)
    async handleUserRegisteredEvent(payload: UserRegisteredPayload) {
        console.log('User registered event received:', payload);
        (async () => {
            try {
                const info = await this.mailService.sendMail({
                    from: process.env.MAILER_EMAIL,
                    to: payload.email,
                    subject: "Bienvenue" + payload.email,
                    text: "Bienvenue sur Manufactur3D",
                    html: "<b>Bienvenue sur Manufactur3D</b>",
                });

                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", this.mailService.getTestMessageUrl(info));
            } catch (err) {
                console.error("Error while sending mail", err);
            }
        })();

    }
}