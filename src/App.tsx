import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, InputNumber, Flex, Switch} from 'antd';
import DrawTheCube from './Cube';

const boxStyle: React.CSSProperties = {
  height: '100vh',
  borderRight: '1px solid #40a9ff'
};

type FieldType = {
  height?: number;
  width?: number;
  length?: number;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const App: React.FC = () => (
  <Flex >
    <Flex style={boxStyle} justify={'center'} align={'center'} flex={'1'} vertical>
      <Form
      name="basic"
      labelCol={{ span: 3 }}
      style={{ width: '90%' }}
      initialValues={{ height: 10, width: 10, length: 10 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
        <Form.Item<FieldType>
          label="Height"
          colon={false}
          name="height"
          required={false}
          rules={[
            { required: true, message: 'Please enter a height!' },
            { type: 'integer', min: 1, message: 'Only integers greater than zero!' }
          ]}
        >
        <InputNumber style={{ width: '100%'}} precision={0} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Width"
          colon={false}
          name="width"
          required={false}
          rules={[
            { required: true, message: 'Please enter a width!' },
            { type: 'integer', min: 1, message: 'Only integers greater than zero!' }
          ]}
        >
        <InputNumber style={{ width: '100%'}} precision={0} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Length"
          colon={false}
          name="length"
          required={false}
          rules={[
            { required: true, message: 'Please enter a height!' },
            { type: 'integer', min: 1, message: 'Only integers greater than zero!' }
          ]}
        >
        <InputNumber style={{ width: '100%'}} precision={0} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
          <Button type="primary" htmlType="submit" >
            Calculate
          </Button >
        </Form.Item>
      </Form>
      <Switch onChange={onChange} checkedChildren="light" unCheckedChildren="dark"/>
    </Flex>

    <Flex justify={'center'} align={'center'} flex={'2'} >
    <DrawTheCube />
    </Flex >
  </Flex>
);

export default App;
