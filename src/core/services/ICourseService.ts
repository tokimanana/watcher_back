import { Course } from "@core/entities";

export interface ICourseService {
    getAllCourses(): Promise<Course[]>;
    getCourseById(id: number): Promise<Course | null>;
}