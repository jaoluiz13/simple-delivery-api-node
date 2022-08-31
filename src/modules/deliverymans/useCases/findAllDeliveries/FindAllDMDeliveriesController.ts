import { Request, Response } from "express";
import { FindAllDMDeliveriesUseCase } from "./FindAllDMDeliveriesUseCase";

export class FindAllDMDeliveriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id_deliveryman } = request;
        const findAllDMDeliveriesUseCase = new FindAllDMDeliveriesUseCase();
        const result = await findAllDMDeliveriesUseCase.execute(id_deliveryman);
        return response.json(result);
    }
}