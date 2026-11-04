import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import placesRouter from './routes/places.routes.js';
import metaRouter from './routes/meta.routes.js';
import { notFound, errorHandler } from './middlewares/errors.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({
    name: 'Mon coin BZ-PN API',
    description: 'Les meilleurs coins de Brazzaville et Pointe-Noire',
    version: '0.1.0',
    docs: 'https://github.com/JBixx/Mon-coin-BZ-PN#readme',
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/v1/places', placesRouter);
app.use('/api/v1', metaRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
