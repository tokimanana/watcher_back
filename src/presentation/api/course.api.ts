import { CourseController } from "@presentation/controllers/courseController";
import { container, TYPE } from "@shared/di";
import { Router } from "express";

export const routerCourse: Router = Router()

const courseContainer = container.get<CourseController>(TYPE.CourseController)

routerCourse.get('/', async (req, res) => {
    await courseContainer.getAllCourses(req, res)
})

routerCourse.get('/:id', async (req, res) => {
    await courseContainer.getCourseById(req, res)
})