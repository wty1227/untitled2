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

<!--<template>-->
<!--  <div class="hello">-->
<!--    <h1>{{ msg }}</h1>-->
<!--    <p>-->
<!--      For a guide and recipes on how to configure / customize this project,<br />-->
<!--      check out the-->
<!--      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"-->
<!--        >vue-cli documentation</a-->
<!--      >.-->
<!--    </p>-->
<!--    <h3>Installed CLI Plugins</h3>-->
<!--    <ul>-->
<!--      <li>-->
<!--        <a-->
<!--          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"-->
<!--          target="_blank"-->
<!--          rel="noopener"-->
<!--          >babel</a-->
<!--        >-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-->
<!--          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"-->
<!--          target="_blank"-->
<!--          rel="noopener"-->
<!--          >router</a-->
<!--        >-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-->
<!--          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex"-->
<!--          target="_blank"-->
<!--          rel="noopener"-->
<!--          >vuex</a-->
<!--        >-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-->
<!--          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"-->
<!--          target="_blank"-->
<!--          rel="noopener"-->
<!--          >eslint</a-->
<!--        >-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-->
<!--          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript"-->
<!--          target="_blank"-->
<!--          rel="noopener"-->
<!--          >typescript</a-->
<!--        >-->
<!--      </li>-->
<!--    </ul>-->
<!--    <h3>Essential Links</h3>-->
<!--    <ul>-->
<!--      <li>-->
<!--        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"-->
<!--          >Forum</a-->
<!--        >-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"-->
<!--          >Community Chat</a-->
<!--        >-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"-->
<!--          >Twitter</a-->
<!--        >-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>-->
<!--      </li>-->
<!--    </ul>-->
<!--    <h3>Ecosystem</h3>-->
<!--    <ul>-->
<!--      <li>-->
<!--        <a href="https://router.vuejs.org" target="_blank" rel="noopener"-->
<!--          >vue-router</a-->
<!--        >-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-->
<!--          href="https://github.com/vuejs/vue-devtools#vue-devtools"-->
<!--          target="_blank"-->
<!--          rel="noopener"-->
<!--          >vue-devtools</a-->
<!--        >-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"-->
<!--          >vue-loader</a-->
<!--        >-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-->
<!--          href="https://github.com/vuejs/awesome-vue"-->
<!--          target="_blank"-->
<!--          rel="noopener"-->
<!--          >awesome-vue</a-->
<!--        >-->
<!--      </li>-->
<!--    </ul>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import { Options, Vue } from "vue-class-component";-->

<!--@Options({-->
<!--  props: {-->
<!--    msg: String,-->
<!--  },-->
<!--})-->
<!--export default class HelloWorld extends Vue {-->
<!--  msg!: string;-->
<!--}-->
<!--</script>-->

<!--&lt;!&ndash; Add "scoped" attribute to limit CSS to this component only &ndash;&gt;-->
<!--<style scoped>-->
<!--h3 {-->
<!--  margin: 40px 0 0;-->
<!--}-->
<!--ul {-->
<!--  list-style-type: none;-->
<!--  padding: 0;-->
<!--}-->
<!--li {-->
<!--  display: inline-block;-->
<!--  margin: 0 10px;-->
<!--}-->
<!--a {-->
<!--  color: #42b983;-->
<!--}-->
<!--</style>-->
