<template>
  <b-container>
    <b-row class="justify-content-center" style="margin-top: 10px">
      <b-col cols="12" class="board-top">
        <b-row class="mb-2 d-flex justify-content-between">
          <b-col cols="auto">
            <router-link :to="{ name: 'userboardwrite' }">
              <b-button variant="outline-primary"> 글쓰기 </b-button>
            </router-link>
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
                style="width: 50%"
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

    <div class="gallery">
      <div v-for="article in articles" :key="article.articleNo">
        <div class="gallery-item" tabindex="0">
          <div v-if="article.imgsIsExist == 'Y'">
            <!-- <div v-for="(img, index) in imgs" :key="index">
                            <img v-if="article.articleNo == img.articleNo" :key="img.articleNo" :src="img.imgBlob"
                                class="gallery-image" alt="">
                        </div> -->
            <b-carousel
              id="cars"
              v-model="article.imgSlideNum"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <!-- Text slides with image -->
              <div v-for="(img, index) in imgs" :key="index" class="gallery-item">
                <b-carousel-slide
                  v-if="article.articleNo == img.articleNo"
                  :key="img.articleNo"
                  v-b-modal.modal-center
                >
                  <!-- :img-src="img.imgBlob"
                                    > -->
                  <template #img>
                    <img :src="img.imgBlob" alt="Image" class="image-container" />
                  </template>
                  <div class="left-text" @click="mvModal(article)">
                    <h3>{{ article.subject }}</h3>
                    <div>
                      <span style="margin-right: 15px; display: inline-block"
                        >#{{ article.userId }}</span
                      >
                      <span style="margin-left: 15px">{{ article.registerTime }}</span>
                    </div>
                  </div>
                </b-carousel-slide>
              </div>
            </b-carousel>
          </div>
          <div v-else>
            <b-carousel
              id="cars"
              v-model="slide"
              controls
              indicators
              background="#ababab"
              img-width="99%"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333; max-height: 480px"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <!-- Text slides with image -->
              <div class="gallery-item">
                <b-carousel-slide v-b-modal.modal-center>
                  <!-- :img-src="img.imgBlob"
                                    > -->
                  <template #img>
                    <img
                      src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop"
                      alt="Image"
                      class="image-container"
                    />
                  </template>
                  <div class="left-text" @click="mvModal(article)">
                    <h3>{{ article.subject }}</h3>
                    <div>
                      <span style="margin-right: 15px; display: inline-block"
                        >#{{ article.userId }}</span
                      >
                      <span style="margin-left: 15px">{{ article.registerTime }}</span>
                    </div>
                  </div>
                </b-carousel-slide>
              </div>
            </b-carousel>
          </div>

          <div class="gallery-item-info">
            <ul>
              <li v-if="isLike(article.articleNo)" class="gallery-item-likes">
                <b-icon icon="heart-fill" font-scale="0.8"></b-icon>{{ article.likeCnt }}
              </li>
              <li v-else class="gallery-item-likes">
                <b-icon icon="heart" font-scale="0.8"></b-icon>{{ article.likeCnt }}
              </li>

              <li class="gallery-item-likes">
                <b-icon icon="chat" font-scale="0.8"></b-icon> {{ article.commentCnt }}
              </li>
              <li class="gallery-item-comments">
                <b-icon icon="eye" font-scale="0.8"></b-icon> {{ article.hit }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <b-modal
          id="modal-center"
          centered
          hide-header
          hide-footer
          scrollable
          v-if="pickedArticle"
          size="xl"
        >
          <div style="margin-bottom: 10px">
            <b-avatar size="40">
              <img :src="userInfo.profileImg" alt="Profile" />
            </b-avatar>
            <router-link :to="{ name: 'Profile', params: { userId: pickedArticle.userId } }">
              <h4
                style="
                  display: inline-block;
                  vertical-align: middle;
                  margin-left: 10px;
                  font-family: 'Jua', sans-serif;
                "
              >
                {{ pickedArticle.userId }}
              </h4>
            </router-link>
          </div>

          <!-- 만약 사진을 올린경우-->
          <b-carousel
            v-if="pickedArticle.imgsIsExist == 'Y'"
            id="cars"
            v-model="pickedArticle.imgSlideNum"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333"
            class="modal_carousel"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <div v-for="(img, index) in pickedArticlesImg" :key="index" class="gallery-item">
              <b-carousel-slide>
                <template #img>
                  <img :src="img" alt="Image" class="image-container" />
                </template>
              </b-carousel-slide>
            </div>
          </b-carousel>

          <!-- 만약 사진을 올리지 않은 경우-->
          <b-carousel
            id="cars"
            v-model="pickedArticle.imgSlideNum"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333"
            class="modal_carousel"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
            v-else
          >
            <div class="gallery-item">
              <b-carousel-slide>
                <template #img>
                  <img
                    src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop"
                    alt="Image"
                    class="image-container"
                  />
                </template>
              </b-carousel-slide>
            </div>
          </b-carousel>

          <div class="articleInfo">
            <div class="articleContent">
              <span>{{ pickedArticle.registerTime }}</span>
              <h2 style="border-bottom: 1px solid #dee2e6">#{{ pickedArticle.subject }}</h2>
              <div class="contentIn">{{ pickedArticle.content }}</div>
              <div class="modal-item">
                <ul>
                  <li v-if="isLike(pickedArticle.articleNo)" class="gallery-item-likes">
                    <b-icon
                      style="cursor: pointer"
                      icon="heart-fill"
                      font-scale="0.8"
                      @click="clickHeart(pickedArticle.articleNo, pickedArticle.likeCnt)"
                    ></b-icon>
                    {{ pickedArticle.likeCnt }}
                  </li>
                  <li v-else class="gallery-item-likes">
                    <b-icon
                      style="cursor: pointer"
                      icon="heart"
                      font-scale="0.8"
                      @click="clickHeart(pickedArticle.articleNo, pickedArticle.likeCnt)"
                    ></b-icon>
                    {{ pickedArticle.likeCnt }}
                  </li>

                  <li class="gallery-item-likes">
                    <b-icon icon="chat" font-scale="0.8"></b-icon> {{ comments.length }}
                  </li>
                  <li class="gallery-item-comments">
                    <b-icon icon="eye" font-scale="0.8"></b-icon> {{ pickedArticle.hit }}
                  </li>
                </ul>
              </div>
              <span
                v-if="pickedArticle.userId == userId"
                style="
                  padding-top: 10px;
                  text-align: right;
                  display: inline-block;
                  width: 100%;
                  text-decoration: none;
                "
              >
                <router-link
                  class="link modal_Atag_style"
                  :to="{
                    name: 'userboardmodify',
                    query: {
                      article: pickedArticle,
                      imgs: pickedArticlesImg,
                      totalFiles: pickedArticlesImg.length,
                    },
                  }"
                >
                  <span>수정하기</span>
                </router-link>
                <span class="modal_Atag_style"> | </span>
                <a href="" class="modal_Atag_style" @click="deleteArticle(pickedArticle.articleNo)"
                  ><span>삭제하기</span></a
                >
              </span>
            </div>
            <div></div>
          </div>
          <!-- 댓글 창 -->
          <div class="comments">
            <h2 class="comments_title">
              댓글
              <span style="font-size: medium; vertical-align: middle">{{ comments.length }}</span>
            </h2>
            <div style="border-bottom: 1px solid #a7a9ac; padding-bottom: 0.5rem">
              <b-avatar size="50">
                <img :src="userInfo.profileImg" alt="Profile" />
              </b-avatar>
              <input
                type="text"
                class="comments_input"
                placeholder="댓글 추가...."
                v-model="writedComment"
              />
              <b-button
                size="sm"
                class="mb-2"
                style="
                  margin-left: 5px;
                  padding: 2%;
                  width: 10%;
                  margin-top: 4px;
                  background-color: #adbbd5;
                  border: none;
                  border-radius: 20px;
                "
                @click="uploadComment(pickedArticle.articleNo)"
              >
                <b-icon icon="arrow-return-left" aria-hidden="true"></b-icon>
              </b-button>
            </div>

            <div style="margin-top: 1rem" v-for="comment in comments" :key="comment.commentNo">
              <b-avatar size="50">
                <img :src="comment.profileImg" alt="Profile" />
              </b-avatar>
              <span style="vertical-align: middle; margin-left: 8px">
                <span style="color: #19c653" v-if="userId == comment.userId"
                  >내가작성한 글({{ comment.userId }})<b-icon
                    icon="emoji-smile"
                    aria-hidden="true"
                  ></b-icon
                ></span>
                <span v-else>{{ comment.userId }}</span>
                <b-icon icon="dot" aria-hidden="true"></b-icon>
                <span style="font-size: 0.8rem; color: #a7a9ac">
                  {{ comment.registerTime }}
                </span>
                <span
                  v-if="comment.isModify == 1"
                  style="
                    background-color: #7485f0;
                    padding: 6px;
                    color: white;
                    margin-right: 6px;
                    border-radius: 5px;
                  "
                  >수정됨</span
                >
                <span
                  v-if="comment.userId == pickedArticle.userId"
                  style="background-color: #fa4245; padding: 6px; color: white; border-radius: 5px"
                  >작성자</span
                >
              </span>

              <input
                v-if="comment.userId == userInfo.userId"
                type="text"
                class="commentIn"
                v-model="comment.content"
              />
              <input v-else type="text" readonly class="commentIn" v-model="comment.content" />

              <div class="comment-item">
                <ul style="display: inline-block">
                  <li class="gallery-item-likes c-li">
                    <b-icon icon="heart" font-scale="0.8"></b-icon> 0
                  </li>
                  <li class="gallery-item-likes c-li">
                    <b-icon icon="chat" font-scale="0.8"></b-icon> 0
                  </li>
                </ul>
                <!-- 본인 댓글일때 수정 삭제 버튼 -->
                <span v-if="comment.userId == userInfo.userId">
                  <a class="modal_Atag_style" @click="modifyComment(comment)">
                    <span>수정하기</span>
                  </a>
                  <span class="modal_Atag_style"> | </span>
                  <a
                    class="modal_Atag_style"
                    @click="deleteComment(comment.commentNo, comment.articleNo)"
                  >
                    <span>삭제하기</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </b-modal>
      </div>
    </div>

    <b-pagination
      v-model="searchParam_list.pg"
      :total-rows="rows"
      :per-page="searchParam.spp"
      aria-controls="my-table"
      @input="search"
      class="justify-content-center mt-5"
    ></b-pagination>
  </b-container>
</template>

<script>
import http from "@/api/http";
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  name: "UserBoardList",
  props: {
    searchParam: {
      type: Object,
    },
  },
  data() {
    return {
      userId: this.$store.state.memberStore.userInfo.userId,
      articles: [],
      imgs: [],
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
      slide: 0,
      sliding: null,
      pickedArticle: null, // 리스트에서 클릭한 article
      pickedArticlesImg: [], // 해당 리스트에 업로드된 이미지들
      comments: [], // 해당 게시글에 대한 댓글
      writedComment: null, // 사용자가 작성중인 댓글
      likeBoards: [], // 사용자가 좋아요 누른 게시글
    };
  },
  computed: {
    ...mapState("memberStore", ["isLogin", "userInfo"]),
    rows() {
      return this.searchParam_list.num;
    },
  },
  watch: {},
  methods: {
    ...mapActions(memberStore, ["userLogout", "getUserInfo"]),
    //좋아요 눌렀는지 확인
    isLike(articleNo) {
      for (var i = 0; i < this.likeBoards.length; i++) {
        if (articleNo == this.likeBoards[i]) {
          return true;
        }
      }
      return false;
    },
    // 좋아요 역변
    clickHeart(articleNo, likeCnt) {
      for (var i = 0; i < this.likeBoards.length; i++) {
        if (articleNo == this.likeBoards[i]) {
          this.likeBoards.splice(i, 1);
          this.pickedArticle.likeCnt -= 1;
          this.updateLikeBoards(articleNo, likeCnt - 1); // 좋아요 정보 업데이트
          return;
        }
      }
      this.likeBoards.push(articleNo);
      this.pickedArticle.likeCnt += 1;
      this.updateLikeBoards(articleNo, likeCnt + 1); // 좋아요 정보 업데이트
    },
    // 좋아요 정보 업데이트
    updateLikeBoards(articleNo, likeCnt) {
      http
        .put(`/user/updateLike`, {
          userId: this.userId,
          likeBoards: JSON.stringify(this.likeBoards),
          likeCnt: likeCnt,
          articleNo: articleNo,
        })
        .then((response) => {
          if (response.data == "success") {
            this.search();
          }
        });
    },

    total() {
      http
        .get("/userboard/total", {
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
        .get("/userboard/list", {
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
    getImgs() {
      http.get("/userboard/getImgs").then((response) => {
        this.imgs = response.data;
      });
    },
    mvModal(pickedArticle) {
      //모달로 데이터 넘겨주기.
      this.pickedArticle = pickedArticle;
      this.pickedArticlesImg = [];
      for (var i = 0; i < this.imgs.length; i++) {
        if (this.imgs[i].articleNo == this.pickedArticle.articleNo) {
          this.pickedArticlesImg.push(this.imgs[i].imgBlob);
        }
      }
      //모달로 이동한경우 조회수 증가시키기
      http
        .get(`/userboard/view/${pickedArticle.articleNo}`, {
          params: {
            key: this.searchParam_list.key,
            word: this.searchParam_list.word,
            pg: this.searchParam_list.pg,
          },
        })
        .then((response) => {
          this.articles = response.data;
        });

      //모달로 이동한 경우 해당 게시글 댓글 불러오기
      this.getComments(pickedArticle.articleNo);
    },
    //해당 게시글 댓글 불러오기
    getComments(articleNo) {
      http.get(`/userboard/getComments/${articleNo}`).then((response) => {
        this.comments = response.data;
      });
    },
    //해당 게시글 댓글 작성
    uploadComment(articleNo) {
      http
        .post(`/userboard/writeComment`, {
          articleNo: articleNo,
          userId: this.userId,
          content: this.writedComment,
        })
        .then((response) => {
          if (response.data == "success") {
            this.getComments(articleNo);
            this.writedComment = null;
            this.search();
          }
        });
    },
    // 댓글 삭제
    deleteComment(commentNo, articleNo) {
      http
        .post("/userboard/deleteComment", {
          commentNo: commentNo,
          articleNo: articleNo,
        })
        .then((response) => {
          if (response.data == "success") {
            this.getComments(articleNo);
            this.search();
          }
        });
    },

    //댓글 수정
    modifyComment(comment) {
      http.put("/userboard/modifyComment", comment).then((response) => {
        if (response.data == "success") {
          this.getComments(comment.articleNo);
        }
      });
    },

    onSlideStart() {
      this.sliding = true;
    },

    onSlideEnd() {
      this.sliding = false;
    },
    //게시글 삭제
    deleteArticle(articleNo) {
      this.deleteImages(articleNo);

      http.delete(`/userboard/delete/${articleNo}`);
    },

    // 이미지 삭제
    async deleteImages(articleNo) {
      await http.delete(`/userboard/deleteImg/${articleNo}`);
    },
  },
  created() {
    let key = this.$route.params.key;
    let word = this.$route.params.word;
    if (key) {
      this.searchParam_list.key = key;
      this.searchParam_list.word = word;
    }

    let token = sessionStorage.getItem("access-token");
    this.getUserInfo(token);
    this.search();
    this.getImgs();
    if (JSON.parse(this.userInfo.likeBoards)) {
      this.likeBoards = JSON.parse(this.userInfo.likeBoards);
    }
  },
};
</script>
<style scoped>
/*인스타그램폼*/
/*

All grid code is placed in a 'supports' rule (feature query) at the bottom of the CSS (Line 310). 
        
The 'supports' rule will only run if your browser supports CSS grid.

Flexbox and floats are used as a fallback so that browsers which don't support grid will still recieve a similar layout.

*/

/* Base Styles */

:root {
  font-size: 10px;
}

/* *,
*::before,
*::after {
  box-sizing: border-box;
} */

body {
  min-height: 100vh;
  background-color: #fafafa;
  color: #262626;
  padding-bottom: 3rem;
}

img {
  display: block;
}

.container {
  max-width: 93.5rem;
  margin: 0 auto;
  padding: 0 2rem;
}

.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

/* Profile Section */

.profile {
  padding: 5rem 0;
}

.profile::after {
  content: "";
  display: block;
  clear: both;
}

.profile-image {
  float: left;
  width: calc(33.333% - 1rem);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
}

.profile-image img {
  border-radius: 50%;
}

.profile-user-settings,
.profile-stats,
.profile-bio {
  float: left;
  width: calc(66.666% - 2rem);
}

.profile-user-settings {
  margin-top: 1.1rem;
}

.profile-user-name {
  display: inline-block;
  font-size: 3.2rem;
  font-weight: 300;
}

.profile-edit-btn {
  font-size: 1.4rem;
  line-height: 1.8;
  border: 0.1rem solid #dbdbdb;
  border-radius: 0.3rem;
  padding: 0 2.4rem;
  margin-left: 2rem;
}

.profile-settings-btn {
  font-size: 2rem;
  margin-left: 1rem;
}

.profile-stats {
  margin-top: 2.3rem;
}

.profile-stats li {
  display: inline-block;
  font-size: 1.6rem;
  line-height: 1.5;
  margin-right: 4rem;
  cursor: pointer;
}

.profile-stats li:last-of-type {
  margin-right: 0;
}

.profile-bio {
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.5;
  margin-top: 2.3rem;
}

.profile-real-name,
.profile-stat-count,
.profile-edit-btn {
  font-weight: 600;
}

/* Gallery Section */

.gallery {
  display: flex;
  flex-wrap: wrap;
  margin: -1rem -1rem;
  padding-bottom: 3rem;
}

.gallery-item {
  position: relative;
  flex: 1 0 22rem;
  margin: 1rem;
  color: #fff;
  cursor: pointer;
}

.gallery-item:hover .gallery-item-info,
.gallery-item:focus .gallery-item-info {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

.gallery-item-info {
  display: none;
}

.gallery-item-info li {
  display: inline-block;
  font-size: 1.7rem;
  font-weight: 600;
}

.gallery-item-likes {
  margin-right: 1.2rem;
}

.gallery-item-type {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2.5rem;
  text-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.1);
}

.fa-clone,
.fa-comment {
  transform: rotateY(180deg);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Loader */

.loader {
  width: 5rem;
  height: 5rem;
  border: 0.6rem solid #999;
  border-bottom-color: transparent;
  border-radius: 50%;
  margin: 0 auto;
  animation: loader 500ms linear infinite;
}

/* Media Query */

@media screen and (max-width: 40rem) {
  .profile {
    display: flex;
    flex-wrap: wrap;
    padding: 4rem 0;
  }

  .profile::after {
    display: none;
  }

  .profile-image,
  .profile-user-settings,
  .profile-bio,
  .profile-stats {
    float: none;
    width: auto;
  }

  .profile-image img {
    width: 7.7rem;
  }

  .profile-user-settings {
    flex-basis: calc(100% - 10.7rem);
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  .profile-user-name {
    font-size: 2.2rem;
  }

  .profile-edit-btn {
    order: 1;
    padding: 0;
    text-align: center;
    margin-top: 1rem;
  }

  .profile-edit-btn {
    margin-left: 0;
  }

  .profile-bio {
    font-size: 1.4rem;
    margin-top: 1.5rem;
  }

  .profile-edit-btn,
  .profile-bio,
  .profile-stats {
    flex-basis: 100%;
  }

  .profile-stats {
    order: 1;
    margin-top: 1.5rem;
  }

  .profile-stats ul {
    display: flex;
    text-align: center;
    padding: 1.2rem 0;
    border-top: 0.1rem solid #dadada;
    border-bottom: 0.1rem solid #dadada;
  }

  .profile-stats li {
    font-size: 1.4rem;
    flex: 1;
    margin: 0;
  }

  .profile-stat-count {
    display: block;
  }
}

/* Spinner Animation */

@keyframes loader {
  to {
    transform: rotate(360deg);
  }
}

/*

The following code will only run if your browser supports CSS grid.

Remove or comment-out the code block below to see how the browser will fall-back to flexbox & floated styling. 

*/

@supports (display: grid) {
  .profile {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: repeat(3, auto);
    grid-column-gap: 3rem;
    align-items: center;
  }

  .profile-image {
    grid-row: 1 / -1;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
    grid-gap: 2rem;
  }

  .profile-image,
  .profile-user-settings,
  .profile-stats,
  .profile-bio,
  .gallery-item,
  .gallery {
    width: auto;
    margin: 0;
  }

  @media (max-width: 40rem) {
    .profile {
      grid-template-columns: auto 1fr;
      grid-row-gap: 1.5rem;
    }

    .profile-image {
      grid-row: 1 / 2;
    }

    .profile-user-settings {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 1rem;
    }

    .profile-edit-btn,
    .profile-stats,
    .profile-bio {
      grid-column: 1 / -1;
    }

    .profile-user-settings,
    .profile-edit-btn,
    .profile-settings-btn,
    .profile-bio,
    .profile-stats {
      margin: 0;
    }
  }
}

/* 리스트 이미지 관련 css */
.image-container {
  max-height: 480px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 430px;
}

.image-container img {
  width: auto !important;
  height: auto !important;
  max-height: 100% !important;
}

/* 모달창 */
@import url("https://fonts.googleapis.com/css2?family=Jua&display=swap");

.modal {
  font-family: "Jua", sans-serif;
}

.modal_carousel {
  display: inline-block;
  width: 48%;
  margin-left: 2%;
}

/* 모달창 글정보 */
.articleInfo {
  display: inline-block;
  width: 48%;
  margin-right: 2%;
  font-family: "Jua", sans-serif;
}

.articleContent {
  padding: 4%;
  top: 3%;
  position: absolute;
  width: 48%;
}

.modal-item {
  width: 100%;
  height: 100%;
  text-align: right;
  border-bottom: 1px solid #dee2e6;
}

.modal-item li {
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 600;
}

.contentIn {
  padding: 5%;
  width: 100%;
  height: fit-content;
  min-height: 200px;
}

.modal_Atag_style {
  text-decoration: none;
  color: #a7a9ac !important;
  font-size: small;
  cursor: pointer;
}

/** 댓글 창 */
.comments {
  width: 84%;
  font-family: "Jua", sans-serif;
  margin-left: 7%;
  margin-top: 3%;
  border-top: 1px solid #a7a9ac;
}
.comments_title {
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid #a7a9ac;
  padding: 20px;
}
.comments_input {
  margin-left: 15px;
  border: none;
  background-color: #f4f6fb;
  width: 75%;
  padding: 2%;
  border-radius: 10px;
}
.comment-item {
  width: 100%;
  height: 100%;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}
.commentIn {
  padding: 5%;
  width: 100%;
  height: fit-content;
  min-height: 100px;
  border: none;
}
.c-li {
  display: inline-block;
  font-size: 1.2rem;
}
</style>
