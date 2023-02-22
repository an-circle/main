import storage from '../utils/storage';
import { login } from './common-api';
export const autoLogin = async () => {
  const data = await login({
    password: 'a12345678',
    userName: '13280002821',
  });
  console.log('请求3333');
  storage.setItem('token', `${data?.token_type} ${data?.token}`);
};
