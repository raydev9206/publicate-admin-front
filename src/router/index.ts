import { route } from 'quasar/wrappers';
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';
import routes from './routes';
import { useAuthStore } from 'src/stores/auth-store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === 'history'
  ? createWebHistory
  : createWebHashHistory;

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  history: createHistory(
    process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
  ),
});

export default route(function ({ /* store, ssrContext */ }) {
  const authStore = useAuthStore(); // Access the Pinia store instance
  Router.beforeEach((to, from, next) => {
    const isAuth = authStore.isAuthenticated();
    if (to.name !== 'login' && !isAuth) {
      next({ name: 'login' });
    } else {
      next();
    }
  });

  return Router;
});
