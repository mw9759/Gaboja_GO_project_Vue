<template>
  <div id="app">
    <navi-bar />
    <div class="contentWrapper">
      <router-view class="contents_" />
    </div>
    <footer-bar />
  </div>
</template>

<script>
import NaviBar from "@/components/layout/HeaderNaviBar.vue";
import FooterBar from "@/components/layout/Footer.vue";
export default {
  name: "App",
  components: {
    NaviBar,
    FooterBar,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jua&display=swap");
#app {
  font-family: "Jua", sans-serif;
  margin: 0px;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.contentWrapper {
  flex: 1;
}
.contents_ {
  height: 100%;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
a:hover {
  text-decoration: none;
  font-weight: bold;
}
* {
  box-sizing: content-box;
}
</style>
