import { ExampleController, UserController } from "@presentation/controllers";
import { Container } from "inversify";
import { TYPE } from "./type";
import { IExampleService } from "@core/services/exampleService";
import { ExampleService, UserService } from "@application/services";
import { IUserRepository } from "@core/repositories";
import { IUserService } from "@core/services";
import { UserRepository } from "@infrastructure/repositories/user.repository";

export const container = new Container()


/**SERVICE */
container.bind<IExampleService>(TYPE.ExampleService).to(ExampleService)

/**CONTROLEUR */
container.bind<ExampleController>(TYPE.ExampleController).to(ExampleController)



container.bind<IUserRepository>(TYPE.IUserRepository).to(UserRepository);
container.bind<IUserService>(TYPE.IUserService).to(UserService);
container.bind<UserController>(TYPE.UserController).to(UserController);
