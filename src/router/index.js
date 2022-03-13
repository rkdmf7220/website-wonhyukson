import { createRouter, createWebHashHistory } from 'vue-router'
import Sculpture from '../views/Sculpture.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/sculpture',
  },
  {
    path: '/sculpture',
    name: 'Sculpture',
    component: Sculpture,
    gnb: true
  },
  {
    path: '/painting',
    name: 'Painting',
    component: () => import('../views/Painting'),
    gnb: true
  },
  {
    path: '/typography',
    name: 'Typography',
    component: () => import('../views/Typography.vue'),
    gnb: true
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('../views/Video.vue'),
    gnb: true
  },
  {
    path: '/archive',
    name: 'Archive',
    component: () => import('../views/Archive.vue'),
    gnb: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    gnb: true
  },
  {
    path: '/cv',
    name: 'CV',
    component: () => import('../views/CV.vue'),
    gnb: true
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    gnb: true
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/Detail')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
