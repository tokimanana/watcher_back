
export const TYPE = {
    /**SERVICE */
    ExampleService: Symbol.for('ExampleService'),

    /**CONTROLEUR */
    ExampleController:Symbol.for('ExampleController'),

    ProjectController: Symbol.for('ProjectController'),
    ProjectService: Symbol.for('ProjectService'),
    IProjectRepository: Symbol.for('IProjectRepository'),
    
    TaskController: Symbol.for('TaskController'),
    TaskService: Symbol.for('TaskService'),
    ITaskRepository: Symbol.for('ITaskRepository'),
    
    ProjectUserController: Symbol.for('ProjectUserController'),
    ProjectUserService: Symbol.for('ProjectUserService'),
    IProjectUserRepository: Symbol.for('IProjectUserRepository'),

    IUserRepository: Symbol.for('IUserRepository'),

  IUserService: Symbol.for('IUserService'),

  UserController: Symbol.for('UserController'),
}
