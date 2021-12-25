import axios from 'axios';
import { appConfig } from '../config/app';

export default axios.create({ baseURL: appConfig.apiUrl, timeoutErrorMessage: 1000 * 20 });
