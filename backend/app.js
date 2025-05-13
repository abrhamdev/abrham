import express from 'express';
import cors from 'cors';
import userRoute from './routes/userRoutes.js';
import connectMongoDB from './config/mongo.js';
import projectRoute from './routes/projectRoutes.js';
import messageRoutes from './routes/messageRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

connectMongoDB();

app.use('/user', userRoute);
app.use('/project', projectRoute);
app.use('/message', messageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
