import { Router } from 'express';
import { getProjects, addProject, updateProject, removeProject, getProjectTypes, addUserToProject, removeUserFormProject, getProjectDetails, getUserProjects } from '../controllers/projects-controller';
import { authToken } from '../middleware/tokenCheck';
import { adminCheck } from '../middleware/adminCheck';

export const projects: Router = Router();

projects.get('/getprojects', authToken, getProjects);
projects.get('/getuserprojects/:userId', authToken, getUserProjects)
projects.post('/addproject', authToken, adminCheck, addProject);
projects.put('/updateproject/:projectId', authToken, adminCheck, updateProject);
projects.delete('/removeproject/:projectId', authToken, adminCheck, removeProject);
projects.get('/getprojecttypes', authToken, getProjectTypes);
projects.post('/addusertoproject', authToken, adminCheck, addUserToProject);
projects.delete('/removeuserfromproject/:userId/:projectId', authToken, adminCheck, removeUserFormProject);
projects.get('/getprojectdetails', authToken, getProjectDetails);