import axios from 'axios';
// import Vue from "vue";
import storage from '../utils/storage';
import baseURL from './config';
import { autoLogin } from './login';
// import storage from "@/utils/storage";
// 1安装axios
//2  基础配置 接口请求配置  业务开始请求
//2.1 基础配置  请求baseURL  timeout 超时 请求拦截 响应拦截   （竞态请求）

let headers = {
  'x-referrer': 'http://shop.giimall.net/eric2024',
  'x-request-client': 'seller',
};

const config = axios.create({
  baseURL,
  timeout: 1000,
  headers,
  retry: 3,
  retryCount: 0,
});

// 添加请求拦截器
config.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = storage?.getItem('token') ?? '';
    if (config?.retryCount === 0) {
      config.data = {
        jsonrpc: 2,
        method: config?.data?.path,
        params: config?.data?.data,
      };
    }

    return config;
  },
  function (error) {
    console.log(error, 'error');
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
config.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.status == 200) {
      //   new Vue().clearToast();
      console.log(response?.data?.result, 'result');
      return response?.data?.result;
    } else {
      console.log('请求失败');
    }
  },
  async function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error, 'error');
    if (error?.response?.status === 401) {
      error.config.retryCount++;
      if (error.config.retryCount === error.config.retry) {
        return Promise.reject(error);
      }
      await autoLogin();
      return config(error?.config);
    }
    return Promise.reject(error);
  },
);

const get = async (url, data, customConfig) =>
  config.get(url, { data, customConfig });

const post = async (url, path, data) => config.post(url, { path, data });

export { get, post };
