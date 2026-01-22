import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';


export interface JWTTokenPort {
    generateToken(payload: object): Promise<string>
    verifyToken(token: string): Promise<object | null>
    verifyAccessToken(token: string): Promise<object | null>
}

@Injectable()
export class tokenJWTService implements JWTTokenPort {
    private readonly secret = '512821781512217718178122177182';

    generateToken(payload: object): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.secret, { expiresIn: '12000s' }, (err, token) => {
                if (err) reject(err);
                else resolve(token as string);
            });
        });
    }

    verifyToken(token: string): Promise<object | null> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, (err, decoded) => {
                if (err) reject(err);
                else resolve((decoded as object) || null);
            });
        });
    }

    verifyAccessToken(token: string): Promise<object | null> {
        return this.verifyToken(token);
    }
}