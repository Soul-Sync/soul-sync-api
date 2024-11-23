import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import asyncHandler from "express-async-handler";
import { handleServerError } from "../utils/response.util";
import { verifyToken } from "../utils/jwt.util";
import { HttpStatusCode } from "../enum/httpStatusCode";

const authenticate = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Get the token from the Authorization header
            const token = (req.headers.authorization as string).split(" ")[1];

            if (!token) {
                handleServerError(res, "Unauthorized", HttpStatusCode.UNAUTHORIZED);
            }

            const decoded = verifyToken(token) as JwtPayload;

            if (!decoded || !decoded.id) {
                handleServerError(res, "User Id not found", HttpStatusCode.UNAUTHORIZED);
            }

            const user = await User.findByPk(decoded.id);

            if (!user) {
                handleServerError(res, "User not found", HttpStatusCode.UNAUTHORIZED);
            }

            req.user = user;
            next();
            
        } catch (error) {
            handleServerError(res, error as Error);
        }
    }
);


export { authenticate };
