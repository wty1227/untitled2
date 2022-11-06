<template>
  <div class="main">
    <a-form
      id="frmLogin"
      class="user-layout-login"
      :label-col="labelCol"
      :model="formRef"
      @submit="handleSubmit"
    >
      <a-form-item
        v-bind="validateInfos.username"
        label="用户名"
        name="username"
      >
        <a-input size="large" v-model:value="formRef.username"></a-input>
      </a-form-item>
      <a-form-item v-bind="validateInfos.password" label="密码" name="password">
        <a-input-password size="large" v-model:value="formRef.password">
          <template #prefix>
            <lock-outlined :style="{ color: 'rgba(0,0,0,.25)' }" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item name="rememberMe" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formRef.rememberMe">记住我</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
          >登录
        </a-button>
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
    <!--    <div style="margin: 5px auto; width: 300px">-->
    <!--      username:-->
    <!--      <input type="text" name="username" v-model="formRef.username" />-->
    <!--    </div>-->
    <!--    <div style="margin: 5px auto; width: 300px">-->
    <!--      password:-->
    <!--      <input type="text" name="password" v-model="formRef.password" />-->
    <!--    </div>-->
    <!--    <div style="margin: 5px auto; width: 300px">-->
    <!--      rememberMeMe:-->
    <!--      <input-->
    <!--        type="checkbox"-->
    <!--        name="rememberMeMe"-->
    <!--        v-model="formRef.rememberMeMe"-->
    <!--      />-->
    <!--    </div>-->
    <!--    <div style="margin: 5px auto; width: 300px">-->
    <!--      <button style="width: 100%" @click="handleSubmit">login2</button>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
import { reactive, computed } from "vue";
import { Form } from "ant-design-vue";
import { useStore } from "vuex";
import { loginSuccess, requestFailed } from "@/views/user/login";
import { useRouter } from "vue-router";
// import { useI18n } from "vue-i18n";

// mapActions(['Login','Logout'])
// const { t } = useI18n();
// const {Login}

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
    const useForm = Form.useForm;
    const store = useStore();
    const router = useRouter();
    const Login = (userInfo) => store.dispatch("Login", userInfo);

    const state = reactive({
      loginBtn: false,
      loginType: 0,
    });
    // #region 表单相关
    const formRef: any = reactive({
      username: "admin",
      password: "admin123",
      rememberMe: false,
    });
    // 规则属性
    const rulesRef = reactive({
      remeberMe: [{ trigger: "checked" }],
      username: [
        {
          required: true,
          message: "请输入用户名",
        },
        // {
        //   validator: handleUsernameOrEmail,
        //   trigger: 'change'
        // }
      ],
      password: [{ required: true, message: "请输入密码" }],
      captchaP: [
        {
          required: true,
          message: "请输入验证码！",
          validateTrigger: "blur",
        },
      ],
    });

    const { validate, validateInfos } = useForm(formRef, rulesRef);

    const clickEvent = () => {
      console.log("click");
      emit("sendMsg", formRef.result);
    };
    // 提交
    const handleSubmit = () => {
      validate()
        .then(() => {
          state.loginBtn = true;
          // console.log(formRef);
          // console.log(toRaw(formRef));
          Login(toRaw(formRef))
            .then((res) => {
              // console.log(res);
              loginSuccess(res);
            })
            .catch((err) => {
              // console.log("err:", err);
              // requestFailed(err);
            })
            .finally(() => {
              state.loginBtn = false;
            });
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    return {
      labelCol: { style: { width: "100px" } },
      state,
      formRef,
      rulesRef,
      validateInfos,
      clickEvent,
      handleSubmit,
      // Login: () => store.dispatch("Login"),
      // LogOut: () => store.dispatch('LoginOut')
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
//@import "../../style/index.less";
//@import './../style/index.less';
//@import "./src/style/index";
.main {
  margin: 368px;
  margin: 50px auto;
}

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
