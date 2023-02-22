import { Button, Col, Row, Space } from 'antd';
import { EForm } from 'easy-components-react';
import React, { forwardRef, useContext, useEffect } from 'react';
import ListContext from './reducer/listContext';

export default forwardRef((props, ref) => {
  const { config, onSubmit, onReset } = props;

  const instance = useContext(ListContext);

  const form = EForm.useForm();

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  form.onValuesChange(
    (values) => {
      console.log(values, '数据改变');
    },
    ['title'],
  );

  form.onValuesChange((values) => {
    console.log(values, 'search监听所有的数据改变');
  });

  useEffect(() => {
    instance.setConfig(config);
  }, []);

  useEffect(() => {
    form.setFieldsValue(instance?.fieldsValue);
  }, [instance?.fieldsValue]);

  const handleSubmit = () => {
    const data = form.getFieldsValue();
    instance.setFieldsValue(data);
  };

  const handleRestForm = () => {
    form.resetFields();
    instance.setFieldsValue({});
  };

  return (
    <>
      <EForm
        name="basic"
        instance={form}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        config={config}
      >
        <Row gutter={[20]}>
          {config?.map((item) => (
            <Col key={item?.item?.name}>
              <EForm.Item name={item?.item?.name}></EForm.Item>
            </Col>
          ))}
          <Col>
            <Space>
              <Button type="primary" onClick={handleSubmit} htmlType="submit">
                搜索
              </Button>
              <Button onClick={handleRestForm}>重置</Button>
            </Space>
          </Col>
        </Row>
      </EForm>
    </>
  );
});
