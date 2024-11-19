import { Response } from 'express';

/**
 * Handle server error
 * @param payload - Payload to be signed
 * @returns Error response
 */

export const handleServerError = (res: Response, error: Error) => {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', status: 'error' });
};
