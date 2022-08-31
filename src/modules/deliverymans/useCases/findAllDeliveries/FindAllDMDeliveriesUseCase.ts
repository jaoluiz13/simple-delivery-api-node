import { prisma } from "../../../../database/prismaClient";

export class FindAllDMDeliveriesUseCase {
    async execute(id_deliveryman: string) {
        const deliveries = await prisma.clients.findMany({
            where: {
                id: id_deliveryman
            },
            select: {
                deliveries: true,
                username: true,
                id: true,
            }
        });

        return deliveries;
    }
}