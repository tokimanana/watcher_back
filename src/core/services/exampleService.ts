export interface IExampleService {
  getData(): Promise<string>;
  saveData(data: string): Promise<void>;
}
