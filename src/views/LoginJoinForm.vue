<template>
  <!-- 로그인 / 회원가입 창 -->
  <section class="section_login_join" id="section_login_join">
    <div class="user_options-container">
      <div class="user_options-text">
        <div class="user_options-unregistered">
          <h2 class="user_unregistered-title">Don't have an account?</h2>
          <p class="user_unregistered-text">
            Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art
            fap.
          </p>
          <button class="user_unregistered-signup" id="signup-button" @click="mvSignup">
            Sign up
          </button>
        </div>

        <div class="user_options-registered">
          <h2 class="user_registered-title">Have an account?</h2>
          <p class="user_registered-text">
            Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art
            fap.
          </p>
          <button class="user_registered-login" id="login-button" @click="mvLogin">Login</button>
        </div>
      </div>

      <div class="user_options-forms" ref="userForms">
        <div class="user_forms-login">
          <h2 class="forms_title">Login</h2>
          <form id="form-login" method="POST" class="forms_form" action="/user/login">
            <fieldset class="forms_fieldset">
              <!-- 쿠키 값이 있는 경우 -->
              <div class="forms_field" v-if="login.userid">
                <input
                  id="id_"
                  type="text"
                  placeholder="아이디"
                  class="forms_field-input"
                  required="required"
                  name="userid"
                  autofocus="autofocus"
                  v-model="login.userid"
                />
                <div class="form-check mb-3 float-end" style="margin-top: 10px">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="ok"
                    id="saveid"
                    name="saveid"
                    v-model="login.isChecked"
                  />
                  <label class="form-check-label" for="saveid"> 아이디저장 </label>
                </div>
              </div>
              <!-- 쿠키 값이 없는 경우 -->
              <div class="forms_field" v-else>
                <input
                  id="id_"
                  type="text"
                  placeholder="아이디"
                  class="forms_field-input"
                  required="required"
                  name="userid"
                  autofocus="autofocus"
                  v-model="login.userid"
                />
                <div class="form-check mb-3 float-end" style="margin-top: 10px">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="ok"
                    id="saveid"
                    name="saveid"
                    v-model="login.isChecked"
                  />
                  <label class="form-check-label" for="saveid"> 아이디저장 </label>
                </div>
              </div>

              <div class="forms_field">
                <input
                  id="password_"
                  type="password"
                  placeholder="비밀번호"
                  name="userpwd"
                  class="forms_field-input"
                  required="required"
                  v-model="login.userpwd"
                />
              </div>
              <p style="color: #e8716d; margin-top: 10px">{{ login.failLogin }}</p>
            </fieldset>
            <div class="forms_buttons">
              <button type="button" class="forms_buttons-forgot" id="mvfindPwId">
                비밀번호 | 아이디 찾기
              </button>
              <input
                id="btn-login"
                type="button"
                value="Log In"
                class="forms_buttons-action"
                v-on:click="doLogin"
              />
            </div>
          </form>
        </div>

        <div class="user_forms-signup">
          <h2 class="forms_title">Sign Up</h2>
          <form id="form-join" method="POST" class="forms_form" action="">
            <fieldset class="forms_fieldset">
              <div class="forms_field">
                <input
                  id="ID"
                  type="text"
                  placeholder="아이디"
                  class="forms_field-input"
                  required="required"
                  name="userid"
                  style="margin-right: 5px"
                  @input="idDuplicate"
                  v-model="join.userid"
                />
                <div id="idcheck-result" :style="{ color: join.color }">
                  {{ join.idcheckResult }}
                </div>
                <!-- <input type='button' value='ID중복확인' class='forms_buttons-action'
									style="font-size: 1.5rem; padding: 7px 20px;" id="idcheck"> -->
              </div>
              <div class="forms_field">
                <input
                  id="pwd"
                  :type="join.pwdType"
                  placeholder="비밀번호"
                  class="forms_field-input"
                  name="userpwd"
                  required="required"
                  style="margin-right: 5px"
                  @input="isSame"
                  v-model="join.password1"
                />
                <label>
                  <input
                    type="checkbox"
                    id="isShowMemberPw"
                    v-model="join.pwdshow"
                    @input="showAndHide"
                  />
                  <span id="isShowMemberPwText">보이기</span>
                </label>
              </div>
              <div class="forms_field">
                <input
                  :type="join.pwdType"
                  placeholder="비밀번호 확인"
                  class="forms_field-input"
                  required="required"
                  id="checkpwd"
                  @input="isSame"
                  v-model="join.password2"
                />
                <div id="pidback" :style="{ color: join.pwdcolor }">{{ join.pwdcheckResult }}</div>
              </div>
              <div class="forms_field">
                <input
                  id="name"
                  type="text"
                  placeholder="이름"
                  v-model="join.userName"
                  class="forms_field-input"
                  required="required"
                />
              </div>
              <div class="forms_field">
                <input
                  type="text"
                  style="width: 20%"
                  name="mobile1"
                  id="mobile1"
                  value="010"
                  class="forms_field-input"
                  required="required"
                  readonly="readonly"
                />
                <input
                  type="text"
                  style="width: 30%"
                  name="fnum"
                  id="mobile2"
                  placeholder="앞자리"
                  maxlength="4"
                  class="forms_field-input"
                  required="required"
                  v-model="join.fnum"
                />
                <input
                  type="text"
                  style="width: 30%"
                  name="bnum"
                  id="mobile3"
                  placeholder="뒷자리"
                  maxlength="4"
                  class="forms_field-input"
                  required="required"
                  v-model="join.bnum"
                />
              </div>

              <div class="forms_field">
                <input
                  type="text"
                  placeholder="Email"
                  class="forms_field-input"
                  required="required"
                  style="width: 38%"
                  v-model="join.emailid"
                  id="email1"
                />@
                <input
                  type="text"
                  placeholder="Domain"
                  class="forms_field-input"
                  required="required"
                  readonly="readonly"
                  style="width: 38%"
                  ref="emaildomain"
                  id="email2"
                  value="도메인선택"
                  v-model="join.emailDomain"
                />
                <select name="emailDomain" id="emailChoose" @change="SelectChange">
                  <option value="none">=선택=</option>
                  <option value="samsung.com">삼성</option>
                  <option value="naver.com">네이버</option>
                  <option value="gmail.com">구글</option>
                  <option value="user-input">직접입력</option>
                </select>
              </div>
            </fieldset>
            <div class="forms_buttons">
              <input
                type="button"
                value="회원가입"
                id="btn-join"
                class="forms_buttons-action"
                @click="signUp"
              />
              <input
                type="button"
                value="취소"
                class="forms_buttons-action"
                style="background-color: #f3e06a"
                @click="gotoHome"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueCookies from "vue-cookies";
import http from "@/api/http";
import swal from "sweetalert";
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  name: "MemberLogin",
  data() {
    return {
      //로그인 관련 데이터
      login: {
        userid: "",
        userpwd: "",
        failLogin: "",
        isChecked: "",
      },
      //회원가입 관련 데이터
      join: {
        userid: "",
        idcheckResult: "",
        idIsOk: "",
        color: "",
        password1: "",
        password2: "",
        pwdcheckResult: "",
        pwdcolor: "",
        pwdIsOk: "",
        pwdshow: "",
        pwdType: "",
        emailDomain: "",
        emailid: "",
        userName: "",
        fnum: "",
        bnum: "",
      },
    };
  },
  created() {
    const myCookie = VueCookies.get("userid");
    this.login.userid = myCookie;
    this.login.isChecked = myCookie ? true : false;
    this.login.idcheckResult = "";
    this.join.pwdType = "password";
  },

  computed: {
    fullNum: function () {
      return "010" + this.join.fnum + this.join.bnum;
    },
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },

  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    //로그인
    async doLogin() {
      if (!this.login.userid) {
        this.login.failLogin = "아이디를 입력해 주세요!";
        return;
      } else if (!this.login.userpwd) {
        this.login.failLogin = "비밀번호를 입력해 주세요!";
        return;
      }
      await this.userConfirm({
        userid: this.login.userid,
        userpwd: this.login.userpwd,
      });
      let token = sessionStorage.getItem("access-token");
      // console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        // console.log("4. confirm() userInfo :: ", this.userInfo);
        swal({
          title: `${this.login.userid}님 환영합니다!`,
          text: "메인 화면으로 이동합니다.",
          icon: "success",
          button: "확인",
        }).then((value) => {
          // 로그인 성공 시 페이지 이동
          this.$router.push({ name: "home" });
          console.log(value);
        });
      } else {
        // 로그인 실패 시 에러 메시지 표시
        this.login.failLogin = "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";
      }
      // http
      // 	.post(`/user/login`, {
      // 		userid: this.login.userid,
      // 		userpwd: this.login.userpwd,
      // 	})
      // 	.then(response => {
      // 		const token = response.data['access-token']; // 토큰 가져오기.
      // 		const loginId = response.data['loginId']; // 로그인성공 아이디
      // 		if (token) {
      // 			localStorage.setItem('access-token', token); // 토큰 로컬스토리지에 저장.
      // 			localStorage.setItem('loginId', loginId);
      // 			// 아이디 저장 여부 체크
      // 			if (this.login.isChecked === false) {
      // 				VueCookies.remove('userid');
      // 			}
      // 			else {
      // 				VueCookies.set('userid', this.login.userid);
      // 			}
      // 			swal({
      // 				title: `${this.login.userid}님 환영합니다!`,
      // 				text: "메인 화면으로 이동합니다.",
      // 				icon: "success",
      // 				button: "확인",
      // 			}).then((value) => {
      // 				// 로그인 성공 시 페이지 이동
      // 				this.$router.push({ name: "home" });
      // 				console.log(value);
      // 			});
      // 		} else {
      // 			// 로그인 실패 시 에러 메시지 표시
      // 			this.login.failLogin = '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
      // 		}
      // 	})
      // 	.catch(error => {
      // swal({
      // 	title: `ㅈ버그발생${error}`,
      // 	icon: "error",
      // 	button: "확인",
      // });
      // 	});
    },
    // 자바스크립트 이벤트
    // 로그인폼->회원가입폼
    mvSignup() {
      const userForms = this.$refs.userForms;
      userForms.classList.remove("bounceRight");
      userForms.classList.add("bounceLeft");
    },
    // 회원가입폼-> 로그인폼
    mvLogin() {
      const userForms = this.$refs.userForms;
      userForms.classList.remove("bounceLeft");
      userForms.classList.add("bounceRight");
    },
    // 아이디 중복 검증
    idDuplicate() {
      if (this.join.userid.length < 5 || this.join.userid.length > 16) {
        this.join.idcheckResult = "아이디는 6자 이상 16자 이하 입니다.";
        this.join.idIsOk = 1;
        this.join.color = "#000000";
      } else {
        http.get(`/user/${this.join.userid}`).then(({ data }) => {
          if (data == 0) {
            this.join.idcheckResult = this.join.userid + "는 사용할 수 있습니다.";
            this.join.idIsOk = 0;
            this.join.color = "#2E63F9";
          } else {
            this.join.idcheckResult = this.join.userid + "는 이미 사용중입니다.";
            this.join.idIsOk = 1;
            this.join.color = "#e8716d";
          }
        });
      }
    },

    //비밀번호 일치 확인
    isSame() {
      if (this.join.password1 == this.join.password2) {
        this.join.pwdcheckResult = "비밀번호가 일치합니다.";
        this.join.pwdcolor = "#2E63F9";
        this.join.pwdIsOk = 0;
      } else {
        this.join.pwdcheckResult = "비밀번호가 일치하지 않습니다.";
        this.join.pwdcolor = "#e8716d";
        this.join.pwdIsOk = 1;
      }
    },

    // 비밀번호 숨기기, 보이기
    showAndHide() {
      if (this.join.pwdshow) {
        this.join.pwdType = "password";
      } else {
        this.join.pwdType = "text";
      }
    },

    //이메일 도메인 선택
    SelectChange(domain) {
      if (domain.target.value == "user-input") {
        this.join.emailDomain = "";
        const emaildomain = this.$refs.emaildomain;
        emaildomain.placeholder = "직접입력";
        emaildomain.readOnly = false;
        emaildomain.focus();
        return;
      }
      this.join.emailDomain = domain.target.value;
    },

    // 회원가입
    signUp() {
      if (this.join.idIsOk != "0") {
        swal({
          title: "가입 실패!",
          text: "아이디 중복을 확인해 주세요!",
          icon: "error",
          button: "확인",
        });
      } else if (this.join.password1.length < 4) {
        swal({
          title: "가입 실패!",
          text: "비밀번호를 4자 이상 입력해 주세요!",
          icon: "error",
          button: "확인",
        });
      } else if (this.join.pwdIsOk != "0") {
        swal({
          title: "가입 실패!",
          text: "비밀번호가 일치하지 않습니다!",
          icon: "error",
          button: "확인",
        });
      } else if (this.join.userName.length < 1) {
        swal({
          title: "가입 실패!",
          text: "이름을 입력해 주세요!",
          icon: "error",
          button: "확인",
        });
      } else {
        http
          .post(`/user/join`, {
            userid: this.join.userid,
            userpwd: this.join.password1,
            username: this.join.userName,
            emailid: this.join.emailid,
            emaildomain: this.join.emailDomain,
            fullNum: this.fullNum,
          })
          .then(({ data }) => {
            if (data == "success") {
              this.join.userid = "";
              this.join.idcheckResult = "";
              this.join.idIsOk = "";
              this.join.color = "";
              this.join.password1 = "";
              this.join.password2 = "";
              this.join.pwdcheckResult = "";
              this.join.pwdcolor = "";
              this.join.pwdIsOk = "";
              this.join.pwdshow = "";
              this.join.pwdType = "";
              this.join.emailDomain = "";
              this.join.emailid = "";
              this.join.userName = "";
              this.join.fnum = "";
              this.join.bnum = "";
              swal({
                title: "가입 성공!",
                icon: "success",
                button: "확인",
              }).then((value) => {
                this.mvLogin();
                console.log(value);
              });
            } else {
              swal({
                title: "가입 실패ㅠ.ㅠ",
                text: "알 수 없는 오류",
                icon: "error",
                button: "확인",
              });
            }
          });
      }
    },
    //홈 이동
    gotoHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* 로그인&회원가입창 */



body {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 1em;
}

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}

input[type="submit"] {
  cursor: pointer;
}

input::placeholder {
  font-size: 1rem;
  /* font-family: "Montserrat", sans-serif; */
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}

/**
   * Bounce to the left side
   */
@keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }

  50% {
    transform: translate3d(-30px, -50%, 0);
  }

  100% {
    transform: translate3d(0, -50%, 0);
  }
}

/**
   * Bounce to the left side
   */
@keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }

  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }

  100% {
    transform: translate3d(100%, -50%, 0);
  }
}

/**
   * Show Sign Up form
   */
@keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}

/**
   * Page background
   */
.section_login_join {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin-top: 50px;
  background-size: cover;
}

.user_options-container {
  position: relative;
  width: 80%;
}

.user_options-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.85);
  border-radius: 3px;
}

/**
   * Registered and Unregistered user box and text
   */
.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;
  color: #fff;
  font-weight: 300;
}

.user_registered-title,
.user_unregistered-title {
  margin-bottom: 15px;
  font-size: 1.22rem;
  line-height: 1em;
}

.user_unregistered-text,
.user_registered-text {
  font-size: 0.43rem;
  line-height: 1em;
}

.user_registered-login,
.user_unregistered-signup {
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 0.6em;
  letter-spacing: 0.2rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.user_registered-login:hover,
.user_unregistered-signup:hover {
  color: rgba(34, 34, 34, 0.85);
  background-color: #ccc;
}

/**
   * Login and signup forms
   */
.user_options-forms {
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 630px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transform: translate3d(100%, -50%, 0);
  transition: transform 0.4s ease-in-out;
}

.user_options-forms .user_forms-login {
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
}

.user_options-forms .forms_title {
  margin-bottom: 45px;
  font-size: 2rem;
  font-weight: 500;
  line-height: 0.6em;
  text-transform: uppercase;
  color: #e8716d;
  letter-spacing: 0.1rem;
}

.forms_sub_title {
  margin-bottom: 25px;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 0.6em;
  text-transform: uppercase;
  color: #e8716a;
  letter-spacing: 0.1rem;
  border-bottom: 1px solid;
  padding-bottom: 5px;
}

.user_options-forms .forms_field:not(:last-of-type) {
  margin-bottom: 20px;
}

.user_options-forms .forms_field-input {
  width: 70%;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px 6px 6px;
  font-size: 1.1rem;
  font-weight: 300;
  color: gray;
  letter-spacing: 0.1rem;
  transition: border-color 0.2s ease-in-out;
}

.user_options-forms .forms_field-input:focus {
  border-color: gray;
}

.user_options-forms .forms_buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
}

.user_options-forms .forms_buttons-forgot {
  /* font-family: "Montserrat", sans-serif; */
  letter-spacing: 0.1rem;
  color: #ccc;
  text-decoration: underline;
  transition: color 0.2s ease-in-out;
}

.user_options-forms .forms_buttons-forgot:hover {
  color: #b3b3b3;
}

.user_options-forms .forms_buttons-action {
  background-color: #e8716d;
  border-radius: 3px;
  padding: 10px 35px;
  font-size: 1.1rem;
  /* font-family: "Montserrat", sans-serif; */
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: background-color 0.2s ease-in-out;
}

.user_options-forms .forms_buttons-action:hover {
  background-color: #e14641;
}

.user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
  position: absolute;
  top: 70px;
  left: 40px;
  width: calc(100% - 80px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, transform 0.5s ease-in-out;
}

.user_options-forms .user_forms-signup {
  transform: translate3d(120px, 0, 0);
}

.user_options-forms .user_forms-signup .forms_buttons {
  justify-content: flex-end;
}

.user_options-forms .user_forms-login {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
}

/**
   * Triggers
   */
.user_options-forms.bounceLeft {
  animation: bounceLeft 1s forwards;
}

.user_options-forms.bounceLeft .user_forms-signup {
  animation: showSignUp 1s forwards;
}

.user_options-forms.bounceLeft .user_forms-login {
  opacity: 0;
  visibility: hidden;
  transform: translate3d(-120px, 0, 0);
}

.user_options-forms.bounceRight {
  animation: bounceRight 1s forwards;
}

/**
   * Responsive 990px
   */
@media screen and (max-width: 990px) {
  .user_options-forms {
    min-height: 350px;
  }

  .user_options-forms .forms_buttons {
    flex-direction: column;
  }

  .user_options-forms .user_forms-login .forms_buttons-action {
    margin-top: 30px;
  }

  .user_options-forms .user_forms-signup,
  .user_options-forms .user_forms-login {
    top: 40px;
  }

  .user_options-registered,
  .user_options-unregistered {
    padding: 50px 45px;
  }
}

#pidback,
#message {
  color: #e8716d;
  margin-left: 5px;
  margin-top: 10px;
  margin-bottom: -10px;
}

select {
  padding: 5px;
  border-radius: 5px;
  border: 2px solid gray;
}

.forms_buttons-action {
  margin: 5px;
}

/*아이디 비번 찾기*/
.section_find_pw_id {
  display: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin-top: 50px;
  background-size: cover;
}
</style>
