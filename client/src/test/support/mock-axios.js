import mockAxios from 'jest-mock-axios';

mockAxios.mockError = function(error={}) {
  const promise = this.popPromise(null);
  promise.reject(Object.assign(new Error(), { response: error }));
};

export default mockAxios;
