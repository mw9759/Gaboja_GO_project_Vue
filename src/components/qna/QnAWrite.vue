<template>
    <div>
        <b-container>
            <b-row class="justify-content-center" style="margin-top: 10px">
                <b-col cols="12">
                    <h2 class="my-0 shadow-sm bg-light text-center">글쓰기</h2>
                </b-col>
                <b-col cols="12">
                    <b-form>
                        <div class="mb-3 d-flex flex-column align-items-start">
                            <label for="subject" class="form-label" style="font-size: 1.5rem">제목 : </label>
                            <b-form-input v-model="subject" type="text" style="border-color: black"></b-form-input>
                            <label for="subject" class="form-label" style="font-size: 1.5rem">내용 : </label>
                            <b-form-textarea v-model="content" rows="12" style="border-color: black"></b-form-textarea>
                        </div>
                        <b-col cols="auto" class="text-center">
                            <b-button @click="write" variant="outline-primary mb-3"> 글작성 </b-button>
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
import { mapState } from "vuex";

export default {
    props: {
        user: {
            type: String,
        },
    },
    computed: {
       ...mapState("memberStore", ["isLogin", "userInfo"]),
    }, 
    name: "AdminBoardWrite",
    data() {
        return {
            subject: null,
            content: null,
            userId: this.$store.state.memberStore.userInfo.userId,
            searchParam_list: {
                key: null,
                word: null,
                spp: 20,
                pg: 1,
                num: null,
            },
        };
    },
    methods: {
        write() {
            console.log(this.userInfo.userId);
            http
                .post("/qna/write", {
                    subject: this.subject,
                    content: this.content,
                    userId: this.userId,
                })
                .then(() => {
                    this.$emit("search", this.searchParam_list);
                    this.$router.push({ name: "qnalist" });
                    this.write_result(); // write_result() 메서드를 then() 메서드 내에서 호출
                });
        },
        // 게시글 작성시 답변테이블에도 틀만 만들어준다.
        write_result() {
            http.post("/qna/writeresult")
        }
    },
};
</script>
  
<style></style>
  