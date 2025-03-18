import express, { NextFunction, Request, Response } from 'express';
import { Config } from './config';
import { routes } from './routes';
import createHttpError, { HttpError } from 'http-errors';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', routes);

app.use('*', (req, res, next) => {
    next(createHttpError(404, 'Not Found'));
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        status: err.status || 500
    })
})

app.listen(Config.port, (err) => {
    if (err) console.log(err);
    else console.log('Server running on port ' + Config.port);
})

export default app;