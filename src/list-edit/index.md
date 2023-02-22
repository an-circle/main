---
nav:
  title:
  order: -1
---

# list-edit 可编辑表格完整版

可编辑列表

```jsx
import React from 'react';
import { Space, Input, Button, Form, Switch } from 'antd';
import * as Apis from './api';
import { EList, Search, Table } from 'easy-components-react';

const enumSalesValues = {
  ascend: 'sales_volume asc',
  descend: 'sales_volume desc',
};

const statusValuesArr = [
  {
    text: '上架',
    value: '1',
  },
  {
    text: '下架',
    value: '0',
  },
];

export default () => {
  const list = EList.useList();
  const [form] = Form.useForm();

  const getGoodsList = async (arg) => {
    console.log(arg, 'arg');
    const { page, pageSize, sales_volume, ...rest } = arg;
    const params = [
      {
        language: 'TL',
        page,
        list_rows: pageSize,
        sort: enumSalesValues[sales_volume],
        ...rest,
      },
    ];
    const data = await Apis?.getGoodsList(params);
    console.log(data);
    return data;
  };

  const handleEdit = () => {
    // console.log(navigate, "navigate");
    list.navigate('/list-g/edit');
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
    // const realName = `${name}-${record?.id}`;
    // console.log(data, "data");
    const newRecord = data?.find((item) => item.id === record?.id);
    // console.log(newRecord, "newRecord");
    // console.log(form.getFieldsValue(), "值");
    // form.setFieldsValue({ [realName]: record[name] });
    // console.log(record, "record8888");

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
      <Form.Item noStyle label="" name={name + '-' + record?.id} rules={rules}>
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

  const handleDelete = () => {};

  const handleSwitchChange = async (checked, record) => {
    console.log(checked, record);
    const params = [{ ids: [record?.id], status: checked ? 1 : 0 }];
    const data = await Apis.setGoodsStatus(params);
    console.log(data, 'data');
    list.refresh();
  };

  const columns = [
    {
      type: 'copy',
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (value, record, index) => {
        console.log('刷新刷新');
        // return <Input placeholder="请输入" />;
        return <RenderFormInput record={record} name="title"></RenderFormInput>;
      },
    },
    {
      title: '销量',
      dataIndex: 'sales_volume',
      key: 'sales_volume',
      width: 400,
      fixed: 'left',
      sorter: true,
    },
    {
      type: 'date',
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 400,
      sorter: true,
    },

    {
      type: 'copy',
      title: '商品id',
      dataIndex: 'goods_id',
      key: 'goods_id',
      width: 400,
    },
    {
      title: '价格',
      dataIndex: 'sale_price',
      key: 'sale_price',
      width: 400,
    },
    {
      title: '销售状态',
      dataIndex: 'status',
      key: 'status',
      width: 400,
      filters: statusValuesArr,
      render: (value, record) => {
        return (
          <Switch
            checked={value}
            onChange={(checked) => handleSwitchChange(checked, record)}
          />
        );
        // return statusValuesArr?.find((item) => {
        //   return item.value == value;
        // })?.text;
      },
    },

    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 400,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={handleEdit}>更新</a>
          <a onClick={handleDelete}>删除</a>
        </Space>
      ),
    },
  ];
  // useEffect(() => {
  //   list.setColumnsData(columns);
  // }, []);

  const config = [
    {
      type: 'input',
      item: {
        label: '商品标题',
        name: 'keyword',
      },
      element: {
        placeholder: '请输入商品标题',
      },
    },
    // {
    //   type: "input",
    //   item: {
    //     label: "商品id",
    //     name: "id",
    //   },
    //   element: {
    //     placeholder: "请输入商品id",
    //   },
    // },
  ];

  const handleSelect = (keys) => {
    console.log(keys);
    const data = list.getSelectRowKeys();
    console.log(data);
  };

  const handleGetData = () => {
    console.log('获取数据');
    const data = list.getDataSource();
    // const data = form.getFieldsValue();
    console.log(data);
  };

  return (
    <EList instance={list}>
      <Search config={config}></Search>
      <Form form={form}>
        <Table
          type="checkbox"
          onGetSelectKeys={handleSelect}
          columns={columns}
          request={(params) => {
            return getGoodsList(params);
          }}
          rowKey="id"
          toolbar={
            <Button type="primary" onClick={handleGetData}>
              获取数据
            </Button>
          }
        ></Table>
      </Form>
    </EList>
  );
};
```
