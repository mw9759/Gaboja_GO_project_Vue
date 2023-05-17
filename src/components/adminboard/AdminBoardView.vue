<template>
  <div>
    <b-container>
      <b-row class="justify-content-center" style="margin-top: 10px">
        <b-col cols="12">
          <h2 class="my-0 shadow-sm bg-light text-center">조회</h2>
        </b-col>
        <b-col cols="12">
          <b-form>
            <div class="mb-3 d-flex flex-column align-items-start">
              <label for="subject" class="form-label" style="font-size: 1.5rem">제목 : </label>
              <b-form-input
                v-model="subject"
                type="text"
                style="border-color: black"
                readonly
              ></b-form-input>
              <label for="subject" class="form-label" style="font-size: 1.5rem">내용 : </label>
              <b-form-textarea
                v-model="content"
                rows="12"
                style="border-color: black"
                readonly
              ></b-form-textarea>
            </div>
            <b-col cols="auto" class="text-center">
              <b-button
                v-if="userInfo && userInfo.userId === 'admin'"
                variant="outline-primary mb-3"
                @click="modify"
              >
                글수정
              </b-button>
              <span v-if="userInfo && userInfo.userId === 'admin'" style="margin: 0 10px"></span>
              <b-button
                v-if="userInfo && userInfo.userId === 'admin'"
                variant="outline-danger mb-3"
                @click="deleteBoard"
              >
                글삭제
              </b-button>
              <span v-if="userInfo && userInfo.userId === 'admin'" style="margin: 0 10px"></span>
              <b-button variant="outline-secondary mb-3" @click="list"> 목록으로이동 </b-button>
            </b-col>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import http from "@/api/http";
import { mapState } from "vuex";

export default {
  name: "AdminBoardView",
  data() {
    return {
      subject: "",
      content: "",
      userId: this.user,
      articleNo: this.$route.params.articleNo,
    };
  },
  computed: {
    ...mapState("memberStore", ["isLogin", "userInfo"]),
  },
  methods: {
    deleteBoard() {
      http.delete(`/adminboard/delete/${this.articleNo}`).then(() => {
        this.$router.push({ name: "adminboardlist" });
      });
    },
    list() {
      this.$router.push({ name: "adminboardlist" });
    },
    modify() {
      this.$router.push({ name: "adminboardmodify", params: { articleNo: `${this.articleNo}` } });
    },
  },
  created() {
    http.get(`/adminboard/view/${this.articleNo}`).then((response) => {
      this.subject = response.data.subject;
      this.content = response.data.content;
      if (response.data.userId == this.userId) {
        this.isWriter = true;
      }
    });
  },
};
</script>

<style></style>
