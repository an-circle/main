---
nav:
  title:
  order: -1
---

# formListTable 可编辑列表

可编辑列表

```jsx
import React from 'react';
import { Space, Input, Button, Form } from 'antd';
import { EList, Table } from 'easy-components-react';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

export default function index() {
  const list = EList.useList();
  const [form] = Form.useForm();

  const getGoodsList = async (arg) => {
    const data = {
      data: [
        {
          id: 888,
          title: 1,
          sales_volume: 2,
        },
      ],
      total: 0,
    };
    return data;
  };

  const handleAdd = () => {
    list.addDataSource([
      {
        id: uuidv4(),
        title: 1,
        sales_volume: 2,
      },
    ]);
  };

  const FormInput = (props) => {
    // console.log(props, "props");
    const { onChange, value, record, name, addonAfter, addonBefore, prefix } =
      props;
    const handleChange = (e) => {
      onChange(e.target.value);
    };

    const handleBlur = (e) => {
      list.updateSingleRecord(record.id, {
        [name]: e.target.value,
      });
    };

    const data = list.getDataSource();
    const realName = `${name}-${record?.id}`;
    console.log(data, realName, 'data');
    const newRecord = data?.find((item) => item.id === record?.id);
    form.setFieldsValue({ [realName]: record[name] });

    return (
      <Input
        placeholder="请输入"
        onChange={handleChange}
        onBlur={handleBlur}
        defaultValue={newRecord?.[name]}
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        prefix={prefix}
      />
    );
  };

  const RenderFormInput = ({
    record,
    name,
    addonBefore,
    rules,
    addonAfter,
    prefix,
  }) => {
    return (
      <Form.Item
        label=" "
        name={name + '-' + record?.id}
        rules={rules}
        colon={false}
      >
        <FormInput
          name={name}
          record={record}
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          prefix={prefix}
        ></FormInput>
      </Form.Item>
    );
  };

  const columns = [
    {
      type: 'copy',
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (value, record, index) => {
        return (
          <RenderFormInput
            record={record}
            rules={[{ required: true, message: 'Missing area' }]}
            name="title"
          ></RenderFormInput>
        );
      },
    },
    {
      title: '销量',
      dataIndex: 'sales_volume',
      key: 'sales_volume',
      width: 400,
      render: (value, record, index) => {
        console.log('刷新刷新');
        return (
          <RenderFormInput
            record={record}
            name="sales_volume"
          ></RenderFormInput>
        );
      },
    },
  ];

  const handleGetData = async () => {
    console.log('获取数据');
    const data = list.getDataSource();
    const data2 = await form.validateFields();
    console.log(data);
    console.log(data2);
  };

  return (
    <EList instance={list}>
      <Form form={form}>
        <Table
          columns={columns}
          request={(params) => {
            return getGoodsList(params);
          }}
          rowKey="id"
          pagination={false}
        ></Table>
        <div style={{ marginTop: 24 }}>
          <Space>
            <Button
              type="dashed"
              onClick={() => handleAdd()}
              icon={<PlusOutlined />}
            >
              增加字段
            </Button>
            <Button type="primary" onClick={handleGetData}>
              获取数据
            </Button>
          </Space>
        </div>
      </Form>
    </EList>
  );
}
```
