import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  status?: number;
}

export function errorHandlerMiddleware(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || err.status || 500;
  const message =
    err.message || 'Erreur interne du serveur. Veuillez réessayer plus tard.';

  res.status(statusCode);
  res.locals['message'] = message;

  res.send(null);
}

export function notFoundMiddlewareWithError(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = new Error(
    `Route ${req.method} ${req.originalUrl} non trouvée`
  ) as any;
  error.statusCode = 404;
  next(error);
}
