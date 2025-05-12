import express from 'express';
import { upload } from '../middlewares/multer.js';
import { deleteProject, fetchProject, insertProject } from '../controllers/projectController.js';
import { verifyToken } from '../middlewares/authMiddleWare.js';


const projectRoute = express.Router();

projectRoute.post('/upload',verifyToken,upload.single('image'), insertProject);
projectRoute.get('/fetch' ,fetchProject);
projectRoute.delete('/:id',verifyToken,deleteProject);

export default projectRoute;
