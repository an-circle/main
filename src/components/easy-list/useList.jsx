import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { updateUrl } from '../utils';
import { addData, createIndexDb, searchData } from '../utils/indexDb';

export default function useList() {
  const [rowKeys, setRowKeys] = useState([]);
  const history = useNavigate();
  const [searchParams] = useSearchParams();
  const uuid = uuidv4();
  const formValuesRef = useRef();
  const columnsValuesRef = useRef();
  const paginationRef = useRef();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fieldsValue, setFieldsValue] = useState();
  const [config, setConfig] = useState([]);
  const [refreshKeys, setRefreshKeys] = useState(null);
  // 获取路由中的 sign
  const sign = searchParams.get('sign');

  const setSelectedRowKeys = (keys) => {
    setRowKeys(keys);
  };

  const getFieldsValue = () => {
    return fieldsValue;
  };

  const getSelectRowKeys = () => {
    return rowKeys;
  };

  const setIndexDBValue = (value, realColumns, pagination) => {
    console.log(
      value,
      realColumns,
      pagination,
      pagination,
      'value, realColumns,pagination',
    );
    const realValue = JSON.parse(JSON.stringify(value));
    if (realValue) {
      formValuesRef.current = realValue;
    }
    if (realColumns) {
      columnsValuesRef.current = JSON.stringify(realColumns);
    }
    if (pagination) {
      paginationRef.current = pagination;
    }
  };

  const navigate = async (path, config = { sign: true }) => {
    console.log(uuid, 'uuid');
    if (config?.sign) {
      await createIndexDb('workers');
      console.log(
        uuid,
        {
          formValue: formValuesRef.current,
          columns: columnsValuesRef.current,
          pagination: paginationRef.current,
        },
        'workers',
      );
      // 更新数据
      addData(
        uuid,
        {
          formValue: formValuesRef.current,
          columns: columnsValuesRef.current,
          pagination: paginationRef.current,
        },
        'workers',
      );
      updateUrl('sign', uuid);
    }

    // 跳转路由
    history(path);
  };

  const getSignData = async () => {
    await createIndexDb();
    return new Promise(async (resolve) => {
      const data = await searchData(sign, 'workers');
      resolve(data);
    });
  };

  const setDataSource = (data) => {
    setData([...data]);
    // dataSourceRef.current = data;
  };

  const addDataSource = (value) => {
    setData([...data, ...value]);
  };

  const updateSingleRecord = (id, content) => {
    console.log(id, content, 'id,content');
    const newData = data?.map((item) => {
      console.log(item.id, 'item?.[id]');
      if (item.id === id) {
        return {
          ...item,
          ...content,
        };
      } else {
        return { ...item };
      }
    });
    console.log(newData, 'newData');
    setData([...newData]);
  };

  const getDataSource = () => {
    // return dataSourceRef?.current;
    return [...data];
  };

  const setColumnsData = (data) => {
    setColumns(data);
  };
  // 刷新列表
  const refresh = () => {
    console.log('刷新列表');
    const uuidKey = uuidv4();
    setRefreshKeys(uuidKey);
  };

  return {
    setFieldsValue,
    getFieldsValue,
    fieldsValue,
    setConfig,
    config,
    setSelectedRowKeys,
    getSelectRowKeys,
    navigate,
    setIndexDBValue,
    getSignData,
    setDataSource,
    addDataSource,
    updateSingleRecord,
    getDataSource,
    setColumnsData,
    columns,
    data,
    refresh,
    refreshKeys,
  };
}
