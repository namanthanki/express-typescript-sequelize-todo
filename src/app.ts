import express, { Application } from 'express';
import todoRoutes from './routes/todo';

const app: Application = express();

app.use(express.json());
app.use('/api', todoRoutes);

export default app;
