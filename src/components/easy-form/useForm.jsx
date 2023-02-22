import { useRef } from 'react';
import { diff } from './utils/index';
class FormStore {
  constructor() {
    this.store = {};
    this.form = {};
    this.config = {};
    // 记录字段
    this.fieldComponents = [];
    this.eventList = [];
    this.configList = [];
  }

  // 表单改变时触发
  setValuesChange(value, allValues) {
    this.store = allValues;
    console.log(this.eventList, 'this.eventList');
    if (this.eventList?._all) {
      // 全部监听,消费
      this.eventList?._all?.forEach((fn) => {
        fn(this.store);
      });
    }

    // 单个监听 消费
    const name = Object?.keys(value);
    this.eventList?.[name]?.forEach((fn) => {
      fn(value);
    });
  }

  onValuesChange(value, params) {
    if (params) {
      this.eventList[params] = [];
      // 发布订阅模式
      this.eventList[params].push(value);
    } else {
      // 发布一个_all关键字，消费的时候监听
      this.eventList._all = [];
      this.eventList._all.push(value);

      // this.eventList.push({ _all: value });
    }
  }

  addConfig(value, callbackSuccess) {
    console.log('添加表单');
    this.config.push(value);
    this.update();
    callbackSuccess && callbackSuccess('success');
  }

  removeConfig(value, callbackSuccess, callbackFail) {
    const oldConfig = this.config;
    this.config = this.config.filter((item) => item?.item?.name !== value);
    // 判断删除后两个字段是否相等
    if (diff(oldConfig, this.config)) {
      console.warn('不存在删除的字段');
      callbackFail && callbackFail('fail');
      return;
    }
    this.update();
    callbackSuccess && callbackSuccess('success');
  }

  setConfigItem(obj) {
    const keys = Object.keys(obj);
    this.config = this.config.map((item) => {
      if (keys.includes(item?.item?.name)) {
        return {
          ...item,
          item: {
            ...item?.item,
            ...obj[item?.item?.name],
          },
        };
      }
      return item;
    });
    this.update();
  }

  setConfigElement(obj) {
    const keys = Object.keys(obj);
    this.config = this.config.map((item) => {
      if (keys.includes(item?.item?.name)) {
        return {
          ...item,
          element: {
            ...item?.element,
            ...obj[item?.item?.name],
          },
        };
      }
      return item;
    });
    this.update();
  }

  getConfig() {
    return this.config;
  }

  handleChangeConfig() {}

  init(form, config, callback) {
    this.form = form;
    this.config = config;
    // 发布订阅模式，拿到数据有数据了再直行这个函数
    this.configList.push(callback);
    // 通知config 去更新
    callback(this.config);
  }

  update() {
    this.configList.forEach((fn) => {
      fn(this.config);
    });
  }
}

function useForm(props) {
  const EFormRef = useRef();
  // 工厂模式 隐藏new关键字
  let formStore = new FormStore();
  return formStore;
  // formStore[formStore?.form]
  // EFormRef.current = formStore;
  // return EFormRef?.current;
}

export default useForm;
