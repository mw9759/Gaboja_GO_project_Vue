<template>
  <div>
    <div class="title">
      <h3>{{ this.$route.query.name }}</h3>
    </div>
    <!-- Tab -->
    <div class="tab_controller">
      <div>
        <b-button
          v-for="(plan, index) in this.plans"
          :key="index"
          @click="tabPlan(index)"
          pill
          variant="primary"
          class="mr-1"
        >
          {{ plan.name }}
        </b-button>
        <b-button pill variant="outline-primary" @click="addTab">new</b-button>
      </div>
    </div>

    <div class="main">
      <div class="map_controller">
        <!-- 컨트롤러 -->
        <b-form class="d-flex" style="margin-bottom: 5px" @submit.prevent="submitForm">
          <font-awesome-icon
            :icon="['fass', 'square-plus']"
            size="2xl"
            class="mr-1"
            style="justify-content: center; height: 38px"
            v-b-toggle.subController
          />
          <b-form-select
            v-model="formData.searchArea"
            :options="options_area"
            class="mr-1"
          ></b-form-select>
          <b-form-select
            v-model="formData.sortType"
            :options="options_type"
            class="mr-1"
          ></b-form-select>
          <b-form-select
            v-model="formData.searchContentId"
            :options="options_content"
            class="mr-1"
          ></b-form-select>
          <b-form-input v-model="formData.searchKeyword" class="mr-1"></b-form-input>
          <b-button type="submit" variant="outline-secondary" style="width: 200px"> 검색 </b-button>
        </b-form>
        <!-- 서브 컨트롤러 확장 -->
        <b-collapse id="subController" style="margin-bottom: 5px">
          <b-card title="controller">
            <b-form-checkbox v-model="searchMarkerState" name="check-button" switch>
              Search Marker
            </b-form-checkbox>
            <b-form-checkbox v-model="planMarkerState" name="check-button" switch>
              Plan Marker
            </b-form-checkbox>
          </b-card>
        </b-collapse>
        <!-- 지도 -->
        <div id="map" style="width: 100%; height: 500px"></div>
      </div>
      <!-- 계획 -->
      <div v-bar class="plan">
        <div>
          <div class="d-flex justify-content-between" style="margin-bottom: 5px">
            <div style="line-height: 38px; text-align: center">
              {{ this.plans[currentTab].name }}
            </div>
            <div>
              <b-button class="mr-2" variant="success" @click="savePlan">저장</b-button>
              <b-button class="mr-2" variant="primary" v-b-modal.modal-modify>수정</b-button>
              <b-button variant="danger" @click="deletePlan">삭제</b-button>
            </div>
          </div>
          <div
            v-for="(plan, index) in this.plans[this.currentTab].data"
            :key="index"
            class="custom_card"
          >
            <img
              :src="plan.firstImage"
              @error="noImage"
              style="width: 100px; cursor: pointer"
              @click="moveCenter(plan.latitude, plan.longitude)"
            />
            <div class="plan_content">
              <div>
                {{ plan.title }}<br />
                {{ plan.addr1 }}
              </div>
            </div>
            <div class="plan_controller">
              <font-awesome-icon
                @click="upPlan(index)"
                :icon="['fas', 'circle-chevron-up']"
                size="xl"
                style="cursor: pointer"
              />
              <font-awesome-icon
                @click="removePlan(index)"
                :icon="['fas', 'trash-can']"
                size="xl"
                style="cursor: pointer"
              />
              <font-awesome-icon
                @click="downPlan(index)"
                :icon="['fas', 'circle-chevron-down']"
                size="xl"
                style="cursor: pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 목록 -->
    <div class="list">
      <table id="resultTable" class="table table-striped">
        <thead style="background-color: aliceblue">
          <tr>
            <th>대표이미지</th>
            <th>관광지명</th>
            <th>주소</th>
            <th style="width: 150px">현재 위치와의 거리</th>
            <th style="display: none">위도</th>
            <th style="display: none">경도</th>
            <th>상세 설명</th>
            <th>추가</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="list in lists" :key="list.contentId">
            <td>
              <img :src="list.firstImage" style="object-fit: cover" />
            </td>
            <td>{{ list.title }}</td>
            <td>{{ list.addr1 }}</td>
            <td>{{ list.distance }} km</td>
            <td style="display: none">{{ list.latitude }}</td>
            <td style="display: none">{{ list.longitude }}</td>
            <td>{{ list.overview }}</td>
            <td>
              <b-button variant="primary" @click="addPlan(list)">ADD</b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="display: flex; justify-content: center; align-items: center">
        <b-pagination
          :total-rows="totalRows"
          v-model="pagingParam.currentPage"
          :per-page="pagingParam.perPage"
        >
        </b-pagination>
      </div>
    </div>
    <!-- modal -->
    <b-modal
      id="modal-modify"
      ref="modal"
      title="이름 변경"
      @show="resetModal(true)"
      @hidden="resetModal(false)"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="modalState"
        >
          <b-form-input
            id="name-input"
            v-model="modalName"
            :state="modalState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <!-- v-model="this.plans[this.currentTab].name" -->
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import Vuebar from "vuebar";
import http from "@/api/http";
import { mapState } from "vuex";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(Vuebar);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

export default {
  name: "TravelPlanVeiw",
  data() {
    return {
      formData: {
        lati: "",
        long: "",
        searchArea: "",
        sortType: "1",
        searchContentId: "",
        searchKeyword: "",
      },
      pagingParam: {
        currentPage: 1,
        perPage: 10,
      },
      searchMarkerState: true,
      planMarkerState: true,
      items: [],
      tabCounter: 0,
      currentTab: 0,
      plans: [
        {
          name: "Day1",
          data: [],
        },
      ],
      map: null,
      imageSrc: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      searchMarkers: [],
      planMarkers: [],
      searchOverlays: [],
      planOverlays: [],
      polyline: null,
      dots: [],
      linePath: [],
      modalState: null,
      modalName: "",
      options_area: [
        { value: "", text: "검색 할 지역 선택" },
        { value: "1", text: "서울" },
        { value: "2", text: "인천" },
        { value: "3", text: "대전" },
        { value: "4", text: "대구" },
        { value: "5", text: "광주" },
        { value: "6", text: "부산" },
        { value: "7", text: "울산" },
        { value: "8", text: "세종특별자치시" },
        { value: "31", text: "경기도" },
        { value: "32", text: "강원도" },
        { value: "33", text: "충청북도" },
        { value: "34", text: "충청남도" },
        { value: "35", text: "경상북도" },
        { value: "36", text: "경상남도" },
        { value: "37", text: "전라북도" },
        { value: "38", text: "전라남도" },
        { value: "39", text: "제주도" },
      ],
      options_type: [
        { value: "1", text: "제목순 정렬" },
        { value: "2", text: "거리순 정렬" },
      ],
      options_content: [
        { value: "", text: "전체 선택" },
        { value: "12", text: "관광지" },
        { value: "14", text: "문화시설" },
        { value: "15", text: "축제공연행사" },
        { value: "25", text: "여행코스" },
        { value: "28", text: "레포츠" },
        { value: "32", text: "숙박" },
        { value: "38", text: "쇼핑" },
        { value: "39", text: "음식점" },
      ],
    };
  },
  computed: {
    ...mapState("memberStore", ["isLogin", "userInfo"]),
    lists() {
      const copy = this.items;
      return copy.slice(
        (this.pagingParam.currentPage - 1) * this.pagingParam.perPage,
        this.pagingParam.currentPage * this.pagingParam.perPage
      );
    },
    totalRows() {
      return this.items.length;
    },
  },
  mounted() {
    this.createMap();
  },
  watch: {
    searchMarkerState: function () {
      if (this.searchMarkerState === true) {
        this.markerController(this.searchMarkers, "show");
      } else {
        this.overlayController(this.searchOverlays, "hide");
        this.markerController(this.searchMarkers, "hide");
      }
    },
    planMarkerState: function () {
      if (this.planMarkerState === true) {
        this.markerController(this.planMarkers, "show");
      } else {
        this.overlayController(this.planOverlays, "hide");
        this.markerController(this.planMarkers, "hide");
      }
    },
  },
  methods: {
    noImage(e) {
      e.target.src = require("@/assets/icon/noimage.png");
    },
    savePlan() {
      http
        .post("/travelplan/save", {
          userId: this.userInfo.userId,
          planName: this.$route.query.name,
          content: JSON.stringify(this.plans),
        })
        .then((response) => {
          const success = response.data;
          if (success) {
            alert("저장완료");
          } else {
            alert("저장실패");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    loadPlan() {
      http
        .get("/travelplan/load", {
          params: {
            userId: this.userInfo.userId,
            planName: this.$route.query.name,
          },
        })
        .then((response) => {
          if (response.data !== null && response.data !== "") {
            this.plans = response.data;
            this.$nextTick(() => {});
            this.makeMarker(
              this.plans[this.currentTab].data,
              this.planMarkers,
              this.planOverlays,
              this.planMarkerState,
              "plan"
            );
            this.updatePlan();
          }
        });
    },
    deletePlan() {
      if (this.plans.length > 1) {
        this.plans.splice(this.currentTab, 1);
        this.currentTab = 0;
      } else {
        alert("삭제할 수 없습니다.");
      }
    },
    addTab() {
      this.plans.push({
        name: "Day" + (++this.tabCounter + 1),
        data: [],
      });
    },
    tabPlan(index) {
      this.currentTab = index;
      this.makeMarker(
        this.plans[this.currentTab].data,
        this.planMarkers,
        this.planOverlays,
        this.planMarkerState,
        "plan"
      );
      this.updatePlan();
    },
    addPlan(item) {
      this.plans[this.currentTab].data.push({
        title: item.title,
        addr1: item.addr1,
        addr2: item.addr2,
        latitude: item.latitude,
        longitude: item.longitude,
        firstImage: item.firstImage,
      });
      this.updatePlan();
      this.makeMarker(
        this.plans[this.currentTab].data,
        this.planMarkers,
        this.planOverlays,
        this.planMarkerState,
        "plan"
      );
    },
    removePlan(index) {
      this.plans[this.currentTab].data.splice(index, 1);
      this.updatePlan();
    },
    upPlan(index) {
      if (index <= 0) {
        alert("이동할 수 없습니다.");
      } else {
        var copy = this.plans[this.currentTab].data;
        this.plans[this.currentTab].data = [];
        const tmp = copy[index];
        copy[index] = copy[index - 1];
        copy[index - 1] = tmp;
        this.plans[this.currentTab].data = copy;
        this.updatePlan(index - 1);
      }
    },
    downPlan(index) {
      if (index >= this.plans[this.currentTab].data.length - 1) {
        alert("이동할 수 없습니다.");
      } else {
        var copy = this.plans[this.currentTab].data;
        this.plans[this.currentTab].data = [];
        const tmp = copy[index];
        copy[index] = copy[index + 1];
        copy[index + 1] = tmp;
        this.plans[this.currentTab].data = copy;
        this.updatePlan(index + 1);
      }
    },
    /*
      index: 업데이트 후 이동
    */
    updatePlan(index) {
      // 변수
      let i;
      // 선 초기화
      if (this.polyline) {
        this.polyline.setMap(null);
      }
      // 점 초기화
      for (i = 0; i < this.dots.length; i++) {
        this.dots[i].setMap(null);
      }
      this.dots = [];
      if (this.plans[this.currentTab].data.length > 0) {
        this.linePath = [];
        for (i = 0; i < this.plans[this.currentTab].data.length; i++) {
          this.linePath.push(
            new kakao.maps.LatLng(
              this.plans[this.currentTab].data[i].latitude,
              this.plans[this.currentTab].data[i].longitude
            )
          );
        }
        // 선 그리기
        this.polyline = new kakao.maps.Polyline({
          path: this.linePath,
          strokeWeight: 3,
          strokeColor: "#db4040",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });
        this.polyline.setMap(this.map);
        // 점 그리기
        for (i = 0; i < this.linePath.length; i++) {
          var circleOverlay = new kakao.maps.CustomOverlay({
            content: '<span class="dot"></span>',
            position: this.linePath[i],
            zIndex: 1,
          });

          this.dots.push(circleOverlay);

          circleOverlay.setMap(this.map);
        }

        if (index) {
          this.map.setCenter(this.linePath[index]);
        } else {
          this.map.setCenter(this.linePath[this.linePath.length - 1]);
        }
      }
    },
    createMap() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?appkey=509e8446f54aaa4ff63503311698321b&autoload=false";
      document.head.appendChild(script);
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.500613, 127.036431),
        level: 7,
      };
      this.map = new kakao.maps.Map(container, options);

      // 계획 가져오기
      this.loadPlan();
    },
    // 관광지 리스트 출력
    submitForm() {
      if (this.formData.searchArea === "" || this.formData.searchArea === null) {
        alert("검색할 지역을 선택해주세요");
      } else {
        http
          .post("/tripsearch/list", this.formData)
          .then((response) => {
            this.items = response.data;
            this.makeMarker(
              this.items,
              this.searchMarkers,
              this.searchOverlays,
              this.searchMarkerState
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    // 인포윈도우를 표시하는 클로저 생성
    makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    },

    // 마커 컨트롤러
    markerController(markers, action) {
      var i = 0;
      if (action === "reset") {
        for (i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers.length = 0;
      } else if (action === "show") {
        for (i = 0; i < markers.length; i++) {
          markers[i].setMap(this.map);
        }
      } else if (action === "hide") {
        for (i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }
    },

    // 오버레이 컨트롤러
    overlayController(overlays, action) {
      var i = 0;
      if (action === "reset") {
        for (i = 0; i < overlays.length; i++) {
          overlays[i].setMap(null);
        }
        overlays.length = 0;
      } else if (action === "show") {
        for (i = 0; i < overlays.length; i++) {
          overlays[i].setMap(this.map);
        }
      } else if (action === "hide") {
        for (i = 0; i < overlays.length; i++) {
          overlays[i].setMap(null);
        }
      }
    },

    // 마커 생성
    makeMarker(items, markers, overlays, state, name) {
      // 변수
      var i;
      // 기존 마커 제거
      this.markerController(markers, "reset");
      // 기존 오버레이 제거
      this.overlayController(overlays, "reset");

      // 추가 : forEach로 변경 필요
      for (i = 0; i < items.length; i++) {
        // 상수 고정
        const map = this.map;
        const num = i;

        // 마커 이미지
        if (name === "plan") {
          var imageSize = new window.kakao.maps.Size(24, 35);
          var markerImage = new window.kakao.maps.MarkerImage(this.imageSrc, imageSize);
        }

        // 마커 생성
        var marker = new window.kakao.maps.Marker({
          map: this.map,
          position: new window.kakao.maps.LatLng(items[i].latitude, items[i].longitude),
          clickable: true,
          image: markerImage,
        });
        markers.push(marker);
        // 오버레이 생성(상수 고정)
        const overlay = new window.kakao.maps.CustomOverlay({
          map: this.map,
          position: marker.getPosition(),
        });
        overlays.push(overlay);
        // DOC parse
        var content = document.createElement("div");
        content.className = "wrap";
        var info = document.createElement("div");
        info.className = "info";
        var title = document.createElement("div");
        title.className = "title";
        title.innerText = items[i].title;
        var close = document.createElement("div");
        close.className = "close";
        close.onclick = () => {
          overlays[num].setMap(null);
        };
        title.appendChild(close);
        var body = document.createElement("div");
        body.className = "body";
        var img = document.createElement("div");
        img.className = "img";
        var img_content = document.createElement("img");
        img_content.src = items[i].firstImage;
        img_content.width = "73";
        img_content.height = "70";
        img.appendChild(img_content);
        var desc = document.createElement("div");
        desc.className = "desc";
        var add2 = document.createElement("div");
        add2.className = "ellipsis";
        add2.innerText = items[i].addr2;
        var add1 = document.createElement("div");
        add1.className = "jibun ellipsis";
        add1.innerText = items[i].addr1;
        desc.appendChild(add1);
        desc.appendChild(add2);
        body.appendChild(img);
        body.appendChild(desc);
        info.appendChild(title);
        info.appendChild(body);
        content.appendChild(info);

        // 오버레이 내용 추가
        overlays[num].setContent(content);
        // 오버레이 숨기기
        overlay.setMap(null);
        if (state === false) {
          marker.setMap(null);
        }
        // 마커를 클릭했을 때 커스텀 오버레이를 표시한다.
        kakao.maps.event.addListener(marker, "click", function () {
          overlay.setMap(map);
        });
      }
      // 마커위치로 화면 이동
      if (items.length > 0) this.moveCenter(items[0].latitude, items[0].longitude);
    },
    // 중심 이동
    moveCenter(lat, lng) {
      this.map.setCenter(new window.kakao.maps.LatLng(lat, lng));
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.modalState = valid;
      return valid;
    },
    resetModal(show) {
      this.modalState = null;
      if (show) {
        this.modalName = this.plans[this.currentTab].name;
      }
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }

      this.plans[this.currentTab].name = this.modalName;

      this.$nextTick(() => {
        this.$bvModal.hide("modal-modify");
      });
    },
  },
};
</script>

<style>
.main {
  display: flex;
  padding: 5px 20px 5px 20px;
}
.title {
  margin: 20px 20px 0px 20px;
  padding: 2px;
}
.tab_controller {
  margin: 5px 20px 0px 20px;
  padding: 2px;
  border: solid 2px gray;
  background-color: lightgoldenrodyellow;
  border-radius: 5px;
  overflow: auto;
  white-space: nowrap;
}
.map_controller {
  padding: 5px 5px 5px 5px;
  border: solid 2px gray;
  background-color: lightgoldenrodyellow;
  border-radius: 5px;
  margin-right: 5px;
  flex: 2;
}
.plan {
  padding: 5px 5px 0px 5px;
  border: solid 2px gray;
  background-color: lightgoldenrodyellow;
  border-radius: 5px;
  max-height: 558px;
  overflow-y: auto;
  flex: 1;
}
.list {
  margin: 0px 20px 20px 20px;
  padding: 5px 5px 5px 5px;
  border: solid 2px gray;
  background-color: lightgoldenrodyellow;
  border-radius: 5px;
}
.custom_card {
  display: flex;
  height: 100px;
  margin-bottom: 5px;
  border: solid 1px gray;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
}
.plan_content {
  padding: 5px;
  flex-grow: 1;
}
.plan_controller {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50px;
  padding: 5px;
  background-color: lightgray;
  align-content: center;
}
b-card {
  margin-bottom: 5px;
}
img {
  height: auto;
  width: 100px;
}
font-awesome-icon:hover {
  cursor: pointer;
}
/* Custom Overlay : dot */
.dot {
  overflow: hidden;
  float: left;
  width: 12px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png");
}
/* Custom Overlay : info */
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
  color: #5085bb;
}
</style>
