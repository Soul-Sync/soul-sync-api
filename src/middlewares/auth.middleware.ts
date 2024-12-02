import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";
import TokenBlacklist from "../models/token.blacklist.model";
import { verifyToken } from "../utils/jwt.util";
import { handleResponse, handleServerError } from "../utils/response.util";
import { HttpStatusCode } from "../enum/httpStatusCode";

const authenticate = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;
            
            if (!authHeader) {
                handleResponse(res, HttpStatusCode.UNAUTHORIZED, {
                    status: "error",
                    message: "Authorization header is missing",
                });
                return;
            }

            const token = authHeader.split(" ")[1];

            
            if (!token) {
                handleResponse(res, HttpStatusCode.UNAUTHORIZED, {
                    status: "error",
                    message: "Token is missing",
                });
                return;
            }

            
            const blacklistedToken = await TokenBlacklist.findOne({ where: { token } });
            if (blacklistedToken) {
                handleResponse(res, HttpStatusCode.UNAUTHORIZED, {
                    status: "error",
                    message: "Token has been invalidated. Please log in again.",
                });
                return;
            }

            
            const decoded = verifyToken(token) as JwtPayload;

            if (!decoded || !decoded.id) {
                handleResponse(res, HttpStatusCode.UNAUTHORIZED, {
                    status: "error",
                    message: "Invalid or expired token",
                });
                return;
            }

            
            const user = await User.findByPk(decoded.id);

            if (!user) {
                handleResponse(res, HttpStatusCode.UNAUTHORIZED, {
                    status: "error",
                    message: "User not found",
                });
                return;
            }

            
            req.user = user;
            next();
        } catch (error) {
            handleServerError(res, error as Error);
        }
    }
);

export { authenticate };
