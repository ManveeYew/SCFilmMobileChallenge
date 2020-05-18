import _ from 'lodash';
import axios from 'axios';

export const fullUrlFrom = (endpoint) => {
  const baseUrl = 'http://www.ombdapi.com/';
  const fullUrl = baseUrl + endpoint;
  return fullUrl;
};

export const configureInterceptor = () => {
  axios.interceptors.request.use((config) => {  
    return config;
  }, error => Promise.reject(error));

  axios.interceptors.response.use(response => response, (error) => {
    if (error.response) {
      return Promise.reject(error.response);
    }
    return Promise.reject('Please check your internet connection or try again later');
  });
};

const fetchUrl = (method, endpoint, params = {}) => {
  if (_.toUpper(method) === 'GET') {
    return axios({
      method,
      params,
      url: fullUrlFrom(endpoint),
    });
  }
  return axios({
    method,
    data: params,
    url: fullUrlFrom(endpoint),
  });
};

const api = {
  get(endpoint, params) {
    return fetchUrl('get', endpoint, params);
  },
  post(endpoint, params) {
    return fetchUrl('post', endpoint, params);
  },
  put(endpoint, params) {
    return fetchUrl('put', endpoint, params);
  },
  patch(endpoint, params) {
    return fetchUrl('patch', endpoint, params);
  },
  delete(endpoint, params) {
    return fetchUrl('delete', endpoint, params);
  },
};

export default api;
