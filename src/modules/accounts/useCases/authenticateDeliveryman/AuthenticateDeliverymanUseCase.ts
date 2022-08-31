import { prisma } from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
    username: string
    password: string
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        //Receber o Username e o password - ok

        //verificar se o username esta no DB
        const deliveryman = await prisma.deliveryman.findUnique({
            where: { username }
        });

        if (!deliveryman) {
            throw new Error("User or password incorrect");
        }

        //verificar se as senhas batem
        const passwordMatch = await compare(password, deliveryman.password);

        if (!passwordMatch) {
            throw new Error("User or password incorrect");
        }
        //gerar o token
        const token = sign({ username }, "ja0ca0d448e5d40b5350a74a47ef3d054db", {
            subject: deliveryman.id,
            expiresIn: "1d"
        });

        return { "token": token };
    }
}