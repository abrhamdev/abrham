import express from 'express';
import { sendMessage } from '../controllers/messageController.js';


const messageRoutes = express.Router();

messageRoutes.post('/send', sendMessage);

export default messageRoutes;
