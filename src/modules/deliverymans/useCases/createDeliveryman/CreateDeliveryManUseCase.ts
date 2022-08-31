import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryMan {
    username: string;
    password: string;
}

export class CreateDeliverymanUseCase {
    async execute({ username, password }: ICreateDeliveryMan) {
        const deliveryMan = await prisma.deliveryman.findUnique({
            where: { username }
        });
        if (deliveryMan) {
            throw new Error("Client Already exists");
        }

        const hashPassword = await hash(password, 10);

        const deliveryCreate = await prisma.deliveryman.create({
            data: { username, password: hashPassword }
        });
        return deliveryCreate;
    };
}