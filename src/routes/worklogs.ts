import { Router } from 'express';
import { authToken } from '../middleware/tokenCheck';
import { addWorkLog, updateWorkLog, removeWorkLog } from '../controllers/worklog-controller';
import { adminCheck } from '../middleware/adminCheck';

export const worklogs: Router = Router();

worklogs.post('/addworklog', authToken, addWorkLog);
worklogs.post('/updateworklog', authToken, updateWorkLog);
worklogs.delete('/deleteworklog', authToken, removeWorkLog);
