import { ExampleController, UserController } from "@presentation/controllers";
import { Container } from "inversify";
import { TYPE } from "./type";
import { IExampleService } from "@core/services/exampleService";
import { ExampleService, UserService } from "@application/services";
import { IUserRepository } from "@core/repositories";
import { IUserService } from "@core/services";
import { UserRepository } from "@infrastructure/repositories/user.repository";
import { ICourseRepository } from "@core/repositories/ICourseRepository";
import { CourseRepository } from "@infrastructure/repositories/course.repository";
import { ICourseService } from "@core/services/ICourseService";
import { CourseService } from "@application/services/courseService";
import { CourseController } from "@presentation/controllers/courseController";

export const container = new Container()


/**SERVICE */
container.bind<IExampleService>(TYPE.ExampleService).to(ExampleService)

/**CONTROLEUR */
container.bind<ExampleController>(TYPE.ExampleController).to(ExampleController)



container.bind<IUserRepository>(TYPE.IUserRepository).to(UserRepository);
container.bind<IUserService>(TYPE.IUserService).to(UserService);
container.bind<UserController>(TYPE.UserController).to(UserController);

container.bind<ICourseRepository>(TYPE.ICourseRepository).to(CourseRepository);
container.bind<ICourseService>(TYPE.ICourseService).to(CourseService);
container.bind<CourseController>(TYPE.CourseController).to(CourseController);