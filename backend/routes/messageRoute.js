import express from 'express';
import { fetchMessages, sendMessage } from '../controllers/messageController.js';
import { verifyToken } from '../middlewares/authMiddleWare.js';


const messageRoutes = express.Router();

messageRoutes.post('/send', sendMessage);
messageRoutes.get('/fetch',verifyToken, fetchMessages);

export default messageRoutes;
