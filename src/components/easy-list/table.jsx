import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { Button, Col, message, Row, Table } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { transformObjectToT, transformValueToText } from '../utils/index';
import ColumnDraw from './components/ColumnDraw';
import Record from './components/Record';
import RenderType from './components/RenderType';
import ToolSpace from './components/ToolSpace';
import ListContext from './reducer/listContext';

const enumSorter = {
  ascend: '升序',
  descend: '降序',
};

export default function table(props) {
  const instance = useContext(ListContext);
  console.log(instance, 'instance99999');

  const {
    request,
    columns = [],
    onGetSelectKeys,
    edit = true,
    pagination = true,
    ...rest
  } = props;

  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const [selectLabel, setSelectLabel] = useState([]);
  const [realColumns, setRealColumns] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showColumnDraw, setShowColumnDraw] = useState(false);

  const [searchParams] = useSearchParams();
  const sign = searchParams.get('sign');

  const paginationRef = useRef({ page: 1, pageSize: 10 });
  const fieldValueRef = useRef({ page: 1, pageSize: 10 });

  // 把从 sign 获取到的 sorter 和 filter 转换成 sorter
  const handleArrToFields = (arr) => {
    const data = {};
    // TODO:尝试是否可以用 reduce 去实现
    arr
      .map((item) => {
        if (item?.sorter && item?.sortOrder) {
          data[item.key] = item?.sortOrder;
        }
        if (item?.filteredValue) {
          data[item.key] = item?.filteredValue;
        }
      })
      ?.filter((item) => item);
    console.log(data, '88888888');
    return data;
  };
  // 有 sign 时更新数据
  const handleInitDataFromSign = async () => {
    const data = await instance.getSignData();
    paginationRef.current = data?.obj?.pagination;
    // paginationRef.current = data?.obj?.pagination;

    const columnDataArr = handleSetInitColumns(JSON.parse(data?.obj?.columns));
    fieldValueRef.current = handleArrToFields(columnDataArr);
    console.log(fieldValueRef.current, 'fieldValueRef.current');
    // console.log(columnDataArr, "columnDataArr");
    instance?.setIndexDBValue(null, columnDataArr);
    instance.setFieldsValue(data?.obj?.formValue);

    console.log(paginationRef.current, 'paginationRef.current');
  };
  // 没有 sign 时更新数据
  const handleInitData = () => {
    console.log(columns, 'columns');
    const data = columns?.map((item) => {
      return {
        align: 'center',
        checked: true,
        // 根据 type 挂载真正的组件
        render: (current, record) => {
          return RenderType(item?.type, current, record);
        },
        ...item,
      };
    });
    console.log(data);
    handleSetRealColumns(data);
    instance.setFieldsValue({});
  };

  const handleSetInitColumns = (columnsValue) => {
    console.log(columnsValue, 'columnsValue');
    // 如果有来自 sign 的数据，合并sign 的数据,因为JSON.stringify的时候把 dom 节点丢失了
    if (columnsValue) {
      // 根据外边的columns数据来更新 sign 里面的columns
      let data = columns?.map((item) => {
        return {
          align: 'center',
          checked: true,
          // 根据 type 挂载真正的组件
          render: (current, record) => {
            return RenderType(item?.type, current, record);
          },
          ...item,
        };
      });

      data = data?.map((item) => {
        return {
          ...item,
          ...columnsValue?.find((i) => i.key === item?.key),
        };
      });
      setRealColumns(data);
      return data;
    }
  };

  const handleSetRealColumns = (columnsValue) => {
    const fieldValue = instance.fieldsValue || {};
    instance?.setIndexDBValue(fieldValue, columnsValue);
    console.log(
      columnsValue,
      'columnsValuecolumnsValuecolumnsValuecolumnsValuecolumnsValue',
    );
    setRealColumns(columnsValue);
  };

  useEffect(() => {
    if (instance.fieldsValue) {
      handleSubmit();
      handleSetLabel();
    }
  }, [instance.fieldsValue]);

  useEffect(() => {
    if (!columns?.length !== 0) {
      sign ? handleInitDataFromSign() : handleInitData();
    }
  }, []);

  useEffect(() => {
    handleSetLabel();
  }, [realColumns]);

  useEffect(() => {
    instance?.setSelectedRowKeys(selectedRowKeys);
  }, [selectedRowKeys]);

  useEffect(() => {
    if (instance.refreshKeys) {
      handleSubmit();
    }
  }, [instance.refreshKeys]);

  useEffect(() => {
    // table 的数据
    setData(instance.data);
  }, [instance.data]);

  const getRequest = async (params) => {
    setLoading(true);
    try {
      console.log();
      const { page, pageSize } = paginationRef.current;
      console.log(page, pageSize, 'page, pageSize');
      const { data, total } = await request({ page, pageSize, ...params });
      console.log(data, total, 'total');
      instance.setDataSource(data);
      // const dataSource = instance.getDataSource();
      // console.log(dataSource, "dataSource");
      // setData(dataSource);
      setTotal(total);
      setTimeout(() => {
        setLoading(false);
      }, 0);
    } catch (error) {
      console.log(error, 'error');
      message.error('请求失败');
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  };

  const handleChange = (pagination, filters, sorter, extra) => {
    console.log(
      pagination,
      filters,
      sorter,
      extra,
      'pagination, filters, sorter, extra',
    );
    const { current: page, pageSize } = pagination;
    paginationRef.current = { page, pageSize };

    const fieldValue = instance.fieldsValue;
    //设置页码
    const sorterData = { [sorter?.field]: sorter?.order };

    let columnDataChangeArr = realColumns;

    // 如果有 sort 设置标签
    if (Object.keys(sorterData)?.length) {
      //  如果有  sorter 设置 columns里面sort 的值
      columnDataChangeArr = handleSetSorterColumns(sorter, columnDataChangeArr);
      console.log(columnDataChangeArr, 'columnDataChangeArr');
    }
    if (Object.keys(filters)?.length) {
      //  如果有  sorter 设置 columns里面sort 的值
      columnDataChangeArr = handleSetFilterColumns(
        filters,
        columnDataChangeArr,
      );
    }
    handleSetRealColumns(columnDataChangeArr);
    fieldValueRef.current = { ...filters, ...sorterData };
    // 改变之后请求接口
    handleSubmit({ ...fieldValue, ...filters, ...sorterData });
  };

  const handleSetSorterColumns = (sorter, realColumns) => {
    // 当点击升序降序的时候变成受控模式，设置 sortOrder  的值

    const columnData = realColumns.map((item) => {
      if (sorter?.field === item?.key) {
        return {
          ...item,
          sorter: true,
          sortOrder: sorter?.order,
        };
      } else {
        // 其他的 sorter 关闭筛选 （因为 antd 只支持对一项进行筛选）
        if (item.sortOrder) {
          return {
            ...item,
            sorter: true,
            sortOrder: null,
          };
        } else {
          return item;
        }
      }
    });
    console.log(columnData, 'columnData');
    return columnData;
  };

  const handleSetFilterColumns = (filter, realColumns) => {
    const columnData = realColumns.map((item) => {
      const keys = Object.keys(filter);
      console.log(keys, 'keys');
      if (item?.key === keys[0]) {
        return {
          ...item,
          filteredValue: Object.values(filter)?.[0],
        };
      } else {
        return item;
      }
    });
    return columnData;
  };

  const handleClearSortLabel = (arr) => {
    return arr
      .map((item) => {
        return item.type !== 'sort' ? item : null;
      })
      ?.filter((item) => item);
  };

  const handleClearFilterLabel = (arr) => {
    return arr
      .map((item) => {
        return item.type !== 'filter' ? item : null;
      })
      ?.filter((item) => item);
  };

  const handleDeleteSortLabel = (arr, key) => {
    return arr.filter((item) => {
      return key !== item.key ? item : null;
    });
  };

  const handleSetLabel = () => {
    // 初始化的时候如果为 null说明还没有赋初始值那么就返回
    if (!instance.fieldsValue) return;
    console.log(renderColumns, 'realColumns');
    const data = instance.fieldsValue;
    console.log(data, 'instance.fieldsValue');
    const dataT = transformObjectToT(data);
    console.log(dataT, 'DataTTTT');
    let arr = selectLabel;
    console.log(arr, 'arr8888');
    // 定义一个selectLabel的keys集合
    const selectLabelArr = arr.map((item) => {
      return item.key;
    });

    if (!dataT?.length) {
      arr = arr?.filter((item) => {
        return item.type !== 'search';
      });
    }

    console.log(arr, 'arr888');

    // 拼接 input 里面的数据
    instance?.config?.forEach((item) => {
      dataT.forEach((i) => {
        if (item?.item?.name === i.key) {
          // 如果包含就替换 // 不包含就push
          if (selectLabelArr.includes(i.key)) {
            // 替换search的值
            arr?.forEach((label) => {
              if (label.type === 'search') {
                label.value = i.value;
              }
            });
          } else {
            arr?.push({
              ...i,
              name: item?.item?.label,
              type: 'search',
            });
          }
        }
      });
    });

    console.log(renderColumns, 'realColumnsLabel');

    // 设置筛选项
    renderColumns?.forEach((item) => {
      if (item?.sorter && item?.sortOrder) {
        if (selectLabelArr.includes(item.key)) {
          arr.forEach((label) => {
            if (label.type === 'sort') {
              label.value = enumSorter[item?.sortOrder];
            }
          });
        } else {
          arr = handleClearSortLabel(arr);
          arr.push({
            key: item?.key,
            value: enumSorter[item?.sortOrder],
            name: item?.title,
            type: 'sort',
          });
        }
      }

      if (item?.sorter && item?.sortOrder === undefined) {
        arr = handleDeleteSortLabel(arr, item?.key);
      }
    });

    // 设置多选项
    realColumns?.forEach((item) => {
      if (item?.filteredValue?.length) {
        const text = transformValueToText(item?.filteredValue, item.filters);
        if (selectLabelArr?.includes(item?.key)) {
          arr.forEach((label) => {
            if (label.type === 'filter') {
              label.value = text;
            }
          });
        } else {
          arr = handleClearFilterLabel(arr);
          arr?.push({
            key: item?.key,
            value: text,
            name: item?.title,
            type: 'filter',
          });
        }
      }
    });
    // 设置 label
    setSelectLabel(arr);
  };

  const handleSubmit = (formValues) => {
    const data = instance.fieldsValue || {};
    // 储存 value 存储到indexdb 里面
    console.log(data, 'data');
    instance?.setIndexDBValue(data, null, paginationRef?.current);
    console.log(fieldValueRef.current, 'fieldValueRef.current888');
    // 请求formValues的值
    getRequest({ ...data, ...formValues, ...fieldValueRef.current });
  };

  const handleClose = (record) => {
    if (record.type === 'search') {
      const { fieldsValue } = instance;
      instance.setFieldsValue({ ...fieldsValue, [record?.key]: undefined });
    } else if (record.type === 'sort') {
      // 清空 sort 的值
      const columnData = realColumns.map((item) => {
        if (record?.key === item?.key) {
          return {
            ...item,
            sorter: true,
            sortOrder: null,
          };
        } else {
          return item;
        }
      });
      handleSetRealColumns(columnData);
      fieldValueRef.current = {};
      handleSubmit();
    } else if (record.type === 'filter') {
      // 清空 sort 的值
      const columnData = realColumns.map((item) => {
        if (record?.key === item?.key) {
          return {
            ...item,
            filteredValue: null,
          };
        } else {
          return item;
        }
      });
      fieldValueRef.current = {};
      handleSetRealColumns(columnData);
      handleSubmit();
    }

    // 去掉点击 close 的 label
    const label = selectLabel
      .map((item) => (item.key !== record.key ? item : null))
      .filter((item) => item);
    setSelectLabel(label);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  const handleGetSelectKeys = () => {
    console.log(selectedRowKeys, 'selectedRowKeys');
    onGetSelectKeys(selectedRowKeys);
  };

  const handleEdit = () => {
    setShowColumnDraw(true);
  };

  const handleCloseColumnDraw = () => {
    setShowColumnDraw(false);
  };

  const handleConfirmColumns = (arr) => {
    setRealColumns(arr);
    handleCloseColumnDraw();
  };

  const renderColumns = useMemo(() => {
    // return realColumns?.filter((item) => {
    //   return item.checked;
    // });
    const data = columns?.map((item) => {
      return {
        align: 'center',
        checked: true,
        // 根据 type 挂载真正的组件
        render: (current, record) => {
          return RenderType(item?.type, current, record);
        },
        ...item,
      };
    });
    // 覆盖值
    const newData = data?.map((item) => {
      const realColumnsItem = realColumns?.find((i) => i.key === item?.key);
      return {
        ...realColumnsItem,
        ...item,
      };
    });
    // 交换位置
    const newData2 = realColumns.map((item) => {
      const newDataItem = newData?.find((i) => i.key === item?.key);
      return {
        ...newDataItem,
      };
    });
    return newData2;
  }, [columns, realColumns]);

  return (
    <>
      <Row gutter={[16, 16]} justify="space-between">
        <Col>
          <Row justify="end" gutter={[16, 16]}>
            <Col>
              {props?.type ? (
                <Button onClick={handleGetSelectKeys}>批量操作</Button>
              ) : null}
            </Col>
            <Col>{props?.toolbar ? props?.toolbar : null}</Col>
          </Row>
        </Col>
        {edit ? (
          <Col>
            <ToolSpace>
              <Button onClick={handleEdit}>编辑表头</Button>
            </ToolSpace>
          </Col>
        ) : null}
      </Row>
      {/* 筛选条件 */}
      {Object.keys(selectLabel)?.length ? (
        <div style={{ marginBottom: 24 }}>
          {selectLabel?.map((item) => {
            return (
              <Record
                label={item?.name}
                value={item?.value}
                key={item?.key}
                onClose={() => handleClose(item)}
              />
            );
          })}
        </div>
      ) : null}
      <Table
        {...rest}
        pagination={
          pagination && {
            position: 'bottomRight',
            total,
            current: paginationRef?.current?.page,
          }
        }
        rowSelection={props?.type && rowSelection}
        loading={loading}
        dataSource={data}
        onChange={handleChange}
        columns={renderColumns}
      />
      <ColumnDraw
        open={showColumnDraw}
        columns={renderColumns}
        onClose={handleCloseColumnDraw}
        onConfirm={handleConfirmColumns}
      ></ColumnDraw>
    </>
  );
}
