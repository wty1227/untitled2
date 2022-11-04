import { getInfo, login, logout } from "@/views/user/login";
import { removeToken, setToken } from "@/utils/token";
import { welcome } from "@/utils";

const user = {
  state: {
    token: "",
    name: "",
    welcome: "",
    avatar: "",
    roles: [],
    info: {},
  },
  mutations: {
    SET_TOKEN: (state: any, token: string) => {
      state.token = token;
      // localStorage.setItem("token", token);
    },
    SET_USERINFO: (state: any, userInfo: any) => {
      state.userInfo = userInfo;
      // localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    REMOVE_INFO: (state: any) => {
      state.token = "";
      state.userInfo = {};
      // localStorage.setItem("token", "");
      // localStorage.setItem("userInfo", JSON.stringify(""));
    },
  },
  actions: {
    // 登录
    Login({ commit }: any, userInfo: any) {
      // const username = userInfo.username.trim();
      // const password = userInfo.password;
      // const code = userInfo.code;
      // const uuid = userInfo.uuid;
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res:any) => {
            // console.log(res);
            setToken(res.token);
            commit("SET_TOKEN", res.token);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((response) => {
            const result = response.data;

            if (result.role && result.role.permissions.length > 0) {
              const role = result.role;
              role.permissions = result.role.permissions;
              role.permissions.map((per) => {
                if (
                  per.actionEntitySet != null &&
                  per.actionEntitySet.length > 0
                ) {
                  const action = per.actionEntitySet.map((action) => {
                    return action.action;
                  });
                  per.actionList = action;
                }
              });
              role.permissionList = role.permissions.map((permission) => {
                return permission.permissionId;
              });
              commit("SET_ROLES", result.role);
              commit("SET_INFO", result);
            } else {
              reject(new Error("getInfo: roles must be a non-null array !"));
            }

            commit("SET_NAME", { name: result.name, welcome: welcome() });
            commit("SET_AVATAR", result.avatar);

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout(/*state.token*/)
          .then((res) => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resolve(res);
          })
          .catch(() => {
            resolve(null);
          })
          .finally();
      });
    },
  },
};
export default user;
