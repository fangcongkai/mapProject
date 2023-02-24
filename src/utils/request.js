import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";

const BaseURL = 'http://api.map.9dyf.cn/map_api'

const defaultHeaders = {
  "Content-Type": "application/json",
};
// create an axios instance
const service = axios.create({
  baseURL: BaseURL,
  timeout: 30000, // request timeout
  headers: defaultHeaders,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers["Authorization"] = "bearer " + store.getters.token;
      if (noCheckTokenExpiredArr.indexOf(config.url) < 0) {
        return checkTokenExpired(config);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.success) {
      return Promise.resolve(res);
    }

    if (res.code === 401 || res.code === 403) {
      // to re-login
      MessageBox.confirm(
        "您已经登出，您可以取消停留在此页面，或再次登录",
        "确认注销",
        {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        })
        .catch((e) => e);
    } else {
  
      Message({
        message: res.message || "访问出错",
        type: "error",
        showClose: true,
      });
    }

    return Promise.reject(new Error(res.message || "访问出错"));
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 500:
          Message({
            message: error.response.message || "服务器错误",
            type: "error",
            showClose: true,
          });
          break;
        case 401:
        case 403:
          MessageBox.confirm(
            "您已经登出，您可以取消停留在此页面，或再次登录",
            "确认注销",
            {
              confirmButtonText: "重新登录",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
            .then(() => {
              store.dispatch("user/resetToken").then(() => {
                location.reload();
              });
            })
            .catch((e) => e);
          break;

        // 404请求不存在
        case 404:
          Message({
            message: "请求不存在",
            type: "error",
            showClose: true,
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Message({
            message: "服务器错误",
            type: "error",
            showClose: true,
          });
      }
      return Promise.reject(error.response);
    }
    if (error.message.includes("timeout")) {
      error.message = "请求超时";
    }
    Message({
      message: "服务器错误",
      type: "error",
      showClose: true,
    });

    return Promise.reject(error);
  }
);

export default service;
