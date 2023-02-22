---
nav:
  title: drawer 弹窗
  order: -1
---

# drawer 弹窗

drawer 弹窗，是在 antd 的基础上封装的一层弹窗
右下角增加确认和取消弹窗按钮，默认弹窗大小是 600

```jsx
import React, { useState } from 'react';
import { Button } from 'antd';
import { EasyDrawer } from 'easy-components-react';

export default () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    console.log('关闭');
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log('确认');
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        打开弹窗
      </Button>
      <EasyDrawer
        title="编辑表头"
        onClose={handleClose}
        visible={open}
        onConfirm={handleConfirm}
      >
        do something...
      </EasyDrawer>
    </>
  );
};
```
