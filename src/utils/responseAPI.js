import cleanObj from './cleanObj.js';

const responseSuccess = (status, message, data) => cleanObj({
  status,
  message,
  data,
});

const responseError = (status, message) => cleanObj({
  status,
  message,
});

export { responseSuccess, responseError };
