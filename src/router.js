import { createRouter , createWebHistory } from "vue-router";
import blog from './layouts/blog.vue';
import editBlog from './layouts/editBlog.vue';

const routes = [
  {
    path: '/Blog-para-voce',
    name: 'Blog',
    component: blog
  },
  {
    path: '/edit-blog',
    name: 'EditBlog',
    component: editBlog
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;