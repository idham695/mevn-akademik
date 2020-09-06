<template>
  <div>
    <c-header />
    <v-card flat>
      <v-container>
        <v-simple-table>
          <tbody>
            <tr v-for="(value, key) in mahasiswa.mahasiswa" :key="key">
              <td>{{key}}</td>
              <td>{{value}}</td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-spacer></v-spacer>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import CHeader from "../components/CHeader";
import { mapGetters } from "vuex";
export default {
  components: {
    CHeader,
  },
  computed: {
    ...mapGetters({
      mahasiswa: "auth/mahasiswa",
    }),
  },
};
</script>