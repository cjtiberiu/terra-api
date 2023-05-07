import { Router } from 'express';
import { getProjects, addProject, updateProject, removeProject, getProjectTypes, assignProject } from '../controllers/projects-controller';
import { authToken } from '../middleware/tokenCheck';
import { adminCheck } from '../middleware/adminCheck';

export const projects: Router = Router();

projects.get('/getprojects', authToken, getProjects);
projects.post('/addproject', authToken, adminCheck, addProject);
projects.put('/updateproject/:projectId', authToken, adminCheck, updateProject);
projects.delete('/removeproject/:projectId', authToken, adminCheck, removeProject);
projects.get('/getprojecttypes', authToken, adminCheck, getProjectTypes);
projects.post('/assignproject', authToken, adminCheck, assignProject);