import { Course } from "@core/entities";
import { ICourseRepository } from "@core/repositories/ICourseRepository";
import { ICourseService } from "@core/services/ICourseService";
import { TYPE } from "@shared/di";
import { inject, injectable } from "inversify";

@injectable()
export class CourseService implements ICourseService {
    private readonly courseRepository: ICourseRepository;

    constructor(@inject(TYPE.ICourseRepository) courseRepository: ICourseRepository) {
        this.courseRepository = courseRepository;
    }

    async getAllCourses(): Promise<Course[]> {
        return this.courseRepository.findAll();
    }

    async getCourseById(id: number): Promise<Course | null> {
        return this.courseRepository.findById(id);
    }
}