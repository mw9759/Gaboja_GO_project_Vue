<template>
  <div>
    <router-view
      @create-article="createArticle"
      @update-article="updateArticle"
      @delete-article="deleteArticle"
      @detail-article="detailArticle"
      @search="search"
      :searchParam="searchParam"
    ></router-view>
    <!--  -->
  </div>
</template>

<script>
import http from "@/api/http";

export default {
  name: "AdminBoard",
  data() {
    return {
      searchParam: {
        key: null,
        word: null,
        spp: 20,
        pg: 1,
        num: null,
      },
    };
  },
  methods: {
    search(searchParam) {
      this.searchParam.key = searchParam.key;
      this.searchParam.word = searchParam.word;
      this.searchParam.spp = searchParam.spp;
      this.searchParam.pg = searchParam.pg;
      this.searchParam.num = searchParam.num;
    },
    createArticle(article) {
      http
        .get("/admin/write", {
          params: {
            articleNo: article.articlNo,
            content: article.content,
            hit: article.hit,
            registerTime: article.registerTime,
            subject: article.subject,
            userId: article.userId,
            type: "A",
          },
        })
        .then((response) => {
          if (response === "success") {
            alert("등록 성공");
          } else {
            alert("등록 실패");
          }
          this.$router.push("/adminboard/list");
        });
    },
    updateArticle(article) {
      http
        .get("/admin/modify", {
          params: {
            articleNo: article.articlNo,
            content: article.content,
            hit: article.hit,
            registerTime: article.registerTime,
            subject: article.subject,
            userId: article.userId,
            type: "A",
          },
        })
        .then((response) => {
          if (response === "success") {
            alert("수정 성공");
          } else {
            alert("수정 실패");
          }
          this.$router.push("/adminboard/list");
        });
    },
    deleteArticle(articleNo) {
      http.get(`/admin/delete/${articleNo}`).then((response) => {
        if (response === "success") {
          alert("삭제 성공");
        } else {
          alert("삭제 실패");
        }
        this.$router.push("/adminboard/list");
      });
    },
    detailArticle(article) {
      this.$router.push({
        name: `/adminboard/view/:${article.articleNo}`,
        params: { article: article },
      });
    },
  },
};
</script>

<style></style>
