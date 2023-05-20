<template>
  <div>
    <b-container>
      <b-row class="justify-content-center" style="margin-top: 10px">
        <b-col cols="12" class="board-top">
          <b-row class="mb-2 d-flex justify-content-between">
            <b-col cols="auto">
              <router-link v-if="userInfo && userInfo.userId != 'admin'" :to="{ name: 'qnawrite' }"
                ><b-button variant="outline-secondary">글쓰기</b-button></router-link
              >
            </b-col>
            <b-col cols="auto" class="d-flex">
              <b-form class="d-flex align-items-center" id="form-search">
                <b-form-select
                  :options="option"
                  v-model="searchParam_list.key"
                  style="width: 100px"
                ></b-form-select>
                <span style="margin: 0 5px"></span>
                <b-form-input
                  v-model="searchParam_list.word"
                  style="width: 300px"
                  placeholder="검색어..."
                ></b-form-input>
                <span style="margin: 0 5px"></span>
                <b-button
                  variant="outline-secondary"
                  id="btn-search"
                  class="w-auto text-nowrap"
                  @click="search"
                  >검색</b-button
                >
              </b-form>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <div class="accordion" role="tablist">
        <b-card
          no-body
          class="mb-1"
          v-for="(article, index) in articles"
          :key="index"
          v-bind="article"
          v-b-toggle="article.articleNo.toString()"
        >
          <b-card-header header-tag="header" class="p-1" role="tab">
            <div class="qnaList">
              <b-icon icon="question-circle" font-scale="1.2"></b-icon> {{ article.subject }}
            </div>
          </b-card-header>
          <b-collapse
            :id="article.articleNo.toString()"
            accordion="my-accordion"
            role="tabpanel"
            class="cols"
          >
            <b-card-body>
              <b-card-text>{{ article.content }}</b-card-text>
            </b-card-body>
            <b-card-body class="text-right">
              작성자: {{ article.userId }} | 작성일: {{ article.registerTime }}
              <router-link v-if="userInfo && userInfo.userId != 'admin'" :to="{ name: 'qnawrite' }"
                ><b-button size="sm" style="margin-right: 1%" variant="outline-primary"
                  >수정하기</b-button
                ></router-link
              >

              <router-link v-if="userInfo && userInfo.userId != 'admin'" :to="{ name: 'ㅋㅋ' }"
                ><b-button size="sm" variant="outline-secondary">삭제하기</b-button></router-link
              >
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>

      <b-pagination
        v-model="searchParam_list.pg"
        :total-rows="rows"
        :per-page="searchParam.spp"
        aria-controls="my-table"
        @input="search"
      ></b-pagination>
    </b-container>
  </div>
</template>

<script>
import http from "@/api/http";
import { mapState } from "vuex";

export default {
  props: {
    searchParam: {
      type: Object,
    },
  },
  computed: {
    ...mapState("memberStore", ["isLogin", "userInfo"]),
    rows() {
      return this.searchParam_list.num;
    },
  },
  name: "AdminBoardList",
  data() {
    return {
      articles: [],
      searchParam_list: {
        key: this.searchParam.key,
        word: this.searchParam.word,
        spp: this.searchParam.spp,
        pg: this.searchParam.pg,
        num: this.searchParam.num,
      },
      option: [
        { value: "subject", text: "제목" },
        { value: "article_no", text: "글번호" },
        { value: "user_id", text: "아이디" },
      ],
    };
  },
  methods: {
    total() {
      http
        .get("/qna/total", {
          params: {
            key: this.searchParam_list.key,
            word: this.searchParam_list.word,
          },
        })
        .then((response) => {
          this.searchParam_list.num = response.data;
          this.$emit("search", this.searchParam_list);
        });
    },

    search() {
      http
        .get("/qna/list", {
          params: {
            key: this.searchParam_list.key,
            word: this.searchParam_list.word,
            pg: this.searchParam_list.pg,
          },
        })
        .then((response) => {
          this.articles = response.data;
        });
      this.total();
    },
  },
  created() {
    this.search();
  },
};
</script>

<style>
.qnaList {
  padding: 1%;
}
</style>
