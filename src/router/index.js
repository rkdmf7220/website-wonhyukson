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
    meta: {
      isWorks: true
    },
    children: [
      {
        path: '/sculpture/:id',
        name: 'Detail',
        component: () => import('../views/Detail'),
      }
    ]
  },
  {
    path: '/painting',
    name: 'Painting',
    component: () => import('../views/Painting'),
    meta: {
      isWorks: true
    }
  },
  {
    path: '/typography',
    name: 'Typography',
    component: () => import('../views/Typography.vue'),
    meta: {
      isWorks: true
    }
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('../views/Video.vue'),
    meta: {
      isWorks: true
    }
  },
  {
    path: '/archive',
    name: 'Archive',
    component: () => import('../views/Archive.vue'),
    meta: {
      cssClass: 'margin-to-works'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/cv',
    name: 'CV',
    component: () => import('../views/CV.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
