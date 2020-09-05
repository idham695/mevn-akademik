import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login.vue";
import About from "../views/About.vue";
import Home from "../views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
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
