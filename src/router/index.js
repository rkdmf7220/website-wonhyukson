import { createRouter, createWebHistory } from "vue-router";
import Sculpture from "../views/Sculpture.vue";

const gnb = [
  {
    path: "/sculpture",
    name: "Sculpture",
    component: Sculpture,
    meta: {
      isWorks: true,
    },
  },
  {
    path: "/painting",
    name: "Painting",
    component: () => import("../views/Painting"),
    meta: {
      isWorks: true,
    },
  },
  {
    path: "/typography",
    name: "Typography",
    component: () => import("../views/Typography.vue"),
    meta: {
      isWorks: true,
    },
  },
  {
    path: "/review",
    name: "Review",
    component: () => import("../views/Review.vue"),
    meta: {
      cssClass: "margin-to-works",
    },
  },
  {
    path: "/archive",
    name: "Archive",
    component: () => import("../views/Archive.vue"),
  },
  {
    path: "/cv",
    name: "CV",
    component: () => import("../views/CV.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () => import("../views/News.vue"),
  },
];

const routes = [
  {
    path: "/",
    name: "Intro",
    component: () => import("../views/Intro"),
    // redirect: '/sculpture'
  },
  {
    path: "/:works/:id",
    name: "DetailPage",
    component: () => import("../components/Detail"),
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/Main"),
  },
  ...gnb,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  gnb,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
