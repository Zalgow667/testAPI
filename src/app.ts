import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { sequelize } from './models';

import * as middlewares from './middlewares';
import reservationsRoutes from './api/reservations';
import voituresRoutes from './api/voitures';
import usersRoutes from './api/users';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json()); 

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1/reservations', reservationsRoutes);
app.use('/api/v1/voitures', voituresRoutes);
app.use('/api/v1/users', usersRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
});

export default app;
