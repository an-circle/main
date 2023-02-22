import { post } from '../api_g/index';
export const getGoodsList = (data) =>
  post('goods_center', '/goods-goods/listPage', data);
