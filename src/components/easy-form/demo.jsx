import { Button, message, Space } from 'antd';
import { EForm } from 'easy-components-react';
import React from 'react';

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
          span: 2,
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
