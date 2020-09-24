<template>
  <div>
    <c-header />
    <v-layout justify-center row wrap class="layout-home">
      <h3>Mahasiswa</h3>
    </v-layout>
    <v-spacer></v-spacer>
    <v-layout justify-center row wrap class="mahasiswa">
      <table>
        <tr v-for="(data,key) in datas" :key="key">
          <td colspan="2">{{data.title}}</td>
          <td>:</td>
          <td>
            <strong>{{data.value}}</strong>
          </td>
        </tr>
      </table>
    </v-layout>
    <v-spacer></v-spacer>
    <v-layout justify-center row wrap class="mahasiswa">
      <P>PENGUMUMAN</P>
    </v-layout>
    <v-card class="mahasiswa-card">
      <v-card-title>Database Akademik</v-card-title>
      <v-card-text>Data Akademik yang diperlukan oleh -card dapat diakses secara online. Cara login : Masukan username & password dengan menggunakan NIM(default). Contoh : Username : NIMANDA Password : NIMANDA (Menggunakan Capslock) Demi Keamanan Login, setiap mahasiswa diharapkan untuk merubah PASSWORD Default !</v-card-text>
    </v-card>
    <v-card class="mahasiswa-card">
      <v-card-title>Kartu Hasil Studi</v-card-title>
      <v-card-text>
        Kartu Hasil Studi (KHS) akan dibagikan ke mahasiswa melalui Program Studi 1 bulan setelah Pelaksanaan Ujian Akhir Semester (UAS).
        <br />Permintaan KHS : 1 Bulan Setelah Pelaksanaan Ujian Akhir Semester (UAS)
      </v-card-text>
    </v-card>
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
          title: "Nama",
          value: this.mahasiswa.nama,
        },
        {
          title: "Prodi",
          value: this.mahasiswa.prodi.nama,
        },
        {
          title: "Konsentrasi",
          value: this.mahasiswa.prodi.nama,
        },
        {
          title: "Angkatan",
          value: this.mahasiswa.tahun,
        },
      ];
    },
  },
};
</script>
<style>
.layout-home {
  margin-top: 20px;
}
.layout-home h3 {
  font-size: 28px;
}
.mahasiswa {
  margin-top: 20px;
}
.mahasiswa-card .v-card__title {
  background-color: #05ab51;
}
.mahasiswa-card .v-card__text {
  background-color: cyan;
  text-align: justify;
  margin-bottom: 0;
}
</style>