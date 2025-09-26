import { Course } from "@core/entities";
import { ICourseRepository } from "@core/repositories/courseRepository";
import { AppDataSource } from "@infrastructure/database/sourceProvider";
import { Repository } from "typeorm";

export class CourseRepository implements ICourseRepository {

    private repo: Repository<Course>

    constructor(repo: Repository<Course>) {
        this.repo = AppDataSource.getRepository(Course)
    }

    async findAll(): Promise<Course[]> {
        return this.repo.find();
    }

    async findById(id: number): Promise<Course | null> {
        return this.repo.findOneBy({ courseId: id })
    }
}