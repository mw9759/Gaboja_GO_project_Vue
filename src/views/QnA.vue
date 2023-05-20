<template>
  <div>
    <div class='top_'>
      <h3 class='subject'>
        Q&A 
      </h3>
    </div>
    <router-view @search="search" :searchParam="searchParam" ></router-view>
  </div>

</template>
<script>
export default {
  name: "QnA",
  data() {
    return {
      searchParam: {
        key: null,
        word: null,
        spp:20,
        pg: 1,
        num: null,
        type:null,
      },
    }
  },
  methods: {
    search(searchParam) {
      this.searchParam.key = searchParam.key;
      this.searchParam.word = searchParam.word;
      this.searchParam.spp = searchParam.spp;
      this.searchParam.pg = searchParam.pg;
      this.searchParam.num = searchParam.num;
      this.searchParam.type = searchParam.type;
    }
  }
};

</script>
<style scoped>
  .top_{
    text-align: center;
    margin: 5%;
    border-bottom: 1px solid;
    font-size: xx-large;
  }
</style>
