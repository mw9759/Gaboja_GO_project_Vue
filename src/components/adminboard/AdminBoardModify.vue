<template>
  <div>
    <b-container>
      <b-row class="justify-content-center" style="margin-top: 10px">
        <b-col cols="12">
          <h2 class="my-0 shadow-sm bg-light text-center">수정</h2>
        </b-col>
        <b-col cols="12">
          <b-form>
            <div class="mb-3 d-flex flex-column align-items-start">
              <label for="subject" class="form-label" style="font-size: 1.5rem"> 제목 : </label>
              <b-form-input
                v-model="subject"
                type="text"
                style="border-color: black"
              ></b-form-input>
              <label for="subject" class="form-label" style="font-size: 1.5rem"> 내용 : </label>
              <b-form-textarea
                v-model="content"
                rows="12"
                style="border-color: black"
              ></b-form-textarea>
            </div>
            <b-col cols="auto" class="text-center">
              <b-button variant="outline-primary mb-3" @click="modify"> 수정완료 </b-button>
              <span style="margin: 0 10px"></span>
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

export default {
  props: {
    user: {
      type: String,
    },
  },
  name: "AdminBoardModify",
  data() {
    return {
      subject: "",
      content: "",
      userId: this.user,
      isWriter: false,
      articleNo: this.$route.params.articleNo,
    };
  },
  methods: {
    modify() {
      http
        .put(`/adminboard/modify`, {
          subject: this.subject,
          content: this.content,
          articleNo: this.articleNo,
        })
        .then(() => {
          this.$router.push({ name: "adminboardview", params: { articleNo: this.articleNo } });
        });
    },
    list() {
      this.$router.push({ name: "adminboardlist" });
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
