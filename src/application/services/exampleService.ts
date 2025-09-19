import { IExampleService } from "@core/services/exampleService";

export class ExampleService implements IExampleService {
  async getData(): Promise<string> {
    return "Sample Data";
  }

  async saveData(data: string): Promise<void> {
    console.log(`Data saved: ${data}`);
  }
}