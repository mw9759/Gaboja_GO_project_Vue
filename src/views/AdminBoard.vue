<template>
  <div>
    <router-view @search="search" :searchParam="searchParam"></router-view>
  </div>
</template>

<script>
export default {
  name: "AdminBoard",
  data() {
    return {
      searchParam: {
        key: "subject",
        word: null,
        spp: 20,
        pg: 1,
        num: null,
      },
    };
  },
  methods: {
    search(searchParam) {
      this.searchParam.key = searchParam.key;
      this.searchParam.word = searchParam.word;
      this.searchParam.spp = searchParam.spp;
      this.searchParam.pg = searchParam.pg;
      this.searchParam.num = searchParam.num;
    },
  },
};
</script>

<style></style>
