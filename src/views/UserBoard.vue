<template>
    <div>
    <div class='top_'>
      <h3 class='subject'>
        커뮤니티 
      </h3>
    </div>
    <router-view @search="search" :searchParam="searchParam" ></router-view>
  </div>
</template>

<script>


</script>
<style scoped>
.top_{
    text-align: center;
    margin: 5%;
    border-bottom: 1px solid;
    font-size: xx-large;
  }
</style>