import { ICourseService } from "@core/services/courseService";
import { TYPE } from "@shared/di";
import { inject, injectable } from "inversify";
import { Request, Response } from "express";

@injectable()
export class CourseController {
    private readonly courseService: ICourseService;

    constructor(@inject(TYPE.ICourseService) courseService: ICourseService) {
        this.courseService = courseService;
    }

    public async getAllCourses(req: Request, res: Response) {
        try {
            const courses = await this.courseService.getAllCourses();
            return res.status(200).send(courses);
        } catch (error: any) {
            res.locals['message'] = 'Error fetching courses: ' + error.message;
            return res.status(500).send(null);
        }
    }

    public async getCourseById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const course = await this.courseService.getCourseById(Number(id));

            if (!course) {
                res.locals['message'] = 'Course not found';
                return res.status(404).send(null);
            }

            return res.status(200).send(course);
        } catch (error: any) {
            res.locals['message'] = 'Error fetching course: ' + error.message;
            return res.status(500).send(null);
        }
    }
}