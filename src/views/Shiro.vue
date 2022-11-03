<template>
  <div class="hello">
    <div style="margin: 5px auto; width: 300px">
      username: <input type="text" name="username" v-model="state.username" />
    </div>
    <div style="margin: 5px auto; width: 300px">
      password: <input type="text" name="password" v-model="state.password" />
    </div>
    <div style="margin: 5px auto; width: 300px">
      rememberMe:
      <input type="checkbox" name="rememberMe" v-model="state.rememberMe" />
    </div>
    <div style="margin: 5px auto; width: 300px">
      <button style="width: 100%" @click="handleSubmit">login</button>
    </div>
  </div>
  <Main />
</template>

<script>
import { defineComponent, reactive } from "vue";
import axios from "axios";
import Main from "@/components/Main";

export default defineComponent({
  name: "Shiro",
  components: { Main },
  setup() {
    const state = reactive({
      username: "admin",
      password: "admin123",
      rememberMe: false,
    });
    const handleSubmit = () => {
      let postData = {
        username: state.username,
        password: state.password,
        rememberMe: state.rememberMe,
      };
      const url =
        "http://localhost:9103/login?" +
        "username=" +
        state.username +
        "&" +
        "password=" +
        state.password +
        "&" +
        "rememberMe=" +
        state.rememberMe;
      axios
        .post(url, JSON.stringify(postData), {
          contentType: "application/json",
          headers: {
            "Access-Token": "MINI",
            appId: "7986C7543b0427F787dD590d6f39a5A0",
            "Content-Type": "application/json;charset=UTF-8",
          },
          xhrFields: {
            withCredentials: true,
          },
        })
        .then((res) => {
          console.log('ok:', res);

          if (res.data.code === 0) {
            // axios
            //   .post(
            //     "http://localhost:9103/getSession",
            //     JSON.stringify(postData),
            //     {
            //       contentType: "application/json",
            //       headers: {
            //         "Access-Token": "MINI",
            //         "Content-Type": "application/json;charset=UTF-8",
            //       },
            //       xhrFields: {
            //         withCredentials: true,
            //       },
            //     }
            //   )
            //   .then((res) => {
            //     console.log("session:", res);
            //   })
            //   .catch((res) => {
            //     console.log("ex session:", res);
            //   });
          }
        });
    };
    return {
      state,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
