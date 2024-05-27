import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('../layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Login/LoginView.vue'),
        name: 'login',
      },
    ],
  },
  {
    path: '/business',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Business/BusinessListView.vue'),
        name: 'business',
      },
      {
        path: 'add',
        component: () => import('src/pages/Business/BusinessAddView.vue'),
        name: 'business_add',
      },
      {
        path: 'details/:id',
        component: () => import('src/pages/Business/BusinessDetailsView.vue'),
        name: 'business_details',
      },
    ],
  },
  {
    path: '/category',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Category/CategoryListView.vue'),
        name: 'category',
      },
      {
        path: 'add',
        component: () => import('src/pages/Category/CategoryAddView.vue'),
        name: 'category_add',
      },
      {
        path: 'details/:id',
        component: () => import('src/pages/Category/CategoryDetailsView.vue'),
        name: 'category_details',
      },
    ],
  },
  {
    path: '/scategory',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Scategory/ScategoryListView.vue'),
        name: 'scategory',
      },
      {
        path: 'add',
        component: () => import('src/pages/Scategory/ScategoryAddView.vue'),
        name: 'scategory_add',
      },
      {
        path: 'details/:id',
        component: () => import('src/pages/Scategory/ScategoryDetailsView.vue'),
        name: 'scategory_details',
      },
    ],
  },
  {
    path: '/offer',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Offer/OfferListView.vue'),
        name: 'offer',
      },
      {
        path: 'add',
        component: () => import('src/pages/Offer/OfferAddView.vue'),
        name: 'offer_add',
      },
      {
        path: 'details/:id',
        component: () => import('src/pages/Offer/OfferDetailsView.vue'),
        name: 'offer_details',
      },
    ],
  },
  {
    path: '/specification',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Specification/SpecificationListView.vue'),
        name: 'specification',
      },
      {
        path: 'add',
        component: () => import('src/pages/Specification/SpecificationAddView.vue'),
        name: 'specification_add',
      },
      {
        path: 'details/:id',
        component: () => import('src/pages/Specification/SpecificationDetailsView.vue'),
        name: 'specification_details',
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../layouts/MainLayout.vue'),
    name: 'admin',
    children: [
      {
        path: 'user',
        children: [
          {
            path: '',
            component: () => import('src/pages/Security/User/UserListView.vue'),
            name: 'user',
          },
          {
            path: 'add',
            component: () => import('src/pages/Security/User/UserAddView.vue'),
            name: 'user_add',
          }
        ],
      },
    ],
  },
  {
    path: '/',
    name: 'index',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
