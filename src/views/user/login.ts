import request from "@/utils/http/request";
import { notification } from "ant-design-vue";
import router from "@/router";

export function login(parameter) {
  return request({
    url: "/user/login",
    method: "post",
    data: parameter
  });
}

export function getInfo() {
  return request({
    url: "/adminInfo/adminInfo",
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

// export function getCurrentUserNav () {
//   return request({
//     url: userApi.UserMenu,
//     method: 'post'
//   })
// }

export function logout() {
  return request({
    url: "/adminInfo/logout",
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}


export function loginSuccess(res: any) {

  router.push({ path: "/main"})
}

export function requestFailed(err: any){
  notification.error({
    message: '错误',
    description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
    duration: 4
  })
}