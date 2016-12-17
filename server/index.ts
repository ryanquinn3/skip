import * as chalk from 'chalk';
import * as debug from 'debug';
import * as express from 'express';
import * as open from 'opn';
import * as path from 'path';

import apiRouter from './api';

const log = debug('server');

const app = express();

const staticPath = path.resolve(__dirname, '..', 'dist');
const port = 5000;
app.use(express.static(staticPath));
app.use('/api', apiRouter);

const stall = (delay: number): Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

export default async(file: string) => {
    app.set('rootDir', file);
    app.listen(port, () => console.log('Starting Skip...'));
    await stall(500);
    await open(`http://localhost:${port}`);
    shutdownProcess();
};

const shutdownProcess = () => {
    console.log('Shutting down Skip');
    process.exit();
};
