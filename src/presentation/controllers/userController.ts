import { LoginUserDto } from '@application/dto/auth.dto';
import { CreateUserDto } from '@application/dto/createUser.dto';
import { IUserService } from '@core/services/userService';
import { TYPE } from '@shared/di/type';
import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';



@injectable()
export class UserController {
  private readonly userService: IUserService;

  constructor(@inject(TYPE.IUserService) userService: IUserService) {
    this.userService = userService;
  }


  public async createUser(req: Request, res: Response) {
    try {
      console.log('Request body:', req.body); // Debug log
      const createUserDto = req.body as CreateUserDto;

      // Validate the DTO
      if (!createUserDto.userName || !createUserDto.email || !createUserDto.password || !createUserDto.role) {
        res.locals['message'] = 'Missing required fields: userName, email, password, role';
        return res.status(400).send(null);
      }

      const newUser = await this.userService.register({
        userName: createUserDto.userName,
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role as any,
      });

      const { passwordHash, ...userWithoutPassword } = newUser;
      res.status(201).send(userWithoutPassword);
    } catch (error: any) {
      console.error('Error creating user:', error); // Debug log
      if (error.message.includes('email already exists')) {
        res.locals['message'] = "email dejà utilisé";
        return res.status(409).send(null);
      }
      res.locals['message'] = 'Error creating user: ' + error.message;
      return res.status(500).send(null);
    }
    return null;
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(String(id));

      if (!user) {
        res.locals['message'] = 'Utilisateur introuvable';
        return res.status(404).send(null);
      }

      const { passwordHash, ...userWithoutPassword } = user;
      return res.status(200).send(userWithoutPassword);
    } catch (error: any) {
      res.locals['message'] = 'Error fetching user'+error.message;
      return res.status(500).send(null);
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      const usersWithoutPasswords = users.map(user => {
        const { passwordHash, ...rest } = user;
        return rest;
      });
      res.status(200).send(usersWithoutPasswords);
    } catch (error: any) {
      res.locals['message'] = 'Error fetching all users'+error.message;
      res.status(500).send(null);
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedUser = await this.userService.updateUser(String(id), updateData);

      if (!updatedUser) {
        res.locals['message'] = 'Utilisateur non trouvé';
        return res.status(404).json({ message: 'User not found' });
      }

      const { passwordHash, ...userWithoutPassword } = updatedUser;
      res.locals['message'] = 'Utilisateur modifé';
      res.status(200).send(userWithoutPassword);
    } catch (error: any) {
      if (error.message.includes('email already in use')) {
        res.locals['message'] = 'Email dejà utilisé';
        return res.status(409).send(null);
      }
      res.locals['message'] = 'Error updating user'+error.message;
      return res.status(500).send(null);
    }
    return null;
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await this.userService.deleteUser(String(id));

      if (!success) {
        res.locals['message'] = 'Utilisateur introuvable';
        return res.status(404).send(null);
      }

      return res.status(204).send(null);
    } catch (error: any) {
      res.locals['message'] = 'Error deleting user'+error.message;
      return res.status(500).send(null);
    }
  }

  public async authenticateUser(req: Request, res: Response) {
    try {
      const loginUserDto = req.body as LoginUserDto;

      const authResult = await this.userService.authenticateUser(loginUserDto.email, loginUserDto.password);
      if (!authResult) {
        res.locals['message'] = 'login ou mot de passe invalide';
        return res.status(401).send(null);
      }else{
        res.locals['message'] = "Utilisateur authentifié";
        return res.status(200).send(authResult);
      }
    } catch (error: any) {
      res.locals['message'] = "Échec de l'authentification";
      return res.status(500).send(null);
    }
  }

  public async refreshUserToken(req: Request, res: Response){
    try{
      const result = await this.userService.refreshUserToken(req.body.refreshToken)

      if (!result) {
        res.locals['message'] = 'refresh token invalide';
        return res.status(401).send(null);
      }else{
        res.locals['message'] = "Utilisateur authentifié";
        return res.status(200).send(result);
      }
    }catch (error: any) {
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

  public async revokeTokens(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        res.locals['message'] = 'Utilisateur non authentifié';
        return res.status(401).send(null);
      }

      const success = await this.userService.revokeAllUserTokens(userId);

      if (!success) {
        res.locals['message'] = 'Erreur lors de la révocation des jetons';
        return res.status(500).send(null);
      }

      res.locals['message'] = 'Tous les jetons ont été révoqués avec succès';
      return res.status(200).send({ message: 'All tokens revoked successfully' });
    } catch (error: any) {
      res.locals['message'] = 'Erreur lors de la révocation des jetons';
      return res.status(500).send({ error: error.message });
    }
  }
}