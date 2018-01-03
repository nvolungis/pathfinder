import mockAxios from 'jest-mock-axios';

const create = () => ({
  post : async (...args) => mockAxios.post(...args),
  get  : async (...args) => mockAxios.get(...args),
});

const interceptors = { response: { use: () => null } };

export default {
  create,
  interceptors,
};
