import React from "react";
import Input from "../Input";
import Select from "../Select";
import Checkbox from "../Checkbox";
import Radio from "../Radio";
import Custom from "../Custom";
import Text from "../Text";
import TextArea from "../TextArea";
import Cascader from "../Cascader";
import DatePicker from "../DataPicker";
import RangePicker from "../RangePicker";
import TreeSelect from "../TreeSelect";
import InputNumber from "../InputNumber";
import Switch from "../Switch";
import Color from "../Color";
import { Space } from "antd";

export default function Element(props) {
  const { element, type, value, onChange, render } = props;

  const { outer, ...rest } = element ?? {};
  const Components = (props) => {
    const enumOptions = {
      input: <Input {...props}></Input>,
      select: <Select {...props}></Select>,
      checkbox: <Checkbox {...props}></Checkbox>,
      radio: <Radio {...props}></Radio>,
      custom: <Custom {...props}></Custom>,
      text: <Text {...props}></Text>,
      textarea: <TextArea {...props} />,
      cascader: <Cascader {...props}></Cascader>,
      datePicker: <DatePicker {...props}></DatePicker>,
      rangePicker: <RangePicker {...props}></RangePicker>,
      treeSelect: <TreeSelect {...props}></TreeSelect>,
      inputNumber: <InputNumber {...props}></InputNumber>,
      switch: <Switch {...props}></Switch>,
      color: <Color {...props}></Color>,
    };
    return (type) => enumOptions[type];
  };

  // 绑定 value 和 onChange
  const real = Components({ ...rest, value, onChange, render });
  return (
    <div style={{ display: "flex" }}>
      {real(type)}
      {outer && (
        <div style={{ marginLeft: 8, display: "flex" }}>
          <Space>{outer}</Space>
        </div>
      )}
    </div>
  );
}
