<template>
    <b-container>
        <header>
            <div>
                <div class="profile">
                    <div class="profile-image">
                        <label for="upload_imgs">
                            <img class="progileImg" v-if="blobfile" :src="blobfile"
                                alt="">
                            <img class="progileImg" v-else src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                            alt="">
                        </label>
                            <input class="show-for-sr" type="file" style="display: none;" id="upload_imgs"
                            name="upload_imgs[]" multiple v-on:change="previewImgs" />
                    </div>

                    <div class="profile-user-settings">

                        <h1 class="profile-user-name">{{ userInfos.userId }}</h1>

                        <b-dropdown id="dropdown-1" text="SETTINGS" class="m-md-2">
                            <b-dropdown-item>정보수정</b-dropdown-item>
                            <b-dropdown-item @click="checkDelete">떠나기</b-dropdown-item>
                        </b-dropdown>

                        <button class="btn profile-settings-btn" aria-label="profile settings"><i class="fas fa-cog"
                                aria-hidden="true"></i></button>

                    </div>

                    <div class="profile-stats">

                        <ul>
                            <li><span class="profile-stat-count">{{ articles.length }}</span> posts</li>
                            <li><span class="profile-stat-count">0</span> followers</li>
                            <li><span class="profile-stat-count">0</span> following</li>
                        </ul>

                    </div>

                    <div class="profile-bio">

                        <p><span class="profile-real-name">{{ userInfos.userName }}</span> {{userInfos.slogun}}</p>
                        <p><span class="profile-real-name">Email : </span> {{ userInfos.emailId }}@{{ userInfos.emailDomain }}</p>
                        <p style="font-size: 10px; color: #333;">@since {{userInfos.joinDate}}</p>
                    </div>

                </div>
                <!-- End of profile section -->

            </div>
            <!-- End of container -->

        </header>

        <div class="gallery">
            <div v-for="article in articles" :key="article.articleNo">
                <div class="gallery-item" tabindex="0">
                    <div v-if="article.imgsIsExist == 'Y'">
                        <!-- <div v-for="(img, index) in imgs" :key="index">
                            <img v-if="article.articleNo == img.articleNo" :key="img.articleNo" :src="img.imgBlob"
                                class="gallery-image" alt="">
                        </div> -->
                        <b-carousel id="cars" v-model="article.imgSlideNum" controls indicators background="#ababab"
                            img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;"
                            @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
                            <!-- Text slides with image -->
                            <div v-for="(img, index) in imgs" :key="index" class="gallery-item">
                                <b-carousel-slide v-if="article.articleNo == img.articleNo" :key="img.articleNo"
                                    v-b-modal.modal-center>
                                    <!-- :img-src="img.imgBlob"
                                    > -->
                                    <template #img>
                                        <img :src="img.imgBlob" alt="Image" class="image-container">
                                    </template>
                                    <div class="left-text" @click="mvModal(article)">
                                        <h3>{{ article.subject }}</h3>
                                        <div>
                                            <span style="margin-right: 15px; display: inline-block;">#{{ article.userId
                                            }}</span>
                                            <span style="margin-left: 15px;">{{ article.registerTime }}</span>
                                        </div>
                                    </div>
                                </b-carousel-slide>
                            </div>
                        </b-carousel>
                    </div>
                    <div v-else>
                        <b-carousel id="cars" v-model="slide" controls indicators background="#ababab" img-width="99%"
                            img-height="480" style="text-shadow: 1px 1px 2px #333;max-height: 480px;"
                            @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
                            <!-- Text slides with image -->
                            <div class="gallery-item">
                                <b-carousel-slide v-b-modal.modal-center>
                                    <!-- :img-src="img.imgBlob"
                                    > -->
                                    <template #img>
                                        <img src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop"
                                            alt="Image" class="image-container">
                                    </template>
                                    <div class="left-text" @click="mvModal(article)">
                                        <h3>{{ article.subject }}</h3>
                                        <div>
                                            <span style="margin-right: 15px; display: inline-block;">#{{ article.userId
                                            }}</span>
                                            <span style="margin-left: 15px;">{{ article.registerTime }}</span>
                                        </div>
                                    </div>
                                </b-carousel-slide>
                            </div>
                        </b-carousel>
                    </div>

                    <div class="gallery-item-info">

                        <ul>
                            <li class="gallery-item-likes"><b-icon icon="heart" font-scale="0.8"></b-icon> 89</li>
                            <li class="gallery-item-likes"><b-icon icon="chat" font-scale="0.8"></b-icon> 5</li>
                            <li class="gallery-item-comments"><b-icon icon="eye" font-scale="0.8"></b-icon> {{ article.hit
                            }}</li>
                        </ul>

                    </div>
                </div>
            </div>
            <div>
                <b-modal id="modal-center" centered hide-header hide-footer v-if="pickedArticle" size="xl">
                    <div>
                        <b-icon icon="person-fill" font-scale="1.5"></b-icon>
                        <h4 style="display: inline-block; font-family: 'Jua', sans-serif;">{{ pickedArticle.userId }}</h4>
                    </div>

                    <!-- 만약 사진을 올린경우-->
                    <b-carousel v-if="pickedArticle.imgsIsExist == 'Y'" id="cars" v-model="pickedArticle.imgSlideNum"
                        controls indicators background="#ababab" img-width="1024" img-height="480"
                        style="text-shadow: 1px 1px 2px #333;" class="modal_carousel" @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd">
                        <div v-for="(img, index) in pickedArticlesImg" :key="index" class="gallery-item">
                            <b-carousel-slide>
                                <template #img>
                                    <img :src="img" alt="Image" class="image-container">
                                </template>
                            </b-carousel-slide>
                        </div>
                    </b-carousel>

                    <!-- 만약 사진을 올리지 않은 경우-->
                    <b-carousel id="cars" v-model="pickedArticle.imgSlideNum" controls indicators background="#ababab"
                        img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;" class="modal_carousel"
                        @sliding-start="onSlideStart" @sliding-end="onSlideEnd" v-else>
                        <div class="gallery-item">
                            <b-carousel-slide>
                                <template #img>
                                    <img src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop"
                                        alt="Image" class="image-container">
                                </template>
                            </b-carousel-slide>
                        </div>
                    </b-carousel>

                    <div class="articleInfo">
                        <div class="articleContent">
                            <span>{{ pickedArticle.registerTime }}</span>
                            <h2 style="border-bottom: 1px solid #dee2e6;">#{{ pickedArticle.subject }}</h2>
                            <div class="contentIn">{{ pickedArticle.content }}</div>
                            <div class="modal-item">
                                <ul>
                                    <li class="gallery-item-likes"><b-icon icon="heart" font-scale="0.8"></b-icon> 89</li>
                                    <li class="gallery-item-likes"><b-icon icon="chat" font-scale="0.8"></b-icon> 5</li>
                                    <li class="gallery-item-comments"><b-icon icon="eye" font-scale="0.8"></b-icon> {{
                                        pickedArticle.hit }}</li>
                                </ul>
                            </div>
                            <span v-if="pickedArticle.userId == userInfos.userId" style="padding-top: 10px;
                                    text-align: right;
                                    display: inline-block;
                                    width: 100%;
                                    text-decoration: none;">
                                <router-link class="link modal_Atag_style" :to="{
                                    name: 'userboardmodify', query: {
                                        article: pickedArticle,
                                        imgs: pickedArticlesImg,
                                        totalFiles: pickedArticlesImg.length,
                                        page: page,
                                    }
                                }">
                                    <span>수정하기</span>
                                </router-link>
                                <span class="modal_Atag_style"> | </span>
                                <a href="" class="modal_Atag_style"
                                    @click="deleteArticle(pickedArticle.articleNo)"><span>삭제하기</span></a>
                            </span>
                        </div>
                        <div>

                        </div>
                    </div>
                </b-modal>
            </div>
        </div>
    </b-container>
</template>

<script>
import http from "@/api/http";
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
import swal from "sweetalert";

export default {
    name: "myProfile",
    props: {
    },
    computed: {
        ...mapState("memberStore", ["isLogin", "userInfo"]),

    },

    created() {
        this.userInfos = this.$store.state.memberStore.userInfo;
        http
            .get(`/user/mywrites/${this.userInfos.userId}`)
            .then((response) => {
                this.articles = response.data;
                this.posts = this.articles.length;
                this.myimgs();
            });
        this.blobfile = this.userInfos.profileImg;
    },

    data() {
        return {
            page: "myPage",
            userInfos: null,
            articles: [],
            imgs: [],
            posts: 0,
            slide: 0,
            sliding: null,
            pickedArticle: null, // 리스트에서 클릭한 article
            pickedArticlesImg: [], // 해당 리스트에 업로드된 이미지들
            files: [],
            blobfile: null,
        };
    },
    methods: {
        ...mapActions(memberStore, ["userLogout", "getUserInfo"]),
        //회원 프사
        previewImgs(event) {
            this.files = Array.from(event.target.files);
            this.fileToBlob();
        },
        //프사 blob으로 바꾸기
        fileToBlob() {
            if (this.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.blobfile = e.target.result;
                };
                reader.readAsDataURL(this.files[0]);
            }
            swal({
                title: "프사를 바꾸시겠습니까??",
                icon: "info",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.updateProfile();
                        swal("변경완료!", {
                        icon: "success",
                        });
                        let token = sessionStorage.getItem("access-token");
                        this.getUserInfo(token);
                        window.location.reload();
                    } else {
                        swal("변경이 취소되었습니다.");
                        if (this.userInfos.profileImg) {
                            this.blobfile = this.userInfos.profileImg;
                        }
                        else {
                            this.blobfile = null;
                        }
                    }
                    });

        },
        async updateProfile() {
            await http
                .put(`/user/updateProfile`, {
                    userId: this.userInfos.userId,
                    profileImg: this.blobfile,
                }).then((response) => {
                    if (response.data == "success") {
                        return true;
                    }
            })
        },
        async myimgs() {
            await http
            .get(`/user/myimgs/${this.userInfos.userId}`)
            .then((response) => {
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
            
        },

        onSlideStart() {
            this.sliding = true
        },

        onSlideEnd() {
            this.sliding = false
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

        //탈퇴여부 재확인
        checkDelete() {
            swal({
                title: "정말로 떠나시나요?ㅠㅠ",
                text: "한번 떠나시면, 그동한 남기신 데이터는 삭제됩니다..",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.deleteUserIngo();
                        swal("계정이 삭제되었습니다!", {
                        icon: "success",
                        });
                    } else {
                        swal("삭제가 취소되었습니다!");
                    }
                    });
        },

        //회원탈퇴
        deleteUserIngo() {
            http.delete(`/user/delete/${this.userInfos.userId}`)
            .then((response) => {
                if (response.data == "success") {
                    console.log(this.userInfo.userId);
                    this.userLogout(this.userInfo.userId); // 임포트한 로그아웃 매서드 호출. 인자값: 로그인한 유저의 아이디.
                    sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
                    sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
                    if (this.$route.path != "/") this.$router.push({ name: "home" });
                    return true;
                }   
            });
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

*,
*::before,
*::after {
    box-sizing: border-box;
}

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
}

/**프로필사진 */
.progileImg{
    width: 200px;
    height: 200px;
}
</style>