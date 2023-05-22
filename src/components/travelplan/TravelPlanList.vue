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
          <b-button variant="primary" @click="openPlan(trip)">이동</b-button>
          <span class="mr-2"></span>
          <b-button variant="danger" @click="removePlan(trip)">삭제</b-button>
        </div>
      </div>
      <!-- 추가버튼 -->
      <b-button variant="outline-success" class="mt-2" v-b-modal.modal-append
        >추가</b-button
      >
    </div>

    <!-- modal -->
    <b-modal
      id="modal-append"
      ref="modal"
      title="여행 계획 생성"
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
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
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
      name: "",
      nameState: null,
      message: "",
    };
  },
  computed: {
    ...mapState("memberStore", ["isLogin", "userInfo"]),
  },
  methods: {
    getList() {
      this.trips = [];
      http
        .get("/travelplan/list", {
          params: {
            userId: this.userInfo.userId,
          },
        })
        .then((response) => {
          this.trips = response.data;
          this.$nextTick(() => {});
        });
    },
    removePlan(name) {
      http.delete("/travelplan/remove", {
        data: {
          userId: this.userInfo.userId,
          planName: name,
        },
      });

      location.reload();
    },
    openPlan(name) {
      this.$router.push({
        path: "view",
        query: {
          name: name,
        },
      });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }

      //this.$nextTick(() => {
      this.$bvModal.hide("modal-append");
      //});

      http
        .post("/travelplan/create", {
          userId: this.userInfo.userId,
          planName: this.name,
        })
        .then((response) => {
          if (response.data === false) {
            alert("생성에 실패했습니다.");
          } else {
            alert("생성에 성공했습니다.");
            location.reload();
          }
        });
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
