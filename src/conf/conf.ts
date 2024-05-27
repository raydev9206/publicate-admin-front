export default {
  api: {
    baseUrl: 'https://publicate-nest-be.onrender.com/',
    services: {
      auth: {
        login: '/auth/signin',
      },
      business: {
        list: '/business/search',
        add: '/business',
        edit: '/business',
        del: '/business',
      },
      category: {
        list: '/category/search',
        add: '/category',
        edit: '/category',
        del: '/category',
      },
      scategory: {
        list: '/subcategory/search',
        add: '/subcategory',
        edit: '/subcategory',
        del: '/subcategory',
      },
      offer: {
        list: '/offer/search',
        add: '/offer',
        edit: '/offer',
        del: '/offer',
      },
      specification: {
        list: '/specification/search',
        add: '/specification',
        edit: '/specification',
        del: '/specification',
      },
      user: {
        list: '/user/search',
        add: '/user',
        edit: '/user',
        del: '/user',
      },
    },
  },
};
