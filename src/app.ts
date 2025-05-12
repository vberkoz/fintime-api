import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import activitiesRoutes from './modules/activities/routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: true
}));

app.use('/api/activities', activitiesRoutes);

export default app;
