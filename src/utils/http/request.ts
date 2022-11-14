import axios, { AxiosResponse } from "axios";
import { message, Modal } from "ant-design-vue";
import { ACCESS_TOKEN, USER_INFO } from "@/store/mutation-types";
import { baseURL } from "@/config/defaultSettings";
// import ls from '@/utils/Storage'
import { useRouter } from "vue-router";
import errorCode from "@/utils/errorCode";
import { createVNode } from "vue";
import { useStore } from "vuex";
// import { globalLoading } from '@/store/reactiveState'
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// 是否显示重新登录
export const isRelogin = { show: false };
const store = useStore();

const ContentType = {
  urlencoded: "application/x-www-form-urlencoded;charset=UTF-8",
  json: "application/json",
  formData: "multipart/form-data",
};

// 创建 axios 实例   withCredentials: true,
const request = axios.create({
  baseURL,
  timeout: 60000,
  responseType: "json",
  // withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

// request interceptor
request.interceptors.request.use(
  (config) => {
    // globalLoading.value = true
    const token = localStorage.getItem(ACCESS_TOKEN);
    const userinfo: any = localStorage.getItem(USER_INFO);
    if (token) {
      config.headers[ACCESS_TOKEN] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    if (userinfo) {
      config.headers["username"] = userinfo.username; // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    config.headers["Content-Type"] =
      ContentType[config.data instanceof FormData ? "formData" : "json"];
    return config;
  },
  (error) => {
    // globalLoading.value = false
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    // globalLoading.value = false
    // 未设置状态码则默认成功状态
    const code: any = res.data.code || 0;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode["default"];
    // 二进制数据则直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res.data;
    }
    // if (res.status === 200) {
    //   return res.data;
    // }
    if (code === 401 || code === 403 || code === 406) {
      if (!isRelogin.show) {
        isRelogin.show = true;
        Modal.confirm({
          title: "系统提示",
          icon: createVNode(ExclamationCircleOutlined),
          content: "登录状态已过期，您可以继续留在该页面，或者重新登录",
          okText: "重新登录",
          okType: "danger",
          cancelText: "取消",
          onOk() {
            // 返回到登录界面
            isRelogin.show = false;
            store.dispatch("logOut").then(() => {
              location.href = "/login";
            });
          },
          onCancel() {
            isRelogin.show = false;
            // console.log('Cancel');
          },
        });
      }
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code === 500) {
      message.error("请求数据失败, 请重试!\r\n " + ( msg ? "错误消息：" + msg : "" )) ;
      return Promise.reject(new Error(msg));
    } /*else if (code !== 0) {
      return Promise.reject(new Error(msg));
    }*/ else {
      return Promise.resolve(res.data);
    }
  },

  (error) => {
    console.log(error);
    // globalLoading.value = false
    let msg = error.message;
    if (msg == "Network Error") {
      msg = "后端接口连接异常";
    } else if (msg.includes("timeout")) {
      msg = "系统接口请求超时";
    } else if (msg.includes("Request failed with status code")) {
      msg = "系统接口" + msg.substr(msg.length - 3) + "异常";
    }
    message.error(msg);
    return Promise.reject(error);
    // const msg = error.message;
    // const result = error.response;
    // if (result) {
    //   const { data } = result;
    //   message.error(data.msg || data.enMsg || data.message);
    // } else if (msg) {
    //   if (msg === "Network Error") {
    //     message.error("网络错误,请检查网络!");
    //   } else {
    //     message.error(msg);
    //   }
    // } else if (error.__CANCEL__) {
    //   // ignore message error
    // } else {
    //   message.error("未知错误,请重试!");
    // }
    // return Promise.reject(error);
  }
);

export default request;
/*if (res.status === 401 || res.status === 403) {
    message.error("登录过期或权限不足, 请重新登陆!");
    return false;
  }
  else if (res.status === 406) {
      message.error("登陆超时请重新登录!");
      const router = useRouter();
      router.push({ name: "login" });
      return false;
    } */
