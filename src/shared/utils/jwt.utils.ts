import { config } from '@config/config';
import { User } from '@core/entities/user';
import { JwtPayload } from '@shared/types/jwt-payload.interface';
import jwt from 'jsonwebtoken';

export function validateToken(token: string): JwtPayload{
    const secret = config.jwt.secret;

    if (!secret) {
        throw new Error("Clé de chiffrement non specifié dans la configuration.");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
}

export function generateToken(user: User, tokenType: 'access' | 'refresh'): string {
    let jwtSecret: string | undefined;
    
    jwtSecret = config.jwt.secret;

    if (!jwtSecret) {
        throw new Error("Clé de chiffrement non specifié dans la configuration.");
    }
    
    const payload = { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        tokenVersion: user.tokenVersion 
    };
    
    if(tokenType === 'access')
        return jwt.sign(payload, jwtSecret, { expiresIn:  '1d'});
    else
        return jwt.sign(payload, jwtSecret, { expiresIn:  '7d'});
}

export function validateTokenVersion(tokenPayload: JwtPayload, currentUser: User): boolean {
    return tokenPayload.tokenVersion === currentUser.tokenVersion;
}