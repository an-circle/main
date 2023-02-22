import { post } from './index';
export const login = (data) =>
  post('merchant_center_public', '/merchant_user/accountLogin', data);
