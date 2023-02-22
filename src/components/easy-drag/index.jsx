import React, { useEffect, useState } from "react";

const Drag = (props) => {
  const [list, setList] = useState(props.children);
  const [current, setCurrent] = useState(null);
  const [endIndex, setEndIndex] = useState(null);

  const onDragStart = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    setList(props?.children);
  }, [props?.children]);

  const onDragEnd = (index) => {
    if (endIndex !== index) {
      let _list = [...list];
      _list[endIndex] = list[current];
      _list[current] = list[endIndex];
      setList(_list);
      console.log(_list, "_list");
      if (props.onChange) {
        console.log(props?.data, "data");
        // 使用的key值用来筛选
        let newArr = [];
        _list.forEach((item) => {
          props.data?.forEach((i) => {
            if (item?.key === i?.key) {
              newArr.push(i);
            }
          });
        });
        console.log(newArr, "newArr");
        props.onChange(newArr);
      }
    }
    setEndIndex(null);
    setCurrent(null);
  };

  /**
   * @description: 可以获取到当前滑动到第几个
   * @param {any} e 下表数目
   * @param {number} index
   * @return {*}
   */
  const onDragOver = (index) => {
    setEndIndex(index);
  };

  return (
    <div>
      {list.map((item, index) => (
        <div
          key={item.key}
          draggable="true"
          onDragStart={() => onDragStart(index)}
          onDragOver={() => onDragOver(index)} // 获取到最终的位置
          onDragEnd={() => onDragEnd(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
export default Drag;
