import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/hand-writing",
    name: "HandWriting",
    component: require("../views/HandWriting.vue").default
  },
  {
    path: "/scratch-card",
    name: "ScratchCard",
    component: require("../views/ScratchCard.vue").default
  },
  {
    path: "/snake",
    name: "Snake",
    component: require("../views/Snake.vue").default
  }
];

const router = new VueRouter({
  routes
});

export default router;
