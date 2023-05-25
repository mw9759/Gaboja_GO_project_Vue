<template>
    <div>
    <div class='top_'>
      <h3 class='subject'>
        COMMUNITY 
      </h3>
    </div>
    <router-view @search="search" :searchParam="searchParam" ></router-view>
  </div>
</template>

<script>
export default {
    name: "UserBoard",
    data() {
        return {
            searchParam: {
                key: null,
                word: null,
                spp: 18,
                pg: 1,
                num: null,
                type: null,
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
}
</script>
<style scoped>
.top_{
    text-align: center;
    margin-top: 5%;
    margin-bottom: 3%;
    border-bottom: 1px solid;
    font-size: 2.5rem;
  }
h3{
   font-size: 2.5rem;
}
</style>