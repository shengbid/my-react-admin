import React, { useState } from 'react'
import { Modal, Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/util'
import { passwordValid, phoneValid } from '../../../commons'

export interface FormValueType {
  [propName: string]: any
}

export interface ForgetPassProps {
  onCancel: () => void
  onSubmit: (values: FormValueType) => void
  passVisible: boolean
}

const FormItem = Form.Item
const FormLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
}

const ForgetPass = (props: ForgetPassProps) => {
  const [time, setTime] = useState<number>(60)

  const {
    onCancel: handleCancel,
    onSubmit: handleSubmit,
    passVisible,
  } = props

  const [form] = useForm()

  // 发送验证码
  const sendCaptcha = async() => {
    await form.validateFields(['account', 'phone'])
    // 防止重复点击
    if (time !== 60) {
      return
    }
    setTime((preTime) => {
      return preTime - 1
    })
    const active = setInterval(() => {
      setTime((preTime) => {
        if (preTime < 2) {
          clearInterval(active)
          return 60
        }
        return preTime - 1
      })
    }, 1000)
  }

  // 提交表单字段
  const submit = async() => {
    const fields = await form.validateFields()
    // console.log(fields)
    handleSubmit(fields)
  }

  const renderConent = () => {
    return (
      <div>
        <FormItem
          name='account'
          label='账号'
          rules={[
            {required: true, message: '请输入账号'}
          ]}
        >
          <Input placeholder='请输入' maxLength={30} />
        </FormItem>
        <FormItem
          name='phone'
          label='注册手机号码'
          rules={[
            {required: true, message: '请输入注册手机号码'},
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  callback()
                } else if (phoneValid(value)) {
                  callback()
                } else callback('手机号码格式不正确')
              },
            },
          ]}
        >
          <Input
            placeholder='请输入'
            addonAfter={<a onClick={sendCaptcha}>{time === 60 ? '发送验证码' : `${time}秒后重新发送`}</a>} 
            maxLength={11} />
        </FormItem>
        <FormItem
          name='captcha'
          label='验证码'
          rules={[
            {required: true, message: '请输入验证码'}
          ]}
        >
          <Input placeholder='随便填' maxLength={6} />
        </FormItem>
        <FormItem
          name='newPwd'
          label='新密码'
          rules={[
            { required: true, message: '请输入新密码！' },
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  callback()
                } else if (passwordValid(value)) {
                  callback()
                } else callback('密码长度为8-20位,必须包含数字、大小写字母')
              },
            },
          ]}
        >
          <Input.Password placeholder='请输入新密码' maxLength={20} autoComplete='new-password' />
        </FormItem>
        <FormItem
          name='confrmPwd'
          label='确认密码'
          rules={[
            { required: true, message: '请输入确认密码！' },
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  callback()
                } else if (form.getFieldValue('newPwd') === value) {
                  callback()
                } else {
                  callback('确认密码与新密码不一致')
                }
              },
            },
          ]}
        >
          <Input.Password placeholder='请输入确认密码' maxLength={20} autoComplete='new-password' />
        </FormItem>
      </div>
    )
  }
  return (
    <div>
      <Modal
        title="忘记密码"
        visible={passVisible}
        cancelText='取消'
        okText='确定'
        onOk={submit}
        onCancel={() => handleCancel()}
        maskClosable={false}
      >
        <Form
          {...FormLayout}
          form={form}
        >
          {renderConent()}
        </Form>
      </Modal>
    </div>
  )
}

export default ForgetPass