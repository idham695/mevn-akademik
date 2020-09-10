<template>
  <div>
    <c-header />
    <v-subheader>Profil Mahasiswa</v-subheader>
    <v-simple-table>
      <tbody>
        <tr v-for="(data,key) in datas" :key="key">
          <td>{{data.title}}</td>
          <td>{{data.value}}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-spacer></v-spacer>
  </div>
</template>
<script>
import CHeader from "../../components/CHeader";
import { mapGetters } from "vuex";
export default {
  components: {
    CHeader,
  },
  computed: {
    ...mapGetters({
      mahasiswa: "auth/mahasiswa",
    }),
    datas() {
      return [
        {
          title: "nama",
          value: this.mahasiswa.mahasiswa.nama,
        },
        {
          title: "NIM",
          value: this.mahasiswa.mahasiswa.NIM,
        },
        {
          title: "prodi",
          value: this.mahasiswa.mahasiswa.prodi.nama,
        },
        {
          title: "Tempat/Tanggal lahir",
          value:
            this.mahasiswa.mahasiswa.tempat_lahir +
            " " +
            this.mahasiswa.mahasiswa.tanggal_lahir,
        },
        {
          title: "Alamat",
          value: this.mahasiswa.mahasiswa.alamat,
        },
        {
          title: "Tahun",
          value: this.mahasiswa.mahasiswa.tahun,
        },
      ];
    },
  },
};
</script>