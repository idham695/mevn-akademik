<template>
  <v-app-bar dark color="primary">
    <v-app-bar-nav-icon v-if="isHome || isAdminHome || isDosenHome" @click="setSideBar(!sideBar)"></v-app-bar-nav-icon>
    <v-btn v-else-if="!isHome" icon @click="$router.go(-1)">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <!-- <v-btn v-else-if="!isAdminHome" icon @click="$router.go(-1)">
      <v-icon>arrow_back</v-icon>
    </v-btn>-->

    <v-toolbar-title class="white--text">Siakad</v-toolbar-title>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "c-header",
  methods: {
    ...mapActions({
      setSideBar: "setSideBar",
    }),
  },
  computed: {
    ...mapGetters({
      sideBar: "sideBar",
    }),
    isHome() {
      return this.$route.path === "/home";
    },
    isAdminHome() {
      return this.$route.path === "/admin/home";
    },
    isDosenHome() {
      return this.$route.path === "/dosen/home";
    },
  },
};
</script>