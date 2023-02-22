import React, { useContext, useMemo } from "react";
import { Form } from "antd";
import FieldContext from "./reducer/fieldContext";
import Element from "./components/Element";

export default (props) => {
  const config = useContext(FieldContext);
  const { name } = props;

  const SelectConfig = useMemo(() => {
    return config?.filter((item) => {
      return item?.item?.name === name;
    });
  }, [name, config]);

  return SelectConfig?.map((item, index) => (
    <Form.Item {...item?.item} key={index}>
      <Element
        element={item?.element}
        type={item?.type}
        render={item?.render}
      ></Element>
    </Form.Item>
  ));
};
