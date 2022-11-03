import request from "@/utils/http/request";

export function login(parameter) {
  return request({
    url: "/adminInfo/loginAdmin",
    method: "post",
    data: parameter,
  });
}

export function getInfo () {
  return request({
    url: '/adminInfo/adminInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// export function getCurrentUserNav () {
//   return request({
//     url: userApi.UserMenu,
//     method: 'post'
//   })
// }

export function logout () {
  return request({
    url: '/adminInfo/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}