<template>
  <footer class="footer_" style='padding: 2rem;'>
    <p class="f6">
      <a style='font-size: 1rem; margin-left: 20px;' class="link white-80 hover-light-purple">©소개.</a>

      <a style='font-size: 1rem; margin-left: 20px;' class="link white-80 hover-light-purple" href="#">개인정보처리방침</a>
      /
      <a style='font-size: 1rem; margin-left: 20px;' class="link white-80 hover-gold" href="#">
        이용약관
      </a>
      /
      <a style='font-size: 1rem; margin-left: 20px;' class="link white-80 hover-green" href="#">오시는길
      </a>
      /
      <a style='font-size: 1rem; margin-left: 20px;' class="link white-80 hover-green" href="#">&copy; SSAFY Corp.
      </a>
    </p>
  </footer>
</template>

<script>
export default {
  name: "FooterBar",
};
</script>
<style>
  .footer_{
    bottom: 0px;
    position: absolute;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    width: 100%;
  }
</style>
