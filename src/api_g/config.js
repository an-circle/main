// let baseURL;

// console.log(process.env.APP_ENV, "process.env.APP_ENV");

// if (process.env.APP_ENV === "dev") {
//   baseURL = "http://api.xianmaiyangsheng.com:7011/api";
// } else if (process.env.APP_ENV === "test") {
//   baseURL = "http://test.xianmaiyangsheng.com:7011/api";
// } else if (process.env.APP_ENV === "real") {
//   baseURL = "http://real.xianmaiyangsheng.com:7011/api";
// }

const data = {
  dev: 'http://gateway.giimall.net/',
  test: 'http://test.xianmaiyangsheng.com:7011/api',
  real: 'http://test.xianmaiyangsheng.com:7011/api',
};

const { APP_ENV } = process.env;

const baseURL = 'http://gateway.giimall.net/';

export default baseURL;
