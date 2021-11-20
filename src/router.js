import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history', // to disappear the # in URL's
  base: process.env.BASE_URL,
  routes: [
    //HOME
    {
      name: 'Home',
      path: '/',
      component: () => import('@/components/Home.vue'),
    },
    //LOGIN
    {
         name: 'Login',
         path: '/login',
         //component: () => import('@/views/login/Login'),
         component: () => import('@/components/Login.vue'),
    },
    //REGISTER
    {
        name: 'Register',
        path: '/register',
        component: () => import('@/components/Register.vue'),
    },
    //FORGOT PASSWORD
    {
      name: 'Forgot',
      path: '/forgot',
      component: () => import('@/components/Forgot.vue'),
    },
    //DASHBOARD
    {
      //name: 'Dashboard',
      path: '/dash',
      name: 'dashboard',
      component: () => import('@/views/dashboard/Index'),
      children: [
        //CLIENTS
        {
          name: 'Clients',
          path: '/Clients',
          component:()=> import('@/views/clientss/Clientss')
        },
        //SALES
        {
          name: 'Sales',
          path: '/sales',
          component:()=> import('@/views/sales/Sales')
        },
        //NUEVA VENTA
        {
          name: 'newSale',
          path: '/new-sale',
          component:()=> import('@/views/sales/NewSale')
        },
        //productos
        {
          name: 'Productos',
          path: '/products',
          component:()=> import('@/views/articulos/Products')
        },
        //listar articulos
        {
          name: 'ListarArticulos',
          path: '/articulos',
          component:()=> import('@/views/articulos/ListarArticulos')
        },
        //crear articulo
        {
          name: 'CrearArticulo',
          path: '/articulos/crear',
          component:()=> import('@/views/articulos/CrearArticulo')
        },
         //editar articulo
         {
          name: 'EditarArticulo',
          path: '/articulos/editar/:id',
          component:()=> import('@/views/articulos/EditarArticulo')
        },
        // INICIO
        {
          name: 'DASHBOARD',
          path: '/dashboard',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'PROVEEDORES',
          path: '/providers',
          component: () => import('@/views/providers/Provider'),
        },
        {
          name: 'USUARIOS',
          path: '/users',
          component: () => import('@/views/users/User'),
        },
        {
          name: 'REPORTES',
          path: '/reports',
          component: () => import('@/views/reports/Report'),
        },
        {
          name: 'SETTINGS',
          path: '/settings',
          component: () => import('@/views/Config'),
        },

        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },

        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },


      ],
    },
  ],
})
