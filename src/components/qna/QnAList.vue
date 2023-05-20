<template>
    <div>
        <b-container>
            <b-row class="justify-content-center" style="margin-top: 10px">
                <b-col cols="12" class="board-top">
                    <b-row class="mb-2 d-flex justify-content-between">
                        <b-col cols="auto">
                            <router-link v-if="userInfo && userInfo.userId != 'admin'" :to="{ name: 'qnawrite' }"><b-button
                                    variant="outline-secondary">글쓰기</b-button></router-link>
                        </b-col>
                        <b-col cols="auto" class="d-flex">
                            <b-form class="d-flex align-items-center" id="form-search">
                                <b-form-select :options="option" v-model="searchParam_list.key"
                                    style="width: 100px"></b-form-select>
                                <span style="margin: 0 5px"></span>
                                <b-form-input v-model="searchParam_list.word" style="width: 50%"
                                    placeholder="검색어..."></b-form-input>
                                <span style="margin: 0 5px"></span>
                                <b-button variant="outline-secondary" id="btn-search" class="w-auto text-nowrap"
                                    @click="search">검색</b-button>
                            </b-form>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            <div class="accordion " role="tablist">
                <b-card no-body class="mb-1" v-for="article in articles" :key="article.articleNo" v-bind="article">
                    <b-card-header header-tag="header" class="p-1 head" role="tab" v-b-toggle="article.articleNo.toString()">
                        <div class="qnaList">
                            <span class="left-text">
                                <b-icon icon="question-circle" font-scale="1.2"></b-icon> {{ article.subject }}
                            </span>
                            <span v-if="article.isAnswer == 'Y'" class="right-text">
                                <b-icon icon="check-circle" scale="1.2" variant="success"></b-icon>
                                    답변완료
                            </span>
                            <span v-else class="right-text">
                                <b-icon icon="x-circle" scale="1.2" variant="danger" ></b-icon>
                                답변대기
                            </span>
                        </div>
                    </b-card-header>
                    <b-collapse :id="article.articleNo.toString()" accordion="my-accordion" role="tabpanel" class="cols">
                        <b-card-body>
                            <b-card-text>{{ article.content }} 
                            </b-card-text>
                        </b-card-body>
                        <b-card-body class="text-right">
                            작성자: {{ article.userId }} | 작성일: {{ article.registerTime }}
                            <router-link v-if="userInfo && userInfo.userId == article.userId"
                                :to="{ name: 'qnamodify', params: { article: article } }"><b-button size="sm"
                                    style="margin-right: 1%;" variant="outline-primary">수정하기</b-button></router-link>
                            <b-button size="sm" v-if="userInfo && userInfo.userId == article.userId"
                                variant="outline-secondary" @click="deleteQnA(article.articleNo)">
                                글삭제
                            </b-button>
                        </b-card-body>

                        <div v-for="articler in articlesResult" :key="articler.articleNo">
                            <div v-if="articler.articleNo == article.articleNo">
                                <b-card-body v-if="article.isAnswer == 'N' && userInfo.userId != 'admin'"></b-card-body>
                                <b-card-body style="border-top: 1px solid #ced4da; border-radius: 20px;"
                                    v-else>
                                    <div class="text-left">
                                        <label class="form-label" style="font-size: 1.5rem"> 답변 : </label>
                                        <b-form-textarea :readonly="userInfo.userId !== 'admin' ? true : false"
                                            v-model="articler.content" rows="6"></b-form-textarea>
                                    </div>

                                    <div class="text-right mt-3"
                                        v-if="userInfo && userInfo.userId == 'admin' && article.isAnswer == 'N'">
                                        <b-button variant="outline-primary" @click="answer(article.articleNo, articler.content)">
                                            답글작성
                                        </b-button>
                                    </div>

                                    <div class="text-right mt-3"
                                        v-else-if="userInfo && userInfo.userId == 'admin' && article.isAnswer == 'Y'">
                                        <b-button variant="outline-primary" @click="answer(article.articleNo, articler.content)" style="margin-right: 1%;">
                                            답글수정
                                        </b-button>
                                        <b-button variant="outline-secondary" @click="changeAnswer(article.articleNo)">
                                            답글삭제
                                        </b-button>
                                    </div>
                                </b-card-body>
                            </div>
                        </div>
                    </b-collapse>
                </b-card>

            </div>

            <b-pagination v-model="searchParam_list.pg" :total-rows="rows" :per-page="searchParam.spp"
                aria-controls="my-table" @input="search" class="justify-content-center mt-5"></b-pagination>

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
            articlesResult: [],
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
            this.searchResult();

        },
        deleteQnA(articleNo) {
            http.delete(`/qna/delete/${articleNo}`);
            this.articles = this.articles.filter(tag => tag.articleNo !== articleNo);
            this.deleteQnAResult(articleNo);
        },
        deleteQnAResult(articleNo) {
            http.delete(`/qna/deleteresult/${articleNo}`);
        },
        searchResult() {
            http
                .get("/qna/listr", {
                    params: {
                        key: this.searchParam_list.key,
                        word: this.searchParam_list.word,
                        pg: this.searchParam_list.pg,
                    },
                })
                .then((response) => {
                    this.articlesResult = response.data;
                    console.log(response.data);
                });
        },
        answer(articleNo, content) {
            http.put(`/qna/modifyresult`, {
                    content: content,
                    articleNo: articleNo,
            });
            this.updateIsAnswered(articleNo);
            window.location.reload();
        },
        updateIsAnswered(articleNo) {
            http.put(`/qna/updateIsAnswered/${articleNo}`);
        },
        changeAnswer(articleNo) {
            this.answer(articleNo);
            http.put(`/qna/updateNoAnswered/${articleNo}`);
            window.location.reload();
        }
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
.left-text {
  float: left;
}

.right-text {
  float: right;
}
.head{
    background-color: white;
    padding: 1rem !important;
}
</style>