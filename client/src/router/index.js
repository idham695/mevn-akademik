import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "http://localhost:3000",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "*",
      redirect: {
        name: "home",
      },
    },
  ],
});

export default router;
