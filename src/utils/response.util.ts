import { Response } from "express";
import { HttpStatusCode } from "../enum/httpStatusCode";
// Define generic response interface
interface JsonResponse<T = unknown> {
    status: 'success' | 'error';
    message?: string;
    payload?: T | null;
}

/**
 * General response handler
 * @param res - Express Response object
 * @param statusCode - HTTP status code
 * @param payload - Response data (optional)
 */
export const handleResponse = <T>(
    res: Response,
    statusCode: number,
    payload: JsonResponse<T>
): Response => {
    return res.status(statusCode).json({
        status: payload.status,
        message: payload.message,
        ...(payload.payload !== null && { payload: payload.payload })
    });
};

/**
 * Handle server errors
 * @param res - Express Response object
 * @param message - Error message to send in the response
 * @returns Express Response object
 */
export const handleServerError = (
    res: Response,
    message: string | Error = 'Internal server error',
    statusCode?: number,
): Response => {
    return handleResponse(res, statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR, {
        status: 'error',
        message: message instanceof Error ? message.message : message,
    });
};

/**
 * Handle success responses
 * @param res - Express Response object
 * @param message - Success message to send in the response
 * @param payload - Response data (optional)
 * @param statusCode - HTTP status code
 * @returns Express Response object
*/
export const handleSuccess = <T>(
    res: Response,
    message: string,
    payload: T,
    statusCode: 200 | 201 = HttpStatusCode.OK
): Response => {
    return handleResponse(res, statusCode, {
        status: 'success',
        message,
        payload
    });
}