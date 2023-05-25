<template>
  <div class="custom-div">
    <b-navbar toggleable="lg" type="dark" class="custom-nav container">
      <b-navbar-brand href="#">
        <router-link to="/"> <span style="color: #007bff"> 가보자GO!</span> </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" style="background-color: #007bff"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"
            ><router-link :to="{ name: 'home' }" class="link"
              ><b-icon icon="house" font-scale="1.5"></b-icon> 홈</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'adminboardlist' }" class="link"
              ><b-icon icon="megaphone" font-scale="1.5"></b-icon> 공지사항</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'qna' }" class="link"
              ><b-icon icon="question-circle" font-scale="1.5"></b-icon> QnA</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'userboardlist' }" class="link"
              ><b-icon icon="clipboard" font-scale="1.5"></b-icon> 커뮤니티</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'tripsearch' }" class="link"
              ><b-icon icon="map" font-scale="1.5"></b-icon> 여행정보</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'travelplan' }" class="link"
              ><b-icon icon="pin" font-scale="1.5"></b-icon> 여행계획</router-link
            ></b-nav-item
          >
        </b-navbar-nav>

        <!-- after login -->
        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center">
            <!--<b-avatar variant="primary" v-text="userInfo.userId.charAt(0).toUpperCase()">
            </b-avatar>-->
            <router-link :to="{ name: 'Profile' }" class="link align-self-center">
              <b-avatar size="35">
                <img :src="userInfo.profileImg" alt="Profile" />
              </b-avatar>
              <span style="color: gray; vertical-align: middle">
                {{ userInfo.userName }}({{ userInfo.userId }})님 환영합니다.
              </span>
            </router-link>
          </b-nav-item>
          <b-nav-item class="align-self-center link" @click.prevent="onClickLogout"
            ><span style="color: red">로그아웃</span></b-nav-item
          >
        </b-navbar-nav>

        <!-- before login -->
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="people" font-scale="2"></b-icon>
            </template>
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'login_join' }" class="link"
                ><b-icon icon="person-circle"></b-icon> 회원가입</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'login_join' }" class="link"
                ><b-icon icon="key"></b-icon> 로그인</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  name: "HeaderNaviBar",
  data() {
    return {};
  },

  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  watch: {},
  methods: {
    ...mapActions(memberStore, ["userLogout"]),

    onClickLogout() {
      console.log(this.userInfo.userId);
      this.userLogout(this.userInfo.userId); // 임포트한 로그아웃 매서드 호출. 인자값: 로그인한 유저의 아이디.
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "home" });
    },
  },
};
</script>

<style>
.custom-nav {
  background-color: white; /* 원하는 색상으로 변경 */
}
.custom-nav > a {
  font-size: 2rem;
  font-weight: 900;
}
.custom-div {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
a {
  color: black !important;
}
</style>
