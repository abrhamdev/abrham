import { uploadToDrive } from '../middlewares/uploader.js';
import Project from '../models/project.js';

export const insertProject=async(req,res)=>{
     try {
    const {
      title,
      description,
      technologies,
      liveUrl,
      githubUrl,
      featured,
    } = req.body;

    const driveImageUrl = await uploadToDrive(req.file);

    const newProject = new Project({
      title,
      description,
      technologies: technologies.split(',').map(t => t.trim()),
      liveUrl,
      githubUrl,
      featured: featured === 'true',
      imageUrl: driveImageUrl,
    });
    

    await newProject.save();
    return res.status(201).json({ message: 'Project uploaded successfully' });
    }catch(error){
      console.log(error);
      return res.status(400).json({message:'Server error while uploading project'});
    }
}

export const fetchProject=async(req,res)=>{
   try {
         const projects = await Project.find().sort({ createdAt: -1 }); 
         return res.status(200).json(projects);
     } catch (error) {
       console.error(error);
       return res.status(500).json({ message: 'Failed to fetch projects' });
     }
}

export const deleteProject=async(req,res)=>{
   
  const projectId = req.params.id;

  try {
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete project' });
  }
}

export const updateProject=async(req,res)=>{
  
     try {
    const {
      title,
      description,
      technologies,
      liveUrl,
      githubUrl,
      featured,
    } = req.body;
   console.log(title);
    const driveImageUrl = await uploadToDrive(req.file);

    const newProject = new Project({
      title,
      description,
      technologies: technologies.split(',').map(t => t.trim()),
      liveUrl,
      githubUrl,
      featured: featured === 'true',
      imageUrl: driveImageUrl,
    });
    

    //await newProject.save();
    return res.status(201).json({ message: 'Project uploaded successfully' });
    }catch(error){
      console.log(error);
      return res.status(400).json({message:'Server error while uploading project'});
    }
}