<template>
  <div class="main">
    <a-form
      id="frmLogin"
      class="user-layout-login"
      :label-col="labelCol"
      :model="formState"
      @finish="handleSubmit"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input size="large" v-model:value="formState.username"> </a-input>
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password size="large" v-model:value="formState.password">
          <template #prefix>
            <lock-outlined :style="{ color: 'rgba(0,0,0,.25)' }" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember"
          >Remember me</a-checkbox
        >
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
    <!--    <a-form>-->
    <!--      <a-form-item>-->
    <!--        <a-input size="large" type="text" :aria-placeholder="username"-->
    <!--                 v-decorator="[ 'username', {rules:[{required: true, message: 'please input username'}]}] ">-->
    <!--          <template #prefix>-->
    <!--            <user-outlined :style="{ color: 'rgba(0,0,0,.25)' }" />-->
    <!--          </template>-->
    <!--        </a-input>-->
    <!--      </a-form-item>-->
    <!--      <a-form-item>-->
    <!--        <a-input size="large" type="text" :aria-placeholder="password"-->
    <!--                 v-decorator="[ 'username', {rules:[{required: true, message: 'please input username'}], validateTrigger: 'blur'}] ">-->
    <!--          <template #prefix>-->
    <!--            <lock-outlined :style="{ color: 'rgba(0,0,0,.25)' }" />-->
    <!--          </template>-->
    <!--        </a-input>-->
    <!--      </a-form-item>-->
    <!--    </a-form>-->
    <div style="margin: 5px auto; width: 300px">
      username:
      <input type="text" name="username" v-model="formState.username" />
    </div>
    <div style="margin: 5px auto; width: 300px">
      password:
      <input type="text" name="password" v-model="formState.password" />
    </div>
    <div style="margin: 5px auto; width: 300px">
      rememberMe:
      <input type="checkbox" name="rememberMe" v-model="formState.rememberMe" />
    </div>
    <div style="margin: 5px auto; width: 300px">
      <button style="width: 100%" @click="handleSubmit">login2</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
import { reactive, computed } from "vue";
import { Form } from "ant-design-vue";

const useForm = Form.useForm;
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
    // console.log("setup -> props", props);

    const formState: any = reactive({
      username: "admin",
      password: "admin123",
      remember: false,
    });
    const { validate } = useForm(formState);

    const clickEvent = () => {
      console.log("click");
      emit("sendMsg", formState.result);
    };
    // 提交
    const handleSubmit = () => {
      validate()
        .then(() => {
          console.log((formState));
          console.log(toRaw(formState));
          let postData = {
            username: formState.username,
            password: formState.password,
            remember: formState.remember,
          };
          console.log(postData);
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    return {
      labelCol: { style: { width: "150px" } },
      formState,
      clickEvent,
      handleSubmit,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
//@import "../../style/index.less";
//@import './../style/index.less';
//@import "./src/style/index";
.user-layout-login {
  margin: 5px auto;
  width: 400px;
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .anticon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        //color: @primary-color;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
