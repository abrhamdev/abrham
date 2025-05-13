import express from 'express';
import { upload } from '../middlewares/multer.js';
import { deleteProject, fetchProject, insertProject, updateProject } from '../controllers/projectController.js';
import { verifyToken } from '../middlewares/authMiddleWare.js';


const projectRoute = express.Router();

projectRoute.post('/upload',verifyToken,upload.single('image'), insertProject);
projectRoute.put('/update/:id', verifyToken, upload.single('image'), updateProject);
projectRoute.get('/fetch' ,fetchProject);
projectRoute.delete('/:id',verifyToken,deleteProject);

export default projectRoute;
