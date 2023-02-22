---
nav:
  title: 配置
  order: -1
---

# form 表单

- 支持 json 化输入
- 支持单项设置默认值
- 支持单个监听和全部监听，像 useEffect 一样使用, 提升代码内聚 降低耦合
- form 扩充属性，默认 form 的全部属性，重写 form 的属性
- config 可以自定义组件
- 可以改变 config 里面的每个值，开闭原则，约定大约配置，使用提供 api 来修改 config
- 支持文本组件，自定义组件，input，select，checkbox，radio，textarea,颜色，日期选择，日期区间，树选择，
- 抹平差异化，提高开发效率： 日期 统一根据时间戳（公司强行约定）来维护，switch 根据 1，0 来传输（公司强行约定）

```jsx
import React, { useEffect, useRef, useState } from 'react';
import { EForm } from 'easy-components-react';
import { Button, Checkbox, Form, Input, Space, message } from 'antd';

const options = [
  { label: '鲁班7号', value: 1 },
  { label: '李白', value: 2 },
  { label: '庄周', value: 4 },
  { label: '33', value: 3 },
];

const cascaderOptions = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
      },
    ],
  },
];

const treeOptions = [
  {
    title: 'Light',
    value: 'light',
    children: [{ title: 'Bamboo', value: 'bamboo' }],
  },
];

export default () => {
  const form = EForm.useForm();
  const onFinish = (values) => {};

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // formlist
  let config = [
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
      },
    },
    {
      type: 'custom',
      defaultValue: '3',
      item: {
        label: '自定义组件',
        name: 'username3',
      },
      render: (value) => {
        return <div style={{ color: 'red' }}>{value}</div>;
      },
    },
    {
      type: 'text',
      defaultValue: '8888',
      item: {
        label: '文本组件',
        name: 'username4',
      },
    },
    {
      type: 'input',
      defaultValue: '555',
      item: {
        label: '输入框2',
        name: 'username2',
        rules: [{ required: true }],
      },
      element: {
        showCount: true,
        maxLength: 100,
        placeholder: '请输入',
      },
    },
    {
      type: 'select',
      defaultValue: 1,
      item: {
        label: '选择器',
        name: 'goods_sel',
      },
      element: {
        placeholder: '请选择',
        options,
      },
    },
    {
      type: 'checkbox',
      // 默认值必须是数组
      defaultValue: [1, 2],
      item: {
        label: '多选框',
        name: 'goods_checkbox',
      },
      element: {
        options,
      },
    },
    {
      type: 'radio',
      defaultValue: 1,
      item: {
        label: '单选框',
        name: 'goods_radio',
      },
      element: {
        options,
      },
    },
    {
      type: 'textarea',
      defaultValue: 1,
      item: {
        label: '文本域',
        name: 'goods_textarea',
      },
      element: {
        showCount: true,
        maxLength: 100,
        placeholder: '文本框请输入',
      },
    },
    {
      type: 'cascader',
      defaultValue: ['zhejiang', 'hangzhou'],
      item: {
        label: '级联选择',
        name: 'goods_cascader',
      },
      element: {
        placeholder: '请选择级联选项',
        options: cascaderOptions,
      },
    },
    {
      type: 'datePicker',
      defaultValue: 1671096184334, //默认时间戳
      item: {
        label: 'datePicker',
        name: 'goods_datePicker',
      },
      element: {
        placeholder: '请选择级联选项2',
      },
    },

    {
      type: 'treeSelect',
      defaultValue: 'bamboo', //默认时间戳
      item: {
        label: 'treeSelect树选择',
        name: 'goods_treeSelect',
      },
      element: {
        treeData: treeOptions,
      },
    },
    {
      type: 'inputNumber',
      defaultValue: '123',
      item: {
        label: '输入框',
        name: 'goods_number',
        rules: [{ required: true }],
      },
      element: {
        maxLength: 100,
        placeholder: '请输入',
      },
    },
    {
      type: 'switch',
      defaultValue: 1,
      item: {
        label: '切换组件',
        name: 'goods_switch',
        rules: [{ required: true }],
      },
      element: {
        maxLength: 100,
        placeholder: '请输入',
      },
    },
    {
      type: 'color',
      defaultValue: '#e43a3a',
      item: {
        label: '颜色组件',
        name: 'goods_color',
      },
    },
  ];

  form.onValuesChange(
    (values) => {
      form.setFieldsValue({ username2: '888' });
    },
    ['username'],
  );

  form.onValuesChange((values) => {
    console.log(values, '监听所有的数据改变');
  });

  const handleSubmit = () => {
    const data = form.getFieldsValue();
    const data2 = form.getFieldValue('username2');
    console.log(data);
    console.log(data2);
  };

  const handleChange = () => {
    form.setFieldsValue({
      username: '999',
      username3: '000',
      username4: '999888',
    });
  };

  const handleAddConfig = () => {
    form.addConfig(
      {
        type: 'radio',
        defaultValue: 1,
        item: {
          label: '单选框',
          name: 'goods_radio',
        },
        element: {
          options,
        },
      },
      () => {
        message.info('增加成功');
      },
    );
  };

  const handleRemoveConfig = () => {
    form.removeConfig(
      'goods_checkbox',
      (value) => {
        console.log(value);
        message.info('删除成功');
      },
      (value) => {
        console.log(value);
        message.info('删除失败');
      },
    );
  };

  const handleGetConfig = () => {
    const data = form.getConfig();
    console.log(data);
  };

  const handleSetConfigItem = () => {
    console.log('改变 config的 item');
    form.setConfigItem({
      username: {
        label: '输入框888',
      },
    });
  };

  const handleSetConfigElement = () => {
    console.log('改变 config的 element');
    form.setConfigElement({
      username: {
        placeholder: '请输入请输入222',
      },
    });
  };

  const handleRestForm = () => {
    form.resetFields();
  };

  return (
    <>
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
      >
        {/* <EForm.Item name="username2"></EForm.Item>
        <EForm.Item name="username"></EForm.Item>
        <EForm.Item name="username3"></EForm.Item>
        <EForm.Item name="goods_sel"></EForm.Item>
        <EForm.Item name="goods_checkbox"></EForm.Item>
        <EForm.Item name="goods_radio"></EForm.Item> */}
      </EForm>
      <Space>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
        <Button type="primary" onClick={handleChange}>
          修改属性值
        </Button>
        <Button type="primary" onClick={handleAddConfig}>
          增加表单项
        </Button>
        <Button type="primary" onClick={handleRemoveConfig}>
          减少
        </Button>
        <Button type="primary" onClick={handleSetConfigItem}>
          修改某一项的config item配置
        </Button>
        <Button type="primary" onClick={handleSetConfigElement}>
          修改某一项的config element配置
        </Button>
        <Button type="primary" onClick={handleGetConfig}>
          获取当前的 config
        </Button>
        <Button type="primary" onClick={handleRestForm}>
          重置表单
        </Button>
      </Space>
    </>
  );
};
```

### EForm 参数

#### instance

经过 EForm.useForm() 创建，用来控制实例,实例继承了 antd 中 form 的 api。常用写法:

```js
instance = { form };
```

#### onValuesChange

如果不加第二个参数,监听 form 中所有值的变化

```js
form.onValuesChange((values) => {
  console.log(values, '监听所有的数据改变');
});
```

如果加第二个参数,监听 form 中指定值的变化

```js
form.onValuesChange(
  (values) => {
    form.setFieldsValue({ username2: '888' });
  },
  ['username'],
);
```

#### addConfig

增加表单项，第二个参数支持回调成功显示

```js
form.addConfig(
  {
    type: 'radio',
    defaultValue: 1,
    item: {
      label: '单选框',
      name: 'goods_radio',
    },
    element: {
      options,
    },
  },
  () => {
    message.info('增加成功');
  },
);
```

#### removeConfig

删除表单项，第二个参数回调成功,第二个参数支持回调失败

```js
form.removeConfig(
  'goods_checkbox',
  (value) => {
    console.log(value);
    message.info('删除成功');
  },
  (value) => {
    console.log(value);
    message.info('删除失败');
  },
);
```

#### getConfig

获取当前的 config 配置

```js
form.getConfig();
```

#### setConfigItem

修改某一项的 config 配置

```js
form.setConfigItem({
  username: {
    label: '输入框888',
  },
});
```

#### setConfigElement

修改某一项的 config 配置

```js
form.setConfigElement({
  username: {
    placeholder: '请输入请输入222',
  },
});
```

#### resetFields

重置表单

```js
form.resetFields();
```

#### setFieldsValue

给表单设置值

```js
form.setFieldsValue({ username2: '888' });
```

### EForm.Item 布局

默认根据 config 顺序进行布局，支持自定义布局

```js
        <EForm.Item name="username2"></EForm.Item>
        <EForm.Item name="username"></EForm.Item>
        <EForm.Item name="username3"></EForm.Item>
        <EForm.Item name="goods_sel"></EForm.Item>
        <EForm.Item name="goods_checkbox"></EForm.Item>
        <EForm.Item name="goods_radio"></EForm.Item>
```

### form 组件

支持根据设置 config 的 type 来 配置组件

#### input 普通输入框

#### custom 自定义组件

#### text 文本组件

#### select 选择组件

#### checkbox 多选组件

#### radio 单选组件

#### textarea 文本框

#### cascader 级联选择

#### datePicker 日期选择

#### rangePicker 开始日期-结束日期

#### treeSelect 树选择

#### switch 开关

#### color 颜色
