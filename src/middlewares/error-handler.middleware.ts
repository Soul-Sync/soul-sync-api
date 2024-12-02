import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.util';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error Message: ${err.message}, Stack: ${err.stack}`);

  res.status(500).json({
    status: false,
    message: 'Internal Server Error',
  });
};

export default errorHandler;
