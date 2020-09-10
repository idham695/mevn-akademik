<template>
  <div>
    <c-header />
    <v-layout justify-center row wrap class="layout-home">
      <h3>Mahasiswa</h3>
    </v-layout>
    <v-spacer></v-spacer>
    <v-layout justify-center row wrap class="mahasiswa">
      <table>
        <tr>
          <td>Nama</td>
          <td>:</td>
        </tr>
        <tr>
          <td>Program Studi</td>
          <td>:</td>
        </tr>
        <tr>
          <td>Angkatan</td>
          <td>:</td>
        </tr>
      </table>
    </v-layout>
  </div>
</template>
<script>
import CHeader from "../../components/CHeader";
export default {
  components: {
    CHeader,
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
</style>