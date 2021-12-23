import axios from 'axios';
import { appConfig } from '../config/app';

export const request = axios.create({ baseURL: appConfig.apiUrl });
