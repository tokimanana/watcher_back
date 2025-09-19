import { User, UserRole } from "@core/entities";

export interface IUserService {
  register(registerData: {
    userName: string;
    email: string;
    password: string;
    role: UserRole;
  }): Promise<User>;

  getUserById(id: string): Promise<User | null>;

  getAllUsers(): Promise<User[]>;

  updateUser(
    id: string,
    updateData: {
      userName?: string;
      email?: string;
      password?: string;
      role?: UserRole;
    }
  ): Promise<User | null>;

  deleteUser(id: string): Promise<boolean>;

  authenticateUser(email: string, password: string): Promise<{ user: Omit<User, 'passwordHash'>; accessToken: string; refreshToken: string } | null>;

  refreshUserToken(refreshToken: string): Promise<{ user: Omit<User, 'passwordHash'>; accessToken: string; refreshToken: string } | null>;

  revokeAllUserTokens(userId: string): Promise<boolean>;

  validateTokenVersion(token: string): Promise<boolean>;
}