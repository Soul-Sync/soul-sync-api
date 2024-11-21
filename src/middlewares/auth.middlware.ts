import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import asyncHandler from "express-async-handler";
import { handleServerError } from "../utils/error.util";
import { verifyToken } from "../utils/jwt.util";

const authenticate = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get the token from the Authorization header
            const token = req.headers.authorization?.split(" ")[1];  // Assuming "Bearer <token>"

            if (!token) {
                return handleServerError(res, "Unauthorized");
            }

            const decoded = verifyToken(token) as JwtPayload;

            if (!decoded || !decoded.id) {
                return handleServerError(res, "User Id not found");
            }

            const user = await User.findByPk(decoded.id);

            if (!user) {
                return handleServerError(res, "User not found");
            }

            req.user = user;
            next();
        } catch {
            return handleServerError(res, "Invalid token");
        }
    }
);

export { authenticate };
