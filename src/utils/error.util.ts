import { Response } from 'express';
export const handleServerError = (res: Response, error: Error) => {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
};
