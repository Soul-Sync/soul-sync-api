import rateLimit from "express-rate-limit";
import { HttpStatusCode } from "../enum/httpStatusCode";
import { handleResponse } from "../utils/response.util";

export const globalRateLimiter = (windowMs: number, max: number) => rateLimit({
    windowMs: windowMs || 15 * 60 * 1000,
    max: max || 5,
    message: 'Too many requests, please try again later',
    handler: (req, res) => {
        handleResponse(res, HttpStatusCode.TOO_MANY_REQUESTS, {
            status: 'error',
            message: 'Too many requests, please try again later after 15 minutes',
        });
    }
});

export const authRateLimiter = (windowMs: number, max: number) => rateLimit({
    windowMs: windowMs || 1000 * 60,
    max: max || 4,
    message: 'Too many requests, please try again later',
    handler: (req, res) => {
        handleResponse(res, HttpStatusCode.TOO_MANY_REQUESTS, {
            status: 'error',
            message: 'Too many requests, please try again later after 1 minute',
        });
    }
});