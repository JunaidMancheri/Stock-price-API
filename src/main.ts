import express from 'express';
import { Config } from './config';
import { routes } from './routes';

const app = express();

app.use('/api', routes);

app.listen(Config.port, (err) => {
    if (err) console.log(err);
    else console.log('Server running on port ' + Config.port);
})