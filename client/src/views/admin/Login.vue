<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Username"
          required
          append-icon="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <div class="text-xs-center">
          <v-btn color="accent lighten-1" :disabled="!valid" @click="submit">
            Login
            <v-icon right dark>lock_open</v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      valid: true,
      username: "",
      usernameRules: [(v) => !!v || "Username harus di isi"],
      showPassword: false,
      password: "",
      passwordRules: [(v) => !!v || "Password harus di isi"],
    };
  },
  computed: {
    ...mapGetters({
      admin: "auth/admin",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setStatusDialog: "dialog/setStatus",
      setAuth: "auth/setAdmin",
    }),
    close() {
      this.setStatusDialog(false);
    },
    submit() {
      if (this.$refs.form.validate()) {
        let formData = {
          username: this.username,
          password: this.password,
        };
        axios
          .post("http://localhost:3200/api/admin/login", formData)
          .then((result) => {
            let user_data = result.data.data;
            this.setAuth(user_data);
            console.log(user_data);
            if (this.admin.accessToken != null) {
              localStorage.setItem("token", this.admin.accessToken);
              console.log(localStorage);
              this.setAlert({
                status: true,
                text: "login success",
                type: "success",
              });
              this.setStatusDialog(false);
              this.$router.push("/admin/home");
            } else {
              this.setAlert({
                status: false,
                text: "login error",
                type: "error",
              });
            }
          })
          .catch((err) => {
            let responses = err.response;
            this.setAlert({
              status: true,
              text: responses.data.message,
              type: "error",
            });
          });
      }
    },
  },
};
</script>