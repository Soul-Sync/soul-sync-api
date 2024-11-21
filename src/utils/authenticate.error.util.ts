import { Request, Response } from "express";

// Middleware error handler
const errorHandler = (
    err: Error,  // Error yang dilemparkan
    req: Request,
    res: Response) => {

    if (err instanceof AuthenticationError) {
        res.status(401).json({ message: "Unauthorized: " + err.message });
    } else {
        res.status(500).json({ 
            message: "Internal Server Error", 
            error: err.message || 'Unknown error' 
        });
    }
};

// Custom AuthenticationError class
class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthenticationError";
    }
}

export { errorHandler, AuthenticationError };
