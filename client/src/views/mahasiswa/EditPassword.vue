<template>
  <v-card>
    <c-header />
    <v-subheader>Edit Password Mahasiswa</v-subheader>
    <v-divider></v-divider>
    <v-container fluid>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="New Password"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <!-- <v-text-field
          v-model="confirmationPassword"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :rules="confirmationpasswordRules"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>-->
        <div class="text-xs-center">
          <v-btn color="accent lighten-1" :disabled="!valid" @click="submit">
            Edit Password
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
// import mahasiswaHeader from "../../helper/MahasiswaHeader";
// import Role from "../../helper/Role";
import CHeader from "../../components/CHeader";
export default {
  name: "login",
  components: {
    CHeader,
  },
  data() {
    return {
      valid: true,
      showPassword: false,
      password: "",
      // confirmationPassword: "",
      passwordRules: [(v) => !!v || "Password harus di isi"],
      // confirmationpasswordRules: [
      //   (v) => !!v || "Konfirmasi Password harus di isi",
      // ],
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
    // mahasiswaHeader() {
    //   let token = this.mahasiswa;
    //   if (token && token.accessToken) {
    //     return { "x-access-token": token.accessToken };
    //   } else {
    //     return {};
    //   }
    // },
    submit() {
      // if (this.confirmationPassword != this.password) {
      //   this.setAlert({
      //     status: false,
      //     text: "password konfirmasi tidak sama dengan password",
      //     type: "error",
      //   });
      // } else {
      if (this.$refs.form.validate()) {
        let formData = {
          password: this.password,
        };
        axios
          .put(
            `http://localhost:3200/api/mahasiswa/editPassword/${this.mahasiswa._id}`,
            formData,
            {
              headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
            // (axios.defaults.headers.common["authorization"] =
            //   "Bearer " + localStorage.getItem("token")),
          )
          .then((result) => {
            let user_data = result.data.data;
            this.setAuth(user_data);
            this.setAlert({
              status: true,
              text: "ubah password berhasil silahkan untuk login lagi",
              type: "success",
            });
            this.setAuth({});
            this.$router.push("/");
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
      // }
    },
  },
};
</script>