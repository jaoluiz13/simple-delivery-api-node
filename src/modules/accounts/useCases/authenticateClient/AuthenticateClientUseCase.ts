import { prisma } from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
    username: string
    password: string
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        //Receber o Username e o password - ok

        //verificar se o username esta no DB
        const user = await prisma.clients.findUnique({
            where: { username }
        });

        if (!user) {
            throw new Error("User or password incorrect");
        }

        //verificar se as senhas batem
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("User or password incorrect");
        }
        //gerar o token
        const token = sign({ username }, "ca0d448e5d40b5350a74a47ef3d054da", {
            subject: user.id,
            expiresIn: "1d"
        });

        return { "token": token };
    }
}