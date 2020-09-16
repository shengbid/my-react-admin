import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Modal, Row, Col, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/util'

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 12 },
}
const tailLayout = {
  wrapperCol: { offset: 3, span: 8 },
}

const Nest = () => {
  const [visible, setVisible] = useState(false)
  const [selectKeys, setSelectkeys] = useState<number[]>([])
  const [type, setType] = useState(1)
  const [mianKeys, setMainKeys] = useState<number[]>([])
  const [otehrKeys, setOtherKeys] = useState<number[]>([])

  const [form] = useForm()

  const options = [
    {
      label: '珠宝', value: 1
    },
    {
      label: '首饰', value: 2
    },
    {
      label: '手表', value: 3
    },
    {
      label: '鞋子', value: 4
    },
    {
      label: '包包', value: 5
    },
    {
      label: '服装', value: 6, disabled: true
    },
  ]

  const onFinish = async() => {
    const data = await form.getFieldsValue()
    console.log('Success:', data)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const selectProduct = (type: number) => {
    setVisible(true)
    setType(type)
    // const keys = form.getFieldValue('mainProduct')
    if (type === 1) {
      setSelectkeys(mianKeys)
    } else setSelectkeys(otehrKeys)
    // console.log(type, mianKeys, otehrKeys, selectKeys)
  }

  interface itemProps {
    label: string
    value: number
  }
  const handleOk = () => {
    if (selectKeys.length) {
      const arr: string[] = []
      options.map((item: itemProps) => {
        if (selectKeys.includes(item.value)) {
          arr.push(item.label)
        }
      })
      if (type === 1) {
        form.setFieldsValue({
          mainProduct: arr.join(',')
        })
        setMainKeys(selectKeys)
      } else {
        form.setFieldsValue({
          otherProduct: arr.join(',')
        })
        setOtherKeys(selectKeys)
      }
      setVisible(false)
    } else {
      message.warning('请先选择业务')
    }
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onChange = (checkedValues: any) => {
    console.log(checkedValues)
    setSelectkeys(checkedValues)
  }

  const renderContent = () => {
    return (<>
      <Form.Item
        label="主营业务(单选)"
        name="mainProduct"
        rules={[{ required: true, message: '请选择主营业务!' }]}
      >
        <Input 
          addonAfter={<PlusOutlined onClick={() => selectProduct(1)} />}
          readOnly
          placeholder='请点击获取弹框选择'
        />
      </Form.Item>

      <Form.Item
        label="其他业务(多选)"
        name="otherProduct"
        rules={[{ required: true, message: '请选择其他业务!' }]}
      >
         <Input 
          addonAfter={<PlusOutlined onClick={() => selectProduct(5)} />}
          readOnly
          placeholder='请点击获取弹框选择'
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </>)
  }

  return (
    <div>
      <h2>Checkbox选项组.初始值重置,disable属性控制</h2>
      <Form
        {...layout}
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {renderContent}
      </Form>
      {visible ? <Modal
          title="选择业务"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {/* <Checkbox.Group
            options={options}
            defaultValue={selectKeys}
            onChange={onChange}
          /> */}
          <Checkbox.Group style={{ width: '100%' }} defaultValue={selectKeys} onChange={onChange}>
            <Row>
              {options.map((item: any) => {
                return <Col span={8} key={item.value}>
                  <Checkbox value={item.value} disabled={!selectKeys.includes(item.value) && selectKeys.length >= type}>{item.label}</Checkbox>
                </Col>
              })}
            </Row>
        </Checkbox.Group>
      </Modal> : null}
    </div>
  )
}

export default Nest