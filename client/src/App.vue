<template>
  <v-app>
    <c-header />
    <c-sidebar />
    <v-main>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-main>
    <c-footer />
    <c-alert />

    <keep-alive>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialogbottom-transition">
        <component :is="currentComponent"></component>
      </v-dialog>
    </keep-alive>
  </v-app>
</template>
<script>
import CAlert from "./components/CAlert";
import CHeader from "./components/CHeader";
import CSidebar from "./components/CSidebar";
import CFooter from "./components/CFooter";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    CAlert,
    CHeader,
    CSidebar,
    CFooter,
  },
  methods: {
    ...mapActions({
      setStatusDialog: "dialog/setStatus",
    }),
  },
  computed: {
    ...mapGetters({
      statusDialog: "dialog/status",
      currentComponent: "dialog/component",
    }),
    dialog: {
      get() {
        return this.statusDialog;
      },
      set(value) {
        this.setStatusDialog(value);
      },
    },
  },
};
</script>

<style>
.v-toolbar {
  flex: 0 !important;
}
.v-application .py-3 {
  text-align: center !important;
}
.v-card__text {
  text-align: center !important;
}
</style>