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
      </v-list-item>
      <v-list-item>
        <v-btn
          block
          small
          rounded
          depressed
          color="error lighten-1"
          class="white--text"
          @click.stop="logout();"
        >
          Logout
          <v-icon small right dark>settings_power</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "c-sidebar",
  data: () => ({
    items: [
      { title: "Home", icon: "dashboard", route: "home", auth: true },
      { title: "About", icon: "question_answer", route: "about", auth: true },
      { title: "Profile", icon: "person", route: "profile", auth: true },
    ],
  }),
  computed: {
    ...mapGetters({
      sideBar: "sideBar",
      mahasiswa: "auth/mahasiswa",
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
      setAuth: "auth/set",
      setAlert: "alert/set",
    }),
    logout() {
      if (localStorage.getItem("token") != null) {
        localStorage.removeItem("token");
        this.setAuth({});
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
  },
};
</script>