<template>
  <section>
    <div class="top_">
        <form
          id="formSerach"
          role="search"
          style="
            margin-left: 22%;
            margin-top: 15%;
            width: 55%;
            position: absolute;
            text-align: center;
            padding: 20px 0px;
            border-radius: 20px;
            background-color: white;
          "
        >
          <select
            id="searchArea"
            name="searchArea"
            class="form-select"
            aria-label="Default select example"
            style="border: none"
            v-model="formData.searchArea"
          >
            <option value="" selected>검색 할 지역 선택</option>
            <option value="1">서울</option>
            <option value="2">인천</option>
            <option value="3">대전</option>
            <option value="4">대구</option>
            <option value="5">광주</option>
            <option value="6">부산</option>
            <option value="7">울산</option>
            <option value="8">세종특별자치시</option>
            <option value="31">경기도</option>
            <option value="32">강원도</option>
            <option value="33">충청북도</option>
            <option value="34">충청남도</option>
            <option value="35">경상북도</option>
            <option value="36">경상남도</option>
            <option value="37">전라북도</option>
            <option value="38">전라남도</option>
            <option value="39">제주도</option>
          </select>
          <select
            id="sortType"
            name="sortType"
            class="form-select"
            aria-label="Default select example"
            style="border: none"
            v-model="formData.sortType"
          >
            <option value="1" selected>제목순 정렬</option>
            <option value="2">거리순 정렬</option>
          </select>
          <select
            id="searchContentId"
            name="searchContentId"
            class="form-select"
            aria-label="Default select example"
            style="border: none"
            v-model="formData.searchContentId"
          >
            <option value="" selected>전체 선택</option>
            <option value="12">관광지</option>
            <option value="14">문화시설</option>
            <option value="15">축제공연행사</option>
            <option value="25">여행코스</option>
            <option value="28">레포츠</option>
            <option value="32">숙박</option>
            <option value="38">쇼핑</option>
            <option value="39">음식점</option>
          </select>
          <input
            id="searchKeyword"
            name="searchKeyword"
            class="form-control me-2"
            type="text"
            placeholder="검색어"
            aria-label="검색어"
            style="display: inline-block; width: 25%"
            v-model="formData.searchKeyword"
          />
          <input
            id="btn_search"
            class="btn btn-dark"
            type="button"
            value="검색"
            @click="goSearch"
          />
        </form>
      </div>


    <div class="container2">
      <h2 style="display: inline-block;">HOT THEMA</h2>
    </div>

    <div class="container2">
      <div @click="choiceThema(12)">
        <card-view 
          data-image="https://images.squarespace-cdn.com/content/v1/586ebc34d482e9c69268b69a/1624386887478-9Z3XA27D8WFVDWKW00QS/20201230173806551_JRT8E1VC.png">
          <h1 slot="header" style="font-family: 'Jua', sans-serif;">SIGHT</h1>
          <p slot="content">전국 각지의 관광지 접수하러 가보자GO</p>
        </card-view>
      </div>
      <div  @click="choiceThema(15)">
        <card-view
          data-image="https://image.genie.co.kr/Y/IMAGE/IMG_MUZICAT/IV2/Genie_Magazine/8955/Mgz_Main_Top_20200910162109.jpg/dims/resize/Q_80,0">
          <h1 slot="header" style="font-family: 'Jua', sans-serif;">FESTIVAL</h1>
          <p slot="content">가끔은 많은 사람들속에 빠져보자GO</p>
        </card-view>
      </div>
      <div @click="choiceThema(28)">
        <card-view 
        data-image="https://t1.daumcdn.net/cfile/tistory/25528E4D580740BC13">
          <h1 slot="header" style="font-family: 'Jua', sans-serif;">LEPORTS</h1>
          <p slot="content">정적인 여행보단 역시 활동적인게 좋다GO</p>
        </card-view>
      </div>
      <div @click="choiceThema(39)">
        <card-view 
        data-image="https://i.ytimg.com/vi/8B0ZZlsQy3E/maxresdefault.jpg">
          <h1 slot="header" style="font-family: 'Jua', sans-serif;">FOODS</h1>
          <p slot="content">놀러가는데 맛있는게 없으면 말이 되냐GO</p>
        </card-view>
      </div>
    </div>

    <div class="container2">
      <h2 style="display: inline-block;">HOT REGION</h2>
    </div>

    <div class="container2">

      <div @click="choiceRegion(1)">
        <card-view
          data-image="https://www.agoda.com/wp-content/uploads/2019/03/Seoul-attractions-N-Seoul-Tower.jpg">
          <h1 slot="header" style="font-family: 'Jua', sans-serif;">SEOUL</h1>
          <p slot="content">서울 가보자GO</p>
        </card-view>
      </div>
      <div @click="choiceRegion(39)">
        <card-view
          data-image="https://www.lottehotel.com/content/dam/lotte-hotel/lotte/jeju/overview/introduction/g-0807.jpg.thumb.768.768.jpg">
          <h1 slot="header" style="font-family: 'Jua', sans-serif;">JEJU</h1>
          <p slot="content">제주도 가보자GO</p>
        </card-view>
      </div>
      <div @click="choiceRegion(6)">
        <card-view data-image="https://www.visitbusan.net/uploadImgs/files/cntnts/20191229153530528_ttiel">
          <h1 slot="header" style="font-family: 'Jua', sans-serif;">BUSAN</h1>
          <p slot="content">부산 가보자GO</p>
        </card-view>
      </div>
      <div @click="choiceRegion(31)">
        <card-view data-image="https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/Mobile/City/vxqwz51mk0ks5o5ewsrf.jpg">
          <h1 slot="header" style="font-family: 'Jua', sans-serif;">GYEONGGI</h1>
          <p slot="content">경기도 가보자GO</p>
        </card-view>
      </div>
    </div>

    <div class="hot3boards container">
      <h2 class="container2">HOT BOARDS</h2>
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
                >
                  <!-- :img-src="img.imgBlob"
                                    > -->
                  <template #img>
                    <img :src="img.imgBlob" alt="Image" class="image-container"/>
                  </template>
                  <div class="left-text" @click="mvUserBoards(article.articleNo)">
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
                  <div class="left-text" @click="mvUserBoards(article.articleNo)">
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
              <!-- <li v-if="isLike(article.articleNo)" class="gallery-item-likes"><b-icon icon="heart-fill" font-scale="0.8"></b-icon>{{ article.likeCnt }}</li> -->
              <li class="gallery-item-likes"><b-icon icon="heart" font-scale="0.8"></b-icon>{{ article.likeCnt }}</li>

              <li class="gallery-item-likes"><b-icon icon="chat" font-scale="0.8"></b-icon> {{ article.commentCnt }}</li>
              <li class="gallery-item-comments">
                <b-icon icon="eye" font-scale="0.8"></b-icon> {{ article.hit }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
import cardView from "@/components/layout/cardView.vue";
import http from "@/api/http";
export default {
  name: "HomeView",
  components: {
    cardView,
  },
  data() {
    return {
      formData: {
        lati: "",
        long: "",
        searchArea: "1",
        sortType: "1",
        searchContentId: "",
        searchKeyword: "",
      },
      slide: 0,
      sliding: null,
      imgs: [],
      articles: [],
      likeBoards: [],// 사용자가 좋아요 누른 게시글
    };
  },
  methods: {
    //클릭한 게시글 페이지로 이동
    mvUserBoards(articleNo) {
      this.$router.push({
        name: 'userboardlist',
        params: {
          word: articleNo, // 전달하고자 하는 데이터
          key: "article_no"
        }
      })
    },
    //검색결과창이동
    goSearch() {
      this.$router.push({
      name: 'tripsearch',
      params: {
        formData: this.formData // 전달하고자 하는 데이터
      }
})
    },
    //테마선택이동
    choiceThema(searchContentId) {
      this.formData.searchContentId = searchContentId;
      this.goSearch();
    },
    //지역선택이동
    choiceRegion(searchArea) {
      this.formData.searchContentId = 12;
      this.formData.searchArea = searchArea;
      this.goSearch();
    },

    //게시글 불러오기
    search() {
      http
        .get("/userboard/listtop3")
        .then((response) => {
          this.articles = response.data;
        });
    },

    getImgs() {
      http.get("/userboard/getImgs").then((response) => {
        this.imgs = response.data;
      });
    },
    onSlideStart() {
      this.sliding = true;
    },

    onSlideEnd() {
      this.sliding = false;
    },
  },
  created() {
    this.search();
    this.getImgs();
    
  },
};
</script>

<style scoped>
.top_ {
  width: 100%;
  height: 500px;
  margin-bottom: 15px;
  background-image: url("@/assets/img/main_background.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0px;
  padding: 0px;
}

.hot3boards {
  width: 100%;
  margin-top: 5%;
}

img {
    display: block;
}

.container {
    max-width: 93.5rem;
    margin: 0 auto;
    padding: 0 2rem;
    widows: 100%;
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
    width: calc(30%);
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
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

.modal {
    font-family: 'Jua', sans-serif;
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
    font-family: 'Jua', sans-serif;
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

/**프로필사진 */
.progileImg {
    width: 200px;
    height: 200px;
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
