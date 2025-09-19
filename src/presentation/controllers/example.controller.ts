import { injectable, inject } from 'inversify';
import { IExampleService } from '@core/services/exampleService';
import { TYPE } from '@shared/di';
import { Request,Response } from 'express';

@injectable()
export class ExampleController {
  constructor(
    @inject(TYPE.ExampleService)
    public readonly exampleService: IExampleService
  ) {}

  async getData(req:Request,res:Response) {
    
    return await this.exampleService.getData();
  }
}
