import { post } from '../api_g/index';

export const getGoodsList = (data) =>
  post('goods_center', '/goods-goods/listPage', data);
export const setGoodsStatus = (data) =>
  post('goods_center', '/goods-goods/setStatus', data);
