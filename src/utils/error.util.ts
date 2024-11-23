import { Response } from "express";

/**
 * Handle server error
 * @param res - Express Response object
 * @param message - Error message to send in the response
 */
export const handleServerError = (res: Response, message: Error | string): void => {
    res.status(500).json({ 
        status: 'error',
        message: message instanceof Error ? message.message : message,
    });
    // Optionally, you can log the error or take further actions here.
};