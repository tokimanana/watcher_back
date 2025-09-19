import { validateToken, validateTokenVersion } from '@shared/utils/jwt.utils';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { container } from '@shared/di/container';
import { TYPE } from '@shared/di/type';
import { IUserService } from '@core/services';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        tokenVersion: number;
      };
    }
  }
}

export async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.locals['message'] = 'Authentification requise : Jeton manquant ou mal formaté.';
      return res.status(401).send(null);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.locals['message'] = 'Authentification requise : Jeton mal formaté.';
        return res.status(401).send(null);
    }

    const decoded = validateToken(token);
    
    // Validate token version using user service
    const userService = container.get<IUserService>(TYPE.IUserService);
    const isTokenValid = await userService.validateTokenVersion(token);
    
    if (!isTokenValid) {
      res.locals['message'] = 'Authentification échouée : Jeton révoqué.';
      return res.status(401).send(null);
    }
  
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      tokenVersion: decoded.tokenVersion,
    };

    next();
    return;

  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      res.locals['message'] = 'Authentification échouée : Jeton expiré.';
      return res.status(401).send(null);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      res.locals['message'] = 'Authentification échouée : Jeton invalide.';
      return res.status(401).send(null);
    }
    res.locals['message'] = "Erreur inattendue lors de l'authentification.";
    return res.status(500).send({ error: error.message });
  }
}