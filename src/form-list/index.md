---
nav:
  title:
  order: -1
---

# formList 列表

form 列表

```jsx
import React from 'react';
import { EForm } from 'easy-components-react';

import { Button, Space } from 'antd';

import {
  MinusCircleOutlined,
  PlusOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

export default function index() {
  const form = EForm.useForm();

  const onFinish = () => {};

  const onFinishFailed = () => {};

  const handleAdd = () => {
    const uuid = uuidv4();
    form.addConfig({
      type: 'input',
      item: {
        label: '输入框' + uuid,
        name: 'userName-' + uuid,
      },
      element: {
        outer: (
          <Space>
            <PlusCircleOutlined onClick={() => handleAdd()} />
            <MinusCircleOutlined
              onClick={() => handleDelete('userName-' + uuid)}
            />
          </Space>
        ),
      },
    });
  };

  const handleDelete = (name) => {
    form.removeConfig(name);
  };

  const config = [
    {
      type: 'input',
      defaultValue: '123',
      item: {
        label: '输入框',
        name: 'username',
        rules: [{ required: true }],
      },
      element: {
        showCount: true,
        maxLength: 100,
        placeholder: '请输入',
        outer: (
          <Space>
            <PlusCircleOutlined onClick={handleAdd} />
            <MinusCircleOutlined onClick={handleDelete} />
          </Space>
        ),
      },
    },
  ];

  const handleSubmit = () => {
    console.log(form.getFieldsValue());
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <EForm
        name="basic"
        instance={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        config={config}
      ></EForm>
      <Space>
        <Button
          type="dashed"
          onClick={() => handleAdd()}
          icon={<PlusOutlined />}
        >
          增加字段
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            handleAdd('The head item', 0);
          }}
          icon={<PlusOutlined />}
        >
          增加头部字段
        </Button>
        <Button
          type="primary"
          onClick={() => {
            handleSubmit();
          }}
        >
          提交
        </Button>
      </Space>
    </div>
  );
}
```
