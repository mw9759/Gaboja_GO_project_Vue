<template>
	<!-- 로그인 / 회원가입 창 -->
	<section class="section_login_join" id="section_login_join">
		<div class="user_options-container">
			<div class="user_options-text">
				<div class="user_options-unregistered">
					<h2 class="user_unregistered-title">Don't have an account?</h2>
					<p class="user_unregistered-text">Banjo tote bag bicycle
						rights, High Life sartorial cray craft beer whatever street art
						fap.</p>
					<button class="user_unregistered-signup" id="signup-button">Sign
						up</button>
				</div>

				<div class="user_options-registered">
					<h2 class="user_registered-title">Have an account?</h2>
					<p class="user_registered-text">Banjo tote bag bicycle rights,
						High Life sartorial cray craft beer whatever street art fap.</p>
					<button class="user_registered-login" id="login-button">Login</button>
				</div>
			</div>

			<div class="user_options-forms" id="user_options-forms">
				<div class="user_forms-login">
					<h2 class="forms_title">Login</h2>
					<form id="form-login" method="POST" class="forms_form" action="/user/login">
						<fieldset class="forms_fieldset">
							<!-- 쿠키 값이 있는 경우 -->
							<div class="forms_field" v-if="userid">
								<input id="id_" type="text" placeholder="아이디" class="forms_field-input" required="required"
									name="userid" autofocus="autofocus" v-model="userid" />
								<div class="form-check mb-3 float-end" style="margin-top: 10px">
									<input class="form-check-input" type="checkbox" value="ok" id="saveid" name="saveid"
										v-model="isChecked" />
									<label class="form-check-label" for="saveid"> 아이디저장 </label>
								</div>
							</div>
							<!-- 쿠키 값이 없는 경우 -->
							<div class="forms_field" v-else>
								<input id="id_" type="text" placeholder="아이디" class="forms_field-input" required="required"
									name="userid" autofocus="autofocus" v-model="userid" />
								<div class="form-check mb-3 float-end" style="margin-top: 10px">
									<input class="form-check-input" type="checkbox" value="ok" id="saveid" name="saveid"
										v-model="isChecked" />
									<label class="form-check-label" for="saveid"> 아이디저장 </label>
								</div>
							</div>

							<div class="forms_field">
								<input id='password_' type="password" placeholder="비밀번호" name="userpwd"
									class="forms_field-input" required="required" v-model="userpwd" />
							</div>
							<p style="color: #e8716d; margin-top: 10px">{{ failLogin }}</p>
						</fieldset>
						<div class="forms_buttons">
							<button type="button" class="forms_buttons-forgot" id="mvfindPwId">비밀번호
								| 아이디 찾기</button>
							<input id="btn-login" type="button" value="Log In" class="forms_buttons-action"
								v-on:click="login">
						</div>
					</form>
				</div>

				<div class="user_forms-signup">
					<h2 class="forms_title">Sign Up</h2>
					<form id="form-join" method="POST" class="forms_form" action="">
						<fieldset class="forms_fieldset">
							<div class="forms_field">
								<div id="idcheck-result"></div>
								<input id="ID" type="text" placeholder="아이디" class="forms_field-input" required="required"
									name="userid" style="margin-right: 5px;" />
								<input type='button' value='ID중복확인' class='forms_buttons-action'
									style="font-size: 1.5rem; padding: 7px 20px;" id="idcheck">
							</div>
							<div class="forms_field">
								<input id='pwd' type="password" placeholder="비밀번호" class="forms_field-input" name="userpwd"
									required="required" style="margin-right: 5px;" /> <label> <input type="checkbox"
										id='isShowMemberPw' onclick="onoff()">
									<span id='isShowMemberPwText'>보이기</span>
								</label>
								<!--  <span>
                                        <img src="./assets/img/show.png" alt="" class='img_sh' id='isShowMemberPwImg'>
                                    </span>-->
							</div>
							<div class="forms_field">
								<input type="password" placeholder="비밀번호 확인" class="forms_field-input" required="required"
									id='checkpwd' onkeyup="same();" />
								<p id='pidback'></p>
							</div>
							<div class="forms_field">
								<input id='name' type="text" placeholder="이름" name='username' class="forms_field-input"
									required="required" />
							</div>
							<div class="forms_field">
								<input type="text" style="width: 20%;" name='mobile1' id='mobile1' value='010'
									class="forms_field-input" required="required" readonly="readonly"> <input type="text"
									style="width: 30%;" name='fnum' id='mobile2' placeholder="앞자리" maxlength='4'
									class="forms_field-input" required="required" />
								<input type="text" style="width: 30%;" name='bnum' id='mobile3' placeholder="뒷자리"
									maxlength='4' class="forms_field-input" required="required" />
							</div>

							<div class="forms_field">
								<input type="text" placeholder="Email" class="forms_field-input" required="required"
									style="width: 38%;" name='emailid' id='email1' />@
								<input type="text" placeholder="Domain" class="forms_field-input" required="required"
									readonly="readonly" style="width: 38%" name='emaildomain' id='email2' value="도메인선택" />
								<select name='emailDomain' id='emailChoose'>
									<option value='none'>=선택=</option>
									<option value='samsung.com'>삼성</option>
									<option value='naver.com'>네이버</option>
									<option value='google.com'>구글</option>
									<option value='user-input'>직접입력</option>
								</select>
							</div>

						</fieldset>
						<div class="forms_buttons">
							<input type="button" value="회원가입" id="btn-join" class="forms_buttons-action"> <input
								type='button' value='취소' class='forms_buttons-action' style="background-color: #F3E06A;"
								onclick='location.href = "/"'>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import VueCookies from 'vue-cookies'
import http from "@/api/http";
// let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
const myCookie = VueCookies.get('userid');
alert(myCookie);
export default {
	name: "MemberLogin",
	data() {
		return {
			userid: myCookie,
			userpwd: "",
			failLogin: "",
			isChecked: (myCookie ? true : false),

		};
	},
	methods: {
		login: function () {
			if (!this.userid) {
				this.failLogin = "아이디를 입력해 주세요!"
				return;
			}
			else if (!this.userpwd) {
				this.failLogin = "비밀번호를 입력해 주세요!"
				return;
			}
			http
				.post(`/user/login`, {
					userid: this.userid,
					userpwd: this.userpwd,
					saveid: (this.isChecked ? "ok" : "no")
				})
				.then(({ data }) => {
					if (data.length != 0) {
						// 로그인 성공 시 페이지 이동
						console.log(data.userId);
						if (this.isChecked) {
							alert("쿠키없다");
						}
						alert("로그인 성공")
						VueCookies.set('userid', data.userId)
						this.$router.push({ name: "home" });
					} else {
						// 로그인 실패 시 에러 메시지 표시
						this.failLogin = '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
					}
					});
		}
	}
};
</script>

<style scoped>
/* 로그인&회원가입창 */

* {
	box-sizing: border-box;
}

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
	font-size: 1.5rem;
	/* font-family: "Montserrat", sans-serif; */
	font-weight: 300;
	letter-spacing: .1rem;
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
	font-size: 1.66rem;
	line-height: 1em;
}

.user_unregistered-text,
.user_registered-text {
	font-size: .83rem;
	line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
	margin-top: 30px;
	border: 1px solid #ccc;
	border-radius: 3px;
	padding: 10px 30px;
	color: #fff;
	text-transform: uppercase;
	line-height: 1em;
	letter-spacing: .2rem;
	transition: background-color .2s ease-in-out, color .2s ease-in-out;
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
	transition: transform .4s ease-in-out;
}

.user_options-forms .user_forms-login {
	transition: opacity .4s ease-in-out, visibility .4s ease-in-out;
}

.user_options-forms .forms_title {
	margin-bottom: 45px;
	font-size: 2.5rem;
	font-weight: 500;
	line-height: 1em;
	text-transform: uppercase;
	color: #e8716d;
	letter-spacing: .1rem;
}

.forms_sub_title {
	margin-bottom: 25px;
	font-size: 1.8rem;
	font-weight: 500;
	line-height: 1em;
	text-transform: uppercase;
	color: #e8716a;
	letter-spacing: .1rem;
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
	font-size: 1.5rem;
	font-weight: 300;
	color: gray;
	letter-spacing: .1rem;
	transition: border-color .2s ease-in-out;
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
	letter-spacing: .1rem;
	color: #ccc;
	text-decoration: underline;
	transition: color .2s ease-in-out;
}

.user_options-forms .forms_buttons-forgot:hover {
	color: #b3b3b3;
}

.user_options-forms .forms_buttons-action {
	background-color: #e8716d;
	border-radius: 3px;
	padding: 10px 35px;
	font-size: 1.5rem;
	/* font-family: "Montserrat", sans-serif; */
	font-weight: 300;
	color: #fff;
	text-transform: uppercase;
	letter-spacing: .1rem;
	transition: background-color .2s ease-in-out;
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
	transition: opacity .4s ease-in-out, visibility .4s ease-in-out, transform .5s ease-in-out;
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