<template>
  <div class="custom-div">
    <b-navbar toggleable="lg" type="dark" class="custom-nav container">
      <b-navbar-brand href="#">
        <router-link to="/">
          가보자GO!
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" style="background-color: #007bff;"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"
            ><router-link :to="{ name: 'home' }" class="link"
              ><b-icon icon="house" font-scale="1.5"></b-icon> 홈</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'board' }" class="link"
              ><b-icon icon="journal" font-scale="1.5"></b-icon> 게시판</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'instagram' }" class="link"
              ><b-icon icon="instagram" font-scale="1.5"></b-icon> 여행일기</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'house' }" class="link"
              ><b-icon icon="house-fill" font-scale="1.5"></b-icon> 여행상품</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'trip' }" class="link"
              ><b-icon icon="truck" font-scale="1.5"></b-icon> 여행정보</router-link
            ></b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
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
export default {
  name: "HeaderNaviBar",
};
</script>

<style>
.custom-nav {
  background-color: white; /* 원하는 색상으로 변경 */
}
.custom-nav>a{
  font-size: 2rem;
  font-weight: 900;
}
.custom-div{
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}
a{
  color: #007bff !important;
}
</style>
