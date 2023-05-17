<template>
  <section>
    <div class="top_">
      <form
        @submit.prevent="moveTripSearch"
        id="form-serach"
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
          id="search-area"
          name="search-area"
          class="form-select"
          aria-label="Default select example"
          style="border: none"
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
          id="sort-type"
          name="sort-type"
          class="form-select"
          aria-label="Default select example"
          style="border: none"
        >
          <option value="1" selected>제목순 정렬</option>
          <option value="2">거리순 정렬</option>
        </select>
        <select
          id="search-content-id"
          name="search-content-id"
          class="form-select"
          aria-label="Default select example"
          style="border: none"
        >
          <option value="" selected>전체 선택</option>
          <option value="12">관광지</option>
          <option value="14m">축제공연행사</option>
          <option value="25">여행코스</option>
          <option value="28">레포츠</option>
          <option value="32">숙박</option>
          <option value="38">쇼핑</option>
          <option value="39">음식점</option>
        </select>
        <input
          id="search-keyword"
          name="search-keyword"
          class="form-control me-2"
          type="text"
          placeholder="검색어"
          aria-label="검색어"
          style="display: inline-block; width: 25%"
        />
        <button id="btn-search" class="btn btn-dark" type="button">검색</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomeView",
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
    };
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
