import { EasyCopy, EasyDate, EasyText } from 'easy-components-react';
import React from 'react';

export default (type = 'text', current, record) => {
  const data = {
    copy: <EasyCopy current={current}></EasyCopy>,
    date: <EasyDate current={current}></EasyDate>,
    text: <EasyText current={current}></EasyText>,
  };
  return data[type];
};
