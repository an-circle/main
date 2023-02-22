import React, { useMemo } from "react";
import { Input } from "antd";

export default (props) => {
  const Color = useMemo(() => {
    return ({ value, onColorChange }) => {
      return (
        <input
          style={{ width: 27, padding: 0, border: "none", cursor: "pointer" }}
          type="color"
          value={value ?? ""}
          onChange={(e) => onColorChange(e.target.value)}
        ></input>
      );
    };
  }, []);

  const handleChange = (value) => {
    props.onChange(value);
  };

  return (
    <Input
      prefix={<Color value={props?.value} onColorChange={handleChange} />}
      {...props}
      //   type="color"
      value={props?.value}
      onChange={handleChange}
      //   onChange={handleChange}
      readOnly
    ></Input>
  );
};
