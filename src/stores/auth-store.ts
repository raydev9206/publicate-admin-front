import { defineStore } from 'pinia';
import { api } from 'boot/axios';
//import { Notify } from 'quasar';
import conf from 'src/conf/conf';
import { Router } from '../router/index';
interface Login {
  username: string;
  password: string;
}

interface Session {
  accessToken: string;
  refresh_token: string;
  roles: string;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    autenticated: false,
    loading: false,
    userFunctions: null,
    expires_in: '',
  }),
  actions: {
    isAuthenticated() {
      return sessionStorage.getItem('accessToken') !== null;
    },
    userRoles() {
      return sessionStorage.getItem('userRoles');
    },
    setSessionStorage(obj: Session) {
      sessionStorage.setItem('userRoles', obj.roles);
      sessionStorage.setItem('accessToken', obj.accessToken);
      sessionStorage.setItem('refresh_token', obj.accessToken);
      this.autenticated = true;
    },
    logout(){
      sessionStorage.removeItem('accessToken');
      Router.push({name:'login'});
    },
    async login(objLogin: Login) {
      let status: number | undefined = 0;
      const result = await api
        .post(
          conf.api.services.auth.login,
          { username: objLogin.username, password: objLogin.password },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .then((result) => result)
        .catch((error) => {
          status = error.response.status;
        })
        .finally(() => {
          this.loading = !this.loading;
        });
      if (status === 0) {
        status = result?.status;
      }
      switch (status) {
        case 200:
        case 201:
          Router.push({name:'business'});
          return this.setSessionStorage(result?.data);
        case 401:
          return {
            error: 401,
            message: 'Usuario o contraseña no válidos.',
          };
        case 502:
          return {
            error: 502,
            message: 'Ha ocurrido un error del servidor',
          };
        case 504:
          return {
            error: 504,
            message: 'Tiempo de respuesta excedido',
          };
        default: ''
      }
    },
  },
});
