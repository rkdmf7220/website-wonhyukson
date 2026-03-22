import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";

const gnb = [
  {
    path: "/:lang(ko|en)/works",
    name: "Works",
    component: () => import("../views/Works.vue"),
    meta: {
      isWorks: true,
    },
  },
  /*{
    path: "/:lang(ko|en)/sculpture",
    name: "Sculpture",
    component: () => import("../views/Sculpture.vue"),
    meta: {
      isWorks: true,
    },
  },
  {
    path: "/:lang(ko|en)/painting",
    name: "Painting",
    component: () => import("../views/Painting.vue"),
    meta: {
      isWorks: true,
    },
  },*/
  {
    path: "/:lang(ko|en)/typography",
    name: "Typography",
    component: () => import("../views/Typography.vue"),
    meta: {
      isWorks: true,
    },
  },
  {
    path: "/:lang(ko|en)/texts",
    name: "Texts",
    component: () => import("../views/Texts.vue"),
    meta: {
      cssClass: "margin-to-works",
    },
  },
  {
    path: "/:lang(ko|en)/archives",
    name: "Archives",
    component: () => import("../views/Archives.vue"),
  },
  {
    path: "/:lang(ko|en)/cv",
    name: "CV",
    component: () => import("../views/CV.vue"),
  },
  {
    path: "/:lang(ko|en)/news",
    name: "News",
    component: () => import("../views/News.vue"),
  },
];

const routes = [
  {
    path: "/",
    name: "Intro",
    redirect: '/en/main'
  },
  /*{
    path: "/",
    name: "Intro",
    component: () => import("../views/Intro.vue"),
    // redirect: '/sculpture'
  },*/
  {
    path: "/:lang(ko|en)/:works(works|typography|texts|archives|news)/:id",
    name: "DetailPage",
    component: () => import("../components/Detail.vue"),
  },
  {
    path: "/:lang(ko|en)/main",
    name: "Main",
    component: Main,
  },
  {
    path: "/:lang(ko|en)/search/:keyword",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
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
