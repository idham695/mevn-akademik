<template >
  <v-navigation-drawer v-model="drawer" absolute fixed clipped>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="drawer=false">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Siakad</v-toolbar-title>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-item
        v-for="(item,index) in items"
        :key="index"
        :href="item.route"
        :to="{name:item.route}"
      >
        <v-list-item-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>
        <!-- <v-btn
          block
          small
          rounded
          depressed
          color="error lighten-1"
          class="white--text"
          @click.stop="item.click()"
        >
          Logout
          <v-icon small right dark>settings_power</v-icon>
        </v-btn>-->
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "c-sidebar",

  computed: {
    items() {
      if (this.mahasiswa.mahasiswa) {
        return [
          { title: "Home", icon: "dashboard", route: "home", auth: true },
          {
            title: "Mata Kuliah",
            icon: "question_answer",
            route: "mataKuliah",
            auth: true,
          },
          { title: "Profile", icon: "person", route: "profile", auth: true },
          { click: this.logout },
        ];
      } else if (this.dosen.dosen) {
        return [
          { title: "Home", icon: "dashboard", route: "dosenHome", auth: true },
          { click: this.dosenLogout },
        ];
      } else if (this.admin.admin) {
        return [
          { title: "Home", icon: "dashboard", route: "adminHome", auth: true },
          { click: this.adminLogout },
        ];
      } else {
        return true;
      }
    },
    ...mapGetters({
      sideBar: "sideBar",
      mahasiswa: "auth/mahasiswa",
      dosen: "auth/dosen",
      admin: "auth/admin",
    }),
    drawer: {
      get() {
        return this.sideBar;
      },
      set(value) {
        this.setSideBar(value);
      },
    },
  },
  methods: {
    ...mapActions({
      setSideBar: "setSideBar",
      setAuthMahasiswa: "auth/setMahasiswa",
      setAuthAdmin: "auth/setAdmin",
      setAuthDosen: "auth/setDosen",
      setAlert: "alert/set",
    }),
    logout() {
      if (localStorage.getItem("token") != null) {
        localStorage.removeItem("token");
        this.setAuthMahasiswa({});
        this.setAlert({
          status: true,
          text: "Logout Berhasil",
          type: "success",
        });
        this.$router.push("/login");
      } else {
        this.setAlert({
          status: true,
          text: "Logout Gagal",
          type: "error",
        });
      }
      this.setSideBar(false);
    },
    adminLogout() {
      if (localStorage.getItem("token") != null) {
        localStorage.removeItem("token");
        this.setAuthAdmin({});
        this.setAlert({
          status: true,
          text: "Logout Berhasil",
          type: "success",
        });
        this.$router.push("/admin/login");
      } else {
        this.setAlert({
          status: true,
          text: "Logout Gagal",
          type: "error",
        });
      }
      this.setSideBar(false);
    },
    dosenLogout() {
      if (localStorage.getItem("token") != null) {
        localStorage.removeItem("token");
        this.setAuthDosen({});
        this.setAlert({
          status: true,
          text: "Logout Berhasil",
          type: "success",
        });
        this.$router.push("/dosen/login");
      } else {
        this.setAlert({
          status: true,
          text: "Logout Gagal",
          type: "error",
        });
      }
      this.setSideBar(false);
    },
  },
};
</script>