<template>
  <h1>Main UI</h1>
  <h3>Session: {{ state.session }}</h3>
  <br />
  <button style="width: 200px" @click="getSession">getSession</button>

  <span style="color: darkred">result: {{state.result}}</span>
</template>

<script>
import { defineComponent, reactive } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Main",
  setup() {
    const state = reactive({
      session: "",
      result: ''
    });
    const getSession = (value) => {
      state.result = '';
      axios.post("http://localhost:9103/getSession",{}, {
        contentType: "application/json",
        headers: {
              "Access-Token": "MINI",
              appId: "7986C7543b0427F787dD590d6f39a5A0",
              "Content-Type": "application/json;charset=UTF-8",
        },
        xhrFields: {
          withCredentials: true,
        },
      }).then((res) => {
        state.result = res.data
        console.log(res);
      }).catch((res) => {
        state.result = res.data
        console.log(res);
      });
    };
    return {
      state,
      getSession,
    };
  },
});
</script>

<style scoped></style>
