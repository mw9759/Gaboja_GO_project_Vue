<template>
  <div>
    <section>
      <div class="top_">
        <form
          @submit.prevent="submitForm"
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
          <input id="btn_search" class="btn btn-dark" type="submit" value="검색" />
        </form>
      </div>
    </section>
    <div id="map" style="width: 80%; height: 650px; margin-left: 10%"></div>
    <div class="row">
      <table id="resultTable" class="table table-striped" style="width: 80%; margin-left: 10%">
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
</template>

<script>
import http from "@/api/http";

export default {
  name: "TripList",
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
      items: [],
    };
  },
  methods: {
    submitForm() {
      http
        .post("/tripsearch/list", this.formData)
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
</style>
