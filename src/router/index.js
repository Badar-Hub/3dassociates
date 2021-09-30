import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About Us',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/shop/products',
    name: 'Products',
    component: () => import('../components/General/ShopPage.vue'),
    meta: {
      heading: 'Products',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
