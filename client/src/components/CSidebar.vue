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
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "c-sidebar",
  data: () => ({
    items: [
      { title: "Home", icon: "dashboard", route: "home" },
      { title: "About", icon: "question_answer", route: "about" },
      { title: "Logout", icon: "settings_power", route: "login" },
    ],
  }),
  computed: {
    ...mapGetters({
      sideBar: "sideBar",
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
    }),
  },
};
</script>