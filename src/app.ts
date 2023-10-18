import express, {Request, Response, NextFunction} from 'express';

import routes from './router';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();

app.use(json());

app.use(cors());

app.use(express.static('./src/public'));

app.use('/scrape', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
});

app.listen(3000);