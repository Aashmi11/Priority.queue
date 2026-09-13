import express from 'express';
import queueRoutes from './routes/queueRoutes.js';

const app = express();

app.use(express.json());
app.use('/', queueRoutes);

export default app;
