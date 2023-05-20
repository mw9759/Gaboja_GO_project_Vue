<template>
  <div class="plan_list">
    <div class="m-3">
      <!-- 여행목록 -->
      <div
        v-for="trip in trips"
        :key="trip"
        class="plan p-3 m-3 d-flex"
        style="background-color: lightskyblue; justify-content: space-between"
      >
        <div>{{ trip }}</div>
        <div>
          <span class="mr-2"></span>
          <b-button variant="primary">이동</b-button>
          <span class="mr-2"></span>
          <b-button variant="danger">삭제</b-button>
        </div>
      </div>
      <!-- 추가버튼 -->
      <b-button variant="outline-success" class="mt-2" @click="createPlan">추가</b-button>
    </div>

    <!-- modal -->
    <b-modal
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import http from "@/api/http";
import { mapState } from "vuex";

export default {
  name: "TravelPlanList",
  data() {
    return {
      trips: [],
    };
  },
  computed: {
    ...mapState("memberStore", ["isLogin", "userInfo"]),
  },
  methods: {
    getList() {
      http
        .get("/travelplan/list", {
          params: {
            userId: this.userInfo.userId,
          },
        })
        .then((response) => {
          this.trips = response.data;
        });
    },
    createPlan() {
      //작성중
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style>
.plan_list {
  margin-left: 10%;
  margin-right: 10%;
  padding: 3px;
  background-color: lightpink;
}

.plan {
  border: 2px solid gray;
  border-radius: 10px;
}

b-button {
  margin-left: auto;
}
</style>
