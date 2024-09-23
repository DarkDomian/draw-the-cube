import React, {useState} from 'react';
import type { FormProps } from 'antd';
import { theme as antdTheme, ConfigProvider } from 'antd';
import { Button, Form, InputNumber, Flex, Switch} from 'antd';
import CubeScene from './Cube';

type FieldType = {
  height?: number;
  width?: number;
  length?: number;
};

const App: React.FC = () => {
  
  const [vertices, setVertices] = useState<number[]>([
    // Near face
    0, 0, 0,   // Vertex 0: Bottom-left near
    1, 0, 0,   // Vertex 1: Bottom-right near
    1, 1, 0,   // Vertex 2: Top-right near
    0, 1, 0,   // Vertex 3: Top-left near
  
    // Far face
    0, 0, 1,   // Vertex 4: Bottom-left far
    1, 0, 1,   // Vertex 5: Bottom-right far
    1, 1, 1,   // Vertex 6: Top-right far
    0, 1, 1    // Vertex 7: Top-left far
  ]);
  
  const onFinish = async (values: any) => {
    try {
      const response = await fetch('/api/triangulation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data.vertices);
        setVertices(data.vertices);
      } else {
        console.error('Error: something went wrong');
      }
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
    }
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  // BLOCK OF THEME SWITCHER
  const lightTheme = {
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#dd00b4',
      colorBgBase: '#f3fcf0',
      colorBgContainer: '#f3fcf0',
      colorBorder: '#ffa3e2',
      colorTextBase: '#151319',
    },
  };
  const darkTheme = {
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorPrimary: '#e00070',      
      colorBgBase: '#151319',
      colorBgContainer: '#151319',
      colorBorder: '#700a40',
      colorTextBase: '#f3fcf0',
    },
  }
  
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  const borderedFlex: React.CSSProperties = {
    height: '100vh',
    borderRight: '1px solid',
    borderColor: isDarkMode ? darkTheme.token.colorPrimary : lightTheme.token.colorPrimary
  };
  const themeForFlex: React.CSSProperties = {
    backgroundColor: isDarkMode ? darkTheme.token.colorBgBase : lightTheme.token.colorBgBase
  };

  return (
    <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Flex style={themeForFlex}>
        <Flex style={borderedFlex} justify={'center'} align={'center'} flex={'1'} vertical>
          <Form
          name="basic"
          labelCol={{ span: 3 }}
          style={{ width: '90%' }}
          initialValues={{ height: 1, width: 1, length: 1 }}
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
          <Switch
          onChange={toggleTheme}
          checked={isDarkMode}
          checkedChildren="light"
          unCheckedChildren="dark"/>
        </Flex>

        <Flex justify={'center'} align={'center'} flex={'2'} >
        <CubeScene vertices={vertices} cubeColor={isDarkMode ? darkTheme.token.colorPrimary : lightTheme.token.colorPrimary} />
        </Flex >
      </Flex>
      <footer style={{ width: '100%', textAlign: 'center', position: 'fixed', bottom: '5px', fontSize: '10px' ,color: isDarkMode ? darkTheme.token.colorTextBase : lightTheme.token.colorTextBase }}>
        @DarkDomian
      </footer>
    </ConfigProvider>
  );
};

export default App;