import Vue from "vue";
import Router from "vue-router";
import Login from "../views/mahasiswa/Login.vue";
import MataKuliah from "../views/mahasiswa/MataKuliah.vue";
import Home from "../views/mahasiswa/Home.vue";
import store from "../store/index";
import AdminHome from "../views/admin/Home.vue";
import AdminLogin from "../views/admin/Login.vue";
import DosenLogin from "../views/dosen/Login.vue";
import DosenHome from "../views/dosen/Home.vue";
import EditPasswordMahasiwa from "../views/mahasiswa/EditPassword.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/mahasiswa/Profile.vue"),
      meta: { auth: true },
    },
    {
      path: "/edit-password/:id",
      name: "EditPassword",
      component: EditPasswordMahasiwa,
      meta: { auth: true },
    },
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/admin/login",
      name: "adminLogin",
      component: AdminLogin,
    },
    {
      path: "/admin/home",
      name: "adminHome",
      component: AdminHome,
      meta: { auth: true },
    },
    {
      path: "/dosen/login",
      name: "dosenLogin",
      component: DosenLogin,
    },
    {
      path: "/dosen/home",
      name: "dosenHome",
      component: DosenHome,
      meta: { auth: true },
    },
    {
      path: "/mataKuliah",
      name: "mataKuliah",
      component: MataKuliah,
      meta: { auth: true },
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { auth: true },
    },
    {
      path: "*",
      redirect: {
        name: "login",
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (localStorage.getItem("token") == null) {
      next("/");
      store.dispatch("alert/set", {
        status: true,
        text: "Login terlebih dahulu",
        color: "error",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
