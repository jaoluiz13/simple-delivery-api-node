import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";

export class FindAllAvailableController {
    async handle(request: Request, response: Response) {
        const updateDeliverymanUseCase = new UpdateDeliverymanUseCase();
    }
}