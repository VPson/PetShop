import 'reflect-metadata';
import '@shared/container';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import express, { NextFunction, Request, Response } from 'express';
import { routes } from './routes';
import { AppError } from 'shared/errors/AppError';

createConnection();

const app = express();
app.use(express.json());
app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if ( err instanceof AppError ) {
    return res.status(err.statusCode).json({ 
      message: err.message
    });
  }

  return res.status(501).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});

app.listen(3000, () => console.log('rodando'));
