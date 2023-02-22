import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";
import { Form } from "antd";
import Element from "./components/Element";
import FieldContext from "./reducer/fieldContext";

const EForm = (props, ref) => {
  const { config: defaultConfig, instance, ...rest } = props;

  const [form] = Form.useForm();

  const [config, setConfig] = useState([]);

  const handleValueChange = (changeValues, allValues) => {
    // setChangeValues(allValues);
    console.log("数据改变");
    instance.setValuesChange(changeValues, allValues);
  };

  const handleSetConfig = (data) => {
    setConfig([...data]);
    const res = getInitValues(data);
    if (instance.setFieldsValue) {
      instance.setFieldsValue(res);
    }
  };

  useEffect(() => {
    // 初始化给form
    instance.init(form, defaultConfig, (data) => {
      handleSetConfig(data);
    });
    // 给instance挂载 form 的函数
    Object.keys(form)?.map((item) => {
      // 如果是挂载过就不挂载了
      if (!instance[item]) {
        instance[item] = form[item];
      }
    });
  }, [instance]);

  // 获取初始值
  const getInitValues = useMemo(() => {
    return (defaultConfig) => {
      const data = defaultConfig?.reduce((prev, next) => {
        if (next?.defaultValue) {
          prev[next?.item?.name] = next?.defaultValue;
        }
        return prev;
      }, {});
      return data;
    };
  }, [defaultConfig]);

  const Render = () => {
    return config?.map((item) => {
      return (
        <Form.Item {...item?.item} key={item?.item?.name}>
          <Element
            element={item?.element}
            type={item?.type}
            render={item?.render}
          ></Element>
        </Form.Item>
      );
    });
  };

  return (
    <Form
      {...rest}
      form={form}
      initialValues={getInitValues(defaultConfig)}
      onValuesChange={handleValueChange}
    >
      <FieldContext.Provider value={config}>
        {/* 根据是否有子节点判断渲染哪个组件 */}
        {props?.children || <Render />}
      </FieldContext.Provider>
    </Form>
  );
};

export default forwardRef(EForm);
