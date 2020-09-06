import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login.vue";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
// import store from "../store/index";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/Profile.vue"),
    },
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
        name: "login",
      },
    },
  ],
});
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.auth)) {
//     if (localStorage.getItem("token") == null) {
//       store.dispatch("alert/set", {
//         status: true,
//         text: "Login First",
//         color: "error",
//       });
//       store.dispatch("setPrevUrl", to.path);
//       next({
//         path: "/",
//       });
//     }
//   } else {
//     next();
//   }
// });
export default router;
