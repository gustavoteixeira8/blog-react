import axios from 'axios';
// import serialize from 'serialize-javascript';
import { appConfig } from '../config/app';

export default axios.create({
  baseURL: appConfig.apiUrl,
  timeout: 1000 * 10,
  responseType: 'json',
  // transformRequest: [(data) => JSON.stringify(serialize(data))],
});
