import { Response } from "express";

/**
 * Handle server error
 * @param res - Express Response object
 * @param message - Error message to send in the response
 */
export const handleServerError = (res: Response, message: string): void => {
    res.status(500).json({ message, status: "error" });
    // Optionally, you can log the error or take further actions here.
};