import { createRouter , createWebHistory } from "vue-router";
import blog from './layouts/blog.vue';

const routes = [
  {
    path: '/',
    name: 'Blog',
    component: blog
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;