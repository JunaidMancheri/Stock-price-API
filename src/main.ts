import express, { NextFunction, Request, Response } from 'express';
import { Config } from './config';
import { routes } from './routes';
import createHttpError, { HttpError } from 'http-errors';

const app = express();

app.use('/api', routes);

app.use('*', (req, res, next) => {
    createHttpError(404, 'Not Found');
})

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status).json({
        error: true,
        message: err.message || "Internal Server Error",
        status: err.status || 500
    })
})

app.listen(Config.port, (err) => {
    if (err) console.log(err);
    else console.log('Server running on port ' + Config.port);
})