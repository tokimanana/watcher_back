// import { config } from "@config/config";
import { User, type UserRole } from "@core/entities";
import type { IUserRepository } from "@core/repositories/userRepository";
import type { IUserService } from "@core/services/userService";
import { TYPE } from '@shared/di';
import { generateToken, validateToken, validateTokenVersion } from '@shared/utils/jwt.utils';
import bcrypt from 'bcryptjs';
import { inject, injectable } from 'inversify';
// import jwt from 'jsonwebtoken';

@injectable()
export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(@inject(TYPE.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async register(registerData: {
    userName: string;
    email: string;
    password: string;
    role: UserRole;
  }): Promise<User> {
    // Validate required fields
    if (!registerData.userName) {
      throw new Error('Username is required');
    }
    if (!registerData.email) {
      throw new Error('Email is required');
    }
    if (!registerData.password) {
      throw new Error('Password is required');
    }
    if (!registerData.role) {
      throw new Error('Role is required');
    }

    const existingUser = await this.userRepository.findByEmail(registerData.email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    const newUser = new User();
    newUser.userName = registerData.userName;
    newUser.email = registerData.email;
    newUser.passwordHash = hashedPassword;
    newUser.role = registerData.role;
    newUser.tokenVersion = 0; // Initialize token version
    return this.userRepository.create(newUser);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async updateUser(
    id: string,
    updateData: {
      userName?: string;
      email?: string;
      password?: string;
      role?: UserRole;
    }
  ): Promise<User | null> {
    const userToUpdate = await this.userRepository.findById(id);
    if (!userToUpdate) {
      return null;
    }

    if (updateData.userName !== undefined) {
      userToUpdate.userName = updateData.userName;
    }
    if (updateData.email !== undefined) {
      if (updateData.email !== userToUpdate.email) {
        const existingUser = await this.userRepository.findByEmail(updateData.email);
        if (existingUser && existingUser.id !== userToUpdate.id) {
          throw new Error('New email already in use by another user.');
        }
      }
      userToUpdate.email = updateData.email;
    }
    if (updateData.password !== undefined) {
      userToUpdate.passwordHash = await bcrypt.hash(updateData.password, 10);
    }
    if (updateData.role !== undefined) {
      userToUpdate.role = updateData.role;
    }

    return this.userRepository.create(userToUpdate);
  }

  async deleteUser(id: string): Promise<boolean> {
      return this.userRepository.delete(id);
  }

  async authenticateUser(email: string, password: string): Promise<{ user: Omit<User, 'passwordHash'>; accessToken: string; refreshToken: string} | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    // Revoke all previous tokens by incrementing token version
    user.tokenVersion = (user.tokenVersion || 0) + 1;
    await this.userRepository.update(user.id, { tokenVersion: user.tokenVersion });

    const accessToken = generateToken(user, "access");
    const refreshToken = generateToken(user, "refresh");

    const { passwordHash: userPassword, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, accessToken, refreshToken };
  }

  async refreshUserToken(refreshToken: string): Promise<{ user: Omit<User, 'passwordHash'>; accessToken: string; refreshToken: string; } | null> {
    try {
      const jwtPayload = validateToken(refreshToken);
      const user = await this.userRepository.findByEmail(jwtPayload.email);
      
      if (!user) {
        return null;
      }

      // Validate token version
      if (!validateTokenVersion(jwtPayload, user)) {
        return null; // Token has been revoked
      }

      const accessToken = generateToken(user, "access");
      const newRefreshToken = generateToken(user, "refresh");

      const { passwordHash: userPassword, ...userWithoutPassword } = user;

      return { user: userWithoutPassword, accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      return null;
    }
  }

  async revokeAllUserTokens(userId: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return false;
    }

    user.tokenVersion = (user.tokenVersion || 0) + 1;
    const updatedUser = await this.userRepository.update(userId, { tokenVersion: user.tokenVersion });
    
    return updatedUser !== null;
  }

  async validateTokenVersion(token: string): Promise<boolean> {
    try {
      const jwtPayload = validateToken(token);
      const user = await this.userRepository.findByEmail(jwtPayload.email);
      
      if (!user) {
        return false;
      }

      return validateTokenVersion(jwtPayload, user);
    } catch (error) {
      return false;
    }
  }
}