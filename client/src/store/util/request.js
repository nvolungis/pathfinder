import axios  from 'axios';
import logger from '../../logger';

const client = axios.create({
  baseURL : '/api',
  headers : { 'Content-Type': 'application/json' },
  timeout : 10000, // ms
});

export default (method, path, ...args) => {
  logger.info(`Issuing API request: ${ method } /api/${ path }`);

  return client[method](path, ...args)
    .then(res => res)
    .catch(res => {
      throw(Object.assign(new Error(), {
        ...res,
        ...res.data,
      }))
    });
};
