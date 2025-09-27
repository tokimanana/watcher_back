import { Course } from "@core/entities";

export interface ICourseRepository {

    findAll(): Promise<Course[]>

    findById(id: number): Promise<Course | null>
}