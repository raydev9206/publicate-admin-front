import { boot } from 'quasar/wrappers';
import axios from 'axios';
import qs from 'qs';
import conf from '../conf/conf.js';

const api = axios.create({
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
  baseURL: conf.api.baseUrl,
});

export default boot(({ app, router }) => {
  app.config.globalProperties.$axios = axios;

  api.interceptors.request.use((config) => {
      if (!config.headers.Authorization) {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401: {
            router.push('/login');
            break;
          }
        }
      }
      return Promise.reject(error);
    }
  );

  app.config.globalProperties.$api = api;
});

export { api };
