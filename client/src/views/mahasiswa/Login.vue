<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="NIM" :rules="nimRules" label="Username" required append-icon="email"></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          hint="masukan NIM anda sebagai password"
          counter
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
// import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "login",
  data() {
    return {
      valid: true,
      NIM: "",
      nimRules: [(v) => !!v || "Username harus di isi"],
      showPassword: false,
      password: "",
      passwordRules: [(v) => !!v || "Password harus di isi"],
    };
  },
  computed: {
    ...mapGetters({
      mahasiswa: "auth/mahasiswa",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setStatusDialog: "dialog/setStatus",
      setAuth: "auth/setMahasiswa",
    }),
    close() {
      this.setStatusDialog(false);
    },
    submit() {
      if (this.$refs.form.validate()) {
        let formData = {
          NIM: this.NIM,
          password: this.password,
        };
        axios
          .post("http://localhost:3200/api/mahasiswa/login", formData)
          .then((result) => {
            console.log(result);
            localStorage.setItem("token", result.data.token);
            // const mahasiswa = JSON.parse(atob(user_data.split(".")[1]));
            this.setAuth(result.data.mahasiswa);
            // console.log(user_data);
            // console.log(localStorage.getItem("token"));
            this.setAlert({
              status: true,
              text: "login success",
              type: "success",
            });
            this.setStatusDialog(false);
            this.$router.push("/home");
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