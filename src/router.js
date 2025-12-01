import { createRouter , createWebHistory } from "vue-router";

import UserBlog from './layouts/UserBlog.vue';
import AdminBlog from './layouts/Admin.vue';
import NoticiaDetalhe from './layouts/BlogDetails.vue';
const routes = [
  {
    path: '/',
    name: 'UserBlog',
    component: UserBlog
  },
  {
    path: '/Admin/Blog',
    name: 'Admin',
    component: AdminBlog
  },
   {
    path: '/noticia/:id',
    name: 'NoticiaDetalhe',
    component: NoticiaDetalhe,
    props: true
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;