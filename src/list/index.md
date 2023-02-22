---
nav:
  title:
  order: -1
---

# list 普通列表

普通列表和 form 进行交互

```jsx
import React, { useEffect } from 'react';
import { Space, Button } from 'antd';
import * as Apis from './api';
import { EList, Search, Table } from 'easy-components-react';

const enumSalesValues = {
  ascend: 'sales_volume asc',
  descend: 'sales_volume desc',
};

console.log(EList, 'EList');
console.log(Search, 'EList');
// const { Search, Table } = EList ?? {};

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

  const columns = [
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
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
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
      render: (value) => {
        return statusValuesArr?.find((item) => {
          return item.value == value;
        })?.text;
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
          <a>删除</a>
        </Space>
      ),
    },
  ];

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
    {
      type: 'input',
      item: {
        label: '商品id',
        name: 'id',
      },
      element: {
        placeholder: '请输入商品id',
      },
    },
  ];

  const handleSelect = (keys) => {
    console.log(keys);
    const data = list.getSelectRowKeys();
    console.log(data);
  };

  return (
    <EList instance={list}>
      <Search config={config}></Search>
      <Table
        type="checkbox"
        onGetSelectKeys={handleSelect}
        columns={columns}
        request={(params) => {
          return getGoodsList(params);
        }}
        rowKey="id"
        toolbar={<Button type="primary">添加</Button>}
      ></Table>
    </EList>
  );
};
```
