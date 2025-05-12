import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  liveUrl: { type: String },
  githubUrl: { type: String },
  featured: { type: Boolean, default: false },
  imageUrl: { type: String, required: true }, 
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;
