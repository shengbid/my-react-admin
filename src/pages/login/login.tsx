import React, { useEffect, useState } from 'react'
import {Input, Button, Form, Checkbox, message} from 'antd';
import {toHome} from '../../commons/index'
import './login.less'
// import { FormProps } from 'antd/lib/form';
import ForgetPass from './component/forgetPass'

function Login() {
  const [passVisible, setPassVisible] = useState<boolean>(false)

  useEffect(() => {

  })
  const onFinish = (values: any) => {
    console.log('Success:', values);
    sessionStorage.setItem('login', 'admin')
    toHome()
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="login-content">
      <div className="centent" />
      <div className="login-form">
        <Form
          name="basic"
          initialValues={{ username: 'admin', password: '123456', remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="title">
              <div className="header">欢迎登录</div>
          </div>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

            <a
              className="login-form-forgot"
              style={{float:  'right'}}
              onClick={() => {
                setPassVisible(true)
              }}
              >
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{width:  '100%'}}  className="login-form-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      {passVisible ? <ForgetPass
        onCancel={() => { setPassVisible(false) }}
        onSubmit={(value) => {
          message.success('修改成功,请重新登录')
          setPassVisible(false)
        }}
        passVisible={passVisible}
      /> : null}
    </div>
  );
};

export default Login