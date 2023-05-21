<template>
  <div>
    <!-- Tab -->
    <div class="tab_controller">
      <div>
        <b-button pill variant="primary" class="mr-1">Button</b-button>
        <b-button pill variant="outline-primary">new</b-button>
      </div>
    </div>

    <div class="wrap">
      <!-- 지도 -->
      <div class="map_controller">
        <b-form class="d-flex" style="margin-bottom: 5px" @submit.prevent="submitForm">
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
        <div id="map" style="width: 100%; height: 500px"></div>
      </div>
      <!-- 계획 -->
      <div v-bar class="plan">
        <div>
          <b-card
            v-for="(plan, index) in plans"
            :key="index"
            :img-src="plan.image"
            img-alt="Card image"
            img-left
            style="height: 100px; margin-bottom: 5px"
          >
            <b-card-text>
              {{ plan.title }}<br />
              {{ plan.address }}
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
    <!-- 목록 -->
    <div class="list">
      <div class="row">
        <table id="resultTable" class="table">
          <thead style="background-color: aliceblue">
            <tr>
              <th>대표이미지</th>
              <th>관광지명</th>
              <th>주소</th>
              <th style="width: 150px">현재 위치와의 거리</th>
              <th style="display: none">위도</th>
              <th style="display: none">경도</th>
              <th>상세 설명</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.contentId">
              <td>
                <img :src="item.firstImage" style="object-fit: cover" />
              </td>
              <td>{{ item.title }}</td>
              <td>{{ item.addr1 }}</td>
              <td>{{ item.distance }} km</td>
              <td style="display: none">{{ item.latitude }}</td>
              <td style="display: none">{{ item.longitude }}</td>
              <td>{{ item.overview }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vuebar from "vuebar";
import http from "@/api/http";
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
      map: null,
      items: [],
      markers: [],
      tabs: [],
      tabCounter: 0,
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
      plans: [
        {
          title: "장소1",
          address: "주소1",
          image: "https://picsum.photos/250/250/?image=54",
        },
        {
          title: "장소2",
          address: "주소2",
          image: "https://picsum.photos/250/250/?image=54",
        },
        {
          title: "장소3",
          address: "주소3",
          image: "https://picsum.photos/250/250/?image=54",
        },
        {
          title: "장소4",
          address: "주소4",
          image: "https://picsum.photos/250/250/?image=54",
        },
        {
          title: "장소5",
          address: "주소5",
          image: "https://picsum.photos/250/250/?image=54",
        },
        {
          title: "장소6",
          address: "주소6",
          image: "https://picsum.photos/250/250/?image=54",
        },
        {
          title: "장소7",
          address: "주소7",
          image: "https://picsum.photos/250/250/?image=54",
        },
        {
          title: "장소8",
          address: "주소8",
          image: "https://picsum.photos/250/250/?image=54",
        },
        {
          title: "장소9",
          address: "주소9",
          image: "https://picsum.photos/250/250/?image=54",
        },
        {
          title: "장소10",
          address: "주소10",
          image: "https://picsum.photos/250/250/?image=54",
        },
      ],
    };
  },
  mounted() {
    this.createMap();
  },
  methods: {
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
    },
    closeTab(x) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] === x) {
          this.tabs.splice(i, 1);
        }
      }
    },
    newTab() {
      this.tabs.push({ index: this.tabCounter, id: this.tabCounter, map: null });
      this.tabCounter++;
      this.createMap(this.tabCounter - 1);
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
            this.makeMarker(this.items);
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

    // 마커 제거
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },

    // 마커 생성
    makeMarker() {
      this.removeMarker();
      let positions = [];
      for (var item of this.items) {
        positions.push({
          content: `<div class="info" v-on="moveCenter(${item.latitude}, item.longitude);">
                      <div class="title">${item.title}</div>
                      <div class="body">
                        <div class="img">
                          <img src="${item.firstImage}" width="73" height="70">
                        </div>
                        <div class="desc">
                          <div class="ellipsis">${item.addr2}</div>
                          <div class="jibun ellipsis">${item.addr1}</div>
                        </div>
                      </div>
                    </div>`,
          title: item.title,
          latlng: new window.kakao.maps.LatLng(item.latitude, item.longitude),
        });
      }
      for (var i = 0; i < positions.length; i++) {
        var marker = new window.kakao.maps.Marker({
          map: this.map,
          position: positions[i].latlng,
          clickable: true,
        });
        this.markers.push(marker);
        var iwContent = positions[i].content;
        var iwRemoveable = true;
        var infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });
        window.kakao.maps.event.addListener(
          marker,
          "click",
          this.makeOverListener(this.map, marker, infowindow)
        );
      }
      this.map.setCenter(positions[0].latlng);
    },
    // 중심 이동
    moveCenter(lat, lng) {
      this.map.setCenter(new window.kakao.maps.LatLng(lat, lng));
    },
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
  padding: 5px 20px 5px 20px;
}
.test {
  height: 500px;
  background-color: lightgrey;
}
.tab_controller {
  margin: 20px 20px 0px 20px;
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
  border: solid 2px gray;
  background-color: lightgoldenrodyellow;
  border-radius: 5px;
}
b-card {
  margin-bottom: 5px;
}
img {
  height: auto;
  width: 100px;
}
</style>
