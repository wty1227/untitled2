<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="state.num1" />
    <span>+</span>
    <input type="text" v-model="state.num2" />
    <span>=</span>
    {{ state.result }}
    <button type="button" @click="clickEvent">emit event</button>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { reactive, computed } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  //
  beforeCreate() {
    console.log("beforeCreate");
  },
  // 界面渲染完毕
  mounted() {
    // console.log('mounted')
    console.log("this", this);
  },

  setup(props, { emit }) {
    console.log("setup -> props", props);
    const obj: any = {
      name: "wuming",
      age: 18,
    };
    // user:代理对象  obj:目标对象
    const user = reactive(obj);
    console.log("user", user);
    // console.log(obj)
    // console.log(user.name, user.age)
    // user.gender = 'male'
    // user.name = '++'
    // user.age = 11
    // console.log(user)
    // console.log(obj)

    const state: any = reactive({
      num1: 0,
      num2: 0,
      result: computed(() => parseInt(state.num1) + parseInt(state.num2)),
    });

    const clickEvent = () => {
      console.log("click");
      emit("sendMsg", state.result);
    };
    return {
      state,
      user,
      clickEvent,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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