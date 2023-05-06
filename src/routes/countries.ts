import { Router, Request, Response } from 'express';
import { authToken } from '../middleware/tokenCheck';
import { getCountries } from '../controllers/country-controller';

export const countries: Router = Router();

countries.get('/getcountries', authToken, getCountries);