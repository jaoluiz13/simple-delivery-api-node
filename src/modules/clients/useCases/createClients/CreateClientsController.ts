import { Request, Response } from "express";
import { CreateClientsUseCase } from "./CreateClientsUseCase";

export class CreateClientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { username, password } = request.body;
        const createClientsUseCase = new CreateClientsUseCase();
        const result = await createClientsUseCase.execute({ username, password });
        return response.json(result);
    }
}