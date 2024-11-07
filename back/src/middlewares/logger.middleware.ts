import { NextFunction, Request, Response } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Request: ${req.method} ${req.url} a la hora ${new Date()}`);
  next();
}
