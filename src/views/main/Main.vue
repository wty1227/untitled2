<template>
  <h1>Main UI</h1>
  <h3>Session: {{ state.session }}</h3>
  <br />
  <button style="width: 200px" @click="testPermission">permission</button>

  <button style="width: 200px" @click="testUnPermission">unpermission</button>

  <span style="color: darkred">result: {{ state.result }}</span>
</template>

<script>
import { defineComponent, reactive } from "vue";
import axios from "axios";
import { getNotice, Permission, Unpermission } from "@/views/main/main";

export default defineComponent({
  name: "Main",
  setup() {
    const state = reactive({
      session: "",
      result: "",
    });
    const testPermission = () => {
      const postData = {
        courseId: 1
      }
      Permission(postData).then((res) => {
        console.log(res);
      })
    };
    const testUnPermission = () => {
      const postData = {
        schoolId: 1
      }
      Unpermission(postData).then((res) => {
        console.log(res);
      })
    };
    const getSession = (value) => {
      state.result = "";
      axios
        .post(
          "http://localhost:9103/getSession",
          {},
          {
            contentType: "application/json",
            headers: {
              "Access-Token": "MINI",
              appId: "7986C7543b0427F787dD590d6f39a5A0",
              "Content-Type": "application/json;charset=UTF-8",
            },
            xhrFields: {
              withCredentials: true,
            },
          }
        )
        .then((res) => {
          state.result = res.data;
          console.log(res);
        })
        .catch((res) => {
          state.result = res.data;
          console.log(res);
        });
    };
    return {
      state,
      getSession,
      testPermission,
      testUnPermission
    };
  },
});
</script>

<style scoped></style>
