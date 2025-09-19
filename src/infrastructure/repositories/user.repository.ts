import { Repository } from "typeorm";
import { AppDataSource } from "@infrastructure/database/sourceProvider";
import { IUserRepository } from "@core/repositories/userRepository";
import { User } from "@core/entities/user";

// Implementation de l'interface IUserRepository
export class UserRepository implements IUserRepository {
    private repo: Repository<User>;

    constructor() {
        this.repo = AppDataSource.getRepository(User);
    }

    async findAll(): Promise<User[]> {
        return this.repo.find();
    }

    async findById(id: string): Promise<User | null> {
        return this.repo.findOneBy({ id });
    }

    async create(data: Partial<User>): Promise<User> {
        const newUser = this.repo.create(data);
        return this.repo.save(newUser);
    }

    async update(id: string, data: Partial<User>): Promise<User | null> {
        const user = await this.repo.findOneBy({ id });
        if (!user) return null;
        this.repo.merge(user, data);
        return this.repo.save(user);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repo.delete({ id });
        if(!result.affected)
        {
            throw new Error(`User with id ${id} is not found`)
        }
        return true;
    }
    async findByEmail(email: string): Promise<User | null> {
        return this.repo.findOneBy({ email });
    }
}