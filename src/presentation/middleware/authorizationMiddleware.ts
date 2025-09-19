import { Request, Response, NextFunction } from 'express';
export function authorizeRoles(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.locals['message'] = "Erreur d'autorisation : Informations utilisateur manquantes. Assurez-vous que le middleware d'authentification est exécuté en premier.";
      res.status(403).send(null);
      return;
    }else if (!allowedRoles.includes(req.user.role)) {
      res.locals['message'] = "Accès refusé : Vous n'avez pas les permissions nécessaires.";
      res.status(403).json(null);
      return;
    }
    next();
  };
}