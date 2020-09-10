<template>
  <div>
    <c-header />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>No</th>
            <th>Kelompok</th>
            <th>Penjelasan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in mataKuliah" :key="item.name">
            <td>{{item.no}}</td>
            <td>{{item.kelompok}}</td>
            <td>{{item.penjelasan}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import CHeader from "../../components/CHeader";
export default {
  data() {
    return {
      mataKuliah: [
        {
          no: 1,
          kelompok: "MPK",
          penjelasan: "	Mata Kuliah Pengembangan Kepribadian",
        },
        {
          no: 2,
          kelompok: "MKK",
          penjelasan: "	Mata Kuliah Keilmuan dan Keterampilan",
        },
        {
          no: 3,
          kelompok: "MKB",
          penjelasan: "	Mata Kuliah Keahlian Berkarya",
        },
        {
          no: 4,
          kelompok: "MPB",
          penjelasan: "	Mata Kuliah Perilaku Berkarya",
        },
        {
          no: 5,
          kelompok: "MBB",
          penjelasan: "	Mata Kuliah Berkehidupan Bermasyarakat",
        },
      ],
    };
  },
  components: {
    CHeader,
  },
};
</script>
