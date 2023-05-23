<template>
    <div>
        <section class="section">
            <h1 class="title">수정하기</h1>
            <router-link :to="{ name: 'userboardlist' }">
                <a href="" class="subtitle">👉게시글 보기</a>
            </router-link>
        </section>
        <div id="form-main" style="height: auto; min-height:100%;">
            <div id="form-div">
                <form class="form" method="post" id="form1">
                    <p class="name">
                        <input placeholder="제목" required="required" v-model="subject" type="text"
                            class="validate[required,custom[onlyLetter],length[0,100]] feedback-input" id="name" />
                    </p>



                    <p class="text">
                        <textarea required="required" v-model="content"
                            class="validate[required,length[6,300]] feedback-input" id="comment" placeholder="내용"
                            style="height: 15rem;"></textarea>
                    </p>

                    <div class="grid-x grid-padding-x">
                        <div class="small-10 small-offset-1 medium-8 medium-offset-2 cell">

                            <p>
                                <label for="upload_imgs" class="file_label">
                                    <i class="fa fa-upload" aria-hidden="true"></i>
                                    사진 선택
                                </label>
                                <input class="show-for-sr" type="file" style="display: none;" id="upload_imgs"
                                    name="upload_imgs[]" multiple v-on:change="previewImgs" />
                            </p>
                            <div id="img_preview">
                                <p v-if="totalFiles" style="font-weight: bold">
                                    이미지 {{ totalFiles }}개 등록
                                </p>
                                <img v-for="(file, index) in files" :src="getFilePreviewURL(file)" class="img-preview-thumb"
                                    :key="index">
                                <img v-for="(file, index) in uploadedimgs" :src="file" class="img-preview-thumb"
                                    :key="index">
                            </div>
                        </div>
                    </div>


                    <div class="submit">
                        <div class="submit">
                            <input type="button" value="수정완료" id="button-blue" @click="modify" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import http from "@/api/http";
import { mapState } from "vuex";

export default {
    name: "UserBoardWrite",
    props: {
    },
    computed: {
        ...mapState("memberStore", ["isLogin", "userInfo"]),
        getFilePreviewURL() {
            return function (file) {
                return URL.createObjectURL(file);
            };
        }
    },

    created() {
        let article = this.$route.query.article;
        this.subject = article.subject;
        this.content = article.content;
        this.articleNo = article.articleNo;

        this.uploadedimgs = this.$route.query.imgs;
        this.totalFiles = this.$route.query.totalFiles;
    },

    data() {
        return {
            subject: null,
            content: null,
            articleNo: null,
            userId: this.$store.state.memberStore.userInfo.userId,
            searchParam_list: {
                key: null,
                word: null,
                spp: 20,
                pg: 1,
                num: null,
            },
            files: [],
            blobfilse: [],
            uploadedimgs: [],
            totalFiles: 0
        };
    },
    methods: {
        modify() {
            let imgok = this.totalFiles > 0 ? 'Y' : 'N';
            http
                .put("/userboard/modify", {
                    articleNo: this.articleNo,
                    subject: this.subject,
                    content: this.content,
                    userId: this.userId,
                    imgsIsExist: imgok,
                })
                .then(() => {
                    this.deleteImages();
                    if (!this.uploadedimgs) {
                        this.uploadImages();
                    }
                    this.$emit("search", this.searchParam_list);
                });
        },

        // 이미지 삭제
        async deleteImages() {
            if (!this.uploadedimgs) {
                await http.delete(`/userboard/deleteImg/${this.articleNo}`);
            }
        },

        async uploadImages() {
            var imgs = this.blobfilse;
            await http.post('/userboard/upload', {
                imgBlobs: imgs,
            });
            this.$router.push({ name: "userboardlist" });

               // .then(response => {
               // })
               // .catch(error => {
               //     console.error('Error uploading images:', error);
                //});
        },
        
        fileToBlob() {
            if (this.files) {
                for (let i = 0; i < this.files.length; i++){
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.blobfilse.push(e.target.result);
                    };
                    reader.readAsDataURL(this.files[i]);
                }
            }
        },

        previewImgs(event) {
            this.files = Array.from(event.target.files);
            this.totalFiles = this.files.length;
            this.fileToBlob();
            this.uploadedimgs = null;
        },

    },
};
</script>

<style>
/* 입력창 부분 */

#feedback-page {
    text-align: center;
}

#form-main {
    width: 100%;
    padding-top: 0px;
    margin-bottom: 15px;
}

.submit {
    width: 70%;
    margin: 0 auto;
    padding-bottom: 45px;
}

#form-div {
    background-color: rgba(72, 72, 72, 0.4);
    padding-left: 35px;
    padding-right: 35px;
    padding-top: 35px;
    padding-bottom: 50px;
    width: 550px;
    margin-top: 30px;
    -moz-border-radius: 7px;
    -webkit-border-radius: 7px;
    margin: 0 auto;
    margin-bottom: 5rem;
}

.feedback-input {
    color: #3c3c3c;
    font-weight: 500;
    font-size: 18px;
    border-radius: 0;
    line-height: 22px;
    background-color: #fbfbfb;
    padding: 13px 13px 13px 20px;
    margin-bottom: 10px;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    border: 3px solid rgba(0, 0, 0, 0);
}

.feedback-input:focus {
    background: #fff;
    box-shadow: 0;
    border: 3px solid #3498db;
    color: #3498db;
    outline: none;
    padding: 13px 13px 13px 20px;
}

.focused {
    color: #30aed6;
    border: #30aed6 solid 3px;
}

/* Icons ---------------------------------- */


textarea {
    width: 100%;
    height: 150px;
    line-height: 150%;
    resize: vertical;
}

input:hover,
textarea:hover,
input:focus,
textarea:focus {
    background-color: white;
}

#button-blue {
    float: left;
    width: 100%;
    border: #fbfbfb solid 4px;
    cursor: pointer;
    background-color: #3498db;
    color: white;
    font-size: 24px;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
    margin-top: -4px;
    font-weight: 700;
    padding: 10px 15px;
    border-radius: 10px;
    margin-top: 20px;
}

#button-blue:hover {
    background-color: white;
    color: #0493bd;
}

.submit:hover {
    color: #3498db;
}

#preview {
    width: 100%;
    /* height: 100px; */
    border-radius: 5px;
}

@media only screen and (max-width: 580px) {
    #form-div {
        width: 90%;
        padding-left: 3%;
        padding-right: 3%;
        margin: 0 auto;
    }
}

/* 제목 */

.title {
    width: 100%;
    height: 44px;
    font-size: 44.15px;
    line-height: 1.67;
    text-align: center;
    color: #35465d;
    margin-bottom: 40px;
}

.subtitle {
    width: 100%;
    height: 31px;
    line-height: 1.53;
    font-size: 20px;
    text-align: center;
    color: #35465d;
    margin-bottom: 20px;
    display: block;
}

.upload_img {
    width: 50%;
    margin-top: -20px;
}

/* 파일선택 */

#file {
    display: none;
}

.file_label {
    font-size: 20px;
    width: 250px;
    background-color: #e67e22;
    color: #fff;
    text-align: center;
    padding: 5px;
    border: 4px solid white;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
}

.file_label:hover {
    background-color: #f39c12;
    color: #ffffff;
}

.fa {
    margin-right: 5px;
}

/**파일 업로드 관련 */
.quote-imgs-thumbs {
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    margin: 1.5rem 0;
    padding: 0.75rem;
}

.quote-imgs-thumbs--hidden {
    display: none;
}

.img-preview-thumb {
    background: #fff;
    border: 1px solid #777;
    border-radius: 0.25rem;
    box-shadow: 0.125rem 0.125rem 0.0625rem rgba(0, 0, 0, 0.12);
    margin-right: 1rem;
    max-width: 140px;
    padding: 0.25rem;
}
</style>
