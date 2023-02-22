import { Button, Col, Row, Space } from 'antd';
import EForm from 'easy-components-react';
import React, { forwardRef, useImperativeHandle } from 'react';

export default forwardRef((props, ref) => {
  const { config, onSubmit, onReset } = props;

  const form = EForm.useForm();

  useImperativeHandle(ref, () => {
    return {
      getFieldsValue(data) {
        // console.log(form, "form", data);
        // return form.getFieldsValue();
        return {};
      },
      handleClose(value) {
        // 重置点击 close选择的值，然后重新提交表单
        form?.setFieldsValue({ [value]: undefined });
        handleSubmit();
      },
      setFieldsValue(value) {
        form?.setFieldsValue(value);
      },
    };
  });

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  form.onValuesChange(
    (values) => {
      console.log(values, '数据改变');
      console.log(form);
      form.setFieldsValue({ username2: '888' });
    },
    ['username'],
  );

  form.onValuesChange((values) => {
    console.log(values, '监听所有的数据改变');
  });

  const handleSubmit = () => {
    const data = form.getFieldsValue();
    console.log(data, '提交数据222');
    console.log(config, 'config');

    onSubmit();
  };

  const handleRestForm = () => {
    form.resetFields();
    onReset();
  };

  return (
    <>
      <EForm
        name="basic"
        instance={form}
        // onFinish={onFinish}
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
