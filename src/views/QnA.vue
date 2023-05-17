<template>
  <div>
    <b-container>
      <b-row class="justify-content-center" style="margin-top: 10px">
        <b-col cols="12" class="board-top">
          <b-row class="mb-2 d-flex justify-content-between">
            <b-col cols="auto">
              <router-link
                v-if="userInfo && userInfo.userId != 'admin'"
                :to="{ name: 'adminboardwrite' }"
                ><b-button variant="outline-secondary">글쓰기</b-button></router-link
              >
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
                  style="width: 300px"
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
        <b-table-simple hover responsive>
          <b-thead>
            <b-tr class="text-center">
              <b-th class="text-center">글번호</b-th>
              <b-th class="text-center">제목</b-th>
              <b-th class="text-center">작성자</b-th>
              <b-th class="text-center">작성일</b-th>
              <b-th class="text-center">답변</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="article in articles" :key="article.articleNo" v-bind="article">
              <b-td>{{ article.articleNo }}</b-td>
              <b-th class="text-center" style="width: 40%">
                <router-link
                  :to="{ name: 'adminboardview', params: { articleNo: article.articleNo } }"
                  >{{ article.subject }}</router-link
                >
              </b-th>
              <b-td>{{ article.userId }}</b-td>
              <b-td>{{ article.hit }}</b-td>
              <b-td>{{ article.registerTime }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
        <b-pagination
          v-model="searchParam_list.pg"
          :total-rows="rows"
          :per-page="searchParam.spp"
          aria-controls="my-table"
          @input="search"
        ></b-pagination>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
};
</script>
<style scoped>

</style>
