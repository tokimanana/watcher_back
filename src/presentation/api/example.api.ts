import { Router,Request,Response } from 'express';
import { ExampleController } from '@presentation/controllers';
import { container, TYPE } from '@shared/di';

export const routerExample: Router = Router();


const exampleContainer = container.get<ExampleController>(TYPE.ExampleController);

routerExample.get("/test", async (req:Request, res:Response) => {
  let response = await exampleContainer.getData(req,res)
  res.locals['message'] = "Hello formaté";
  res.send(response);
});



routerExample.post('/', (req, res) => {
  const newExample = req.body;
  res.locals['message'] = 'Example created successfully';
  res.status(201)
  res.send(newExample);
});
