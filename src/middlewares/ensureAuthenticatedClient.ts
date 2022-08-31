import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticatedClient(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(403).json({
            message: "Token Missing"
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(token, "ca0d448e5d40b5350a74a47ef3d054da") as IPayload;

        request.id_client = sub;

        return next();
    } catch (e) {
        return response.status(403).json({
            message: "Invalid token"
        });
    }
};



