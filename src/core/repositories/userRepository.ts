import { User } from "@core/entities/user";

// Interface pour l'user Repository qu'on va implementer

export interface IUserRepository {
  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  create(user: User): Promise<User>;

  update(id:string,data:Partial<User>):Promise<User | null>;

  delete(id: string): Promise<boolean>;

  findAll(): Promise<User[]>;
}