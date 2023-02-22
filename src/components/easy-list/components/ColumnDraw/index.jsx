import { BarsOutlined } from '@ant-design/icons';
import { Checkbox, message } from 'antd';
import { EasyDrag, EasyDrawer } from 'easy-components-react';
import React, { useEffect, useState } from 'react';

export default (props) => {
  const { open, onClose, columns, onConfirm } = props;

  const [realColumns, setRealColumns] = useState(columns);
  const [checkValues, setCheckValues] = useState([]);

  const handleChange = (checkedValues) => {
    if (checkedValues?.length < 1) {
      message.error('请至少选择一个');
      return;
    }
    setCheckValues(checkedValues);
  };

  const handleDragChange = (arr) => {
    console.log(arr, 'arr8888');
    setRealColumns(arr);
  };

  const handleConfirm = () => {
    const newColumns = realColumns.map((item) => {
      if (checkValues?.includes(item?.key)) {
        return { ...item, checked: true };
      }
      return { ...item, checked: false };
    });

    onConfirm(newColumns);
  };

  useEffect(() => {
    const checkedArr = columns
      ?.map((item) => {
        if (item.checked) {
          return item?.key;
        }
      })
      ?.filter((item) => item);
    setCheckValues(checkedArr);
    setRealColumns(columns);
  }, [columns]);

  return (
    <>
      <EasyDrawer
        title="编辑表头"
        onClose={onClose}
        visible={open}
        onConfirm={handleConfirm}
      >
        <Checkbox.Group
          style={{
            width: '100%',
          }}
          onChange={handleChange}
          value={checkValues}
        >
          <EasyDrag data={realColumns} onChange={handleDragChange}>
            {realColumns?.map((item) => (
              <div
                style={{
                  paddingBottom: 12,
                  marginBottom: 12,
                  borderBottom: '1px solid #eee',
                }}
                key={item?.key}
              >
                <BarsOutlined style={{ fontSize: 20 }} />
                <Checkbox style={{ marginLeft: 16 }} value={item.key}>
                  {item?.title}
                </Checkbox>
              </div>
            ))}
          </EasyDrag>
        </Checkbox.Group>
      </EasyDrawer>
    </>
  );
};
