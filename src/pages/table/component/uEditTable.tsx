import React, {useState} from 'react'
import { Table, Button } from 'antd'
import './style.less'

export interface itemProps {
  value?: string
  fieldCode?: string
  fieldName?: string
  fieldType?: string
  [propName: string]: any
}

const UEditTable = () => {
  const data = [{
    id: 1,
    fieldName: '面积',
    errTip: true,
    value: ''
  }, {
    id: 2,
    fieldName: '价格',
    errTip: true,
    value: ''
  }]
  const [sourceData, setSourceData] = useState<Array<itemProps>>(data)


  // 获取表格字段填写的值
  const changeValue = (e: any, row: any) => {
    const newData: itemProps[] = [...sourceData]
    const index = newData.findIndex((item: itemProps) => row.id === item.id)
    const item: itemProps = newData[index]

    item.value = e.target.value
    if (item.value || !item.errTip) {
      item.errorFiled = false
    } else {
      item.errorFiled = true
    }
    newData.splice(index, 1, {
      ...item,
    })
    setSourceData(newData)
  }

  // 提交
  const submit = () => {
    const newData: itemProps[] = [...sourceData]
    newData.map((item: itemProps) => {
      if (item.value || !item.errTip) {
        item.errorFiled = false
      } else {
        item.errorFiled = true
      }
      return item
    })
    setSourceData(newData)
  }

  const columns = [
    {
      title: '业务字段名称',
      dataIndex: 'fieldName',
      width: '45%',
    },
    {
      title: '业务字段内容',
      dataIndex: 'value',
      editable: true,
      render: (_: any, record: any) => (
        <>
          <input
            style={{ width: '90%' }}
            className={`${record.errorFiled ? 'errorinput' : ''} tableinput`}
            onChange={(e) => changeValue(e, record)}
            value={record.value}
            maxLength={50}
          />
          <div style={{ display: record.errorFiled ? 'block' : 'none' }} className='tabletip'>{record.fieldName}必填</div>
        </>
      ),
    },
  ]
  return (
    <div>
      <Table
        bordered
        dataSource={sourceData}
        columns={columns}
        pagination={false}
        rowKey='id'
        style={{ maxHeight: '350px', overflow: 'auto' }}
      />
      <Button type="primary" onClick={submit} style={{ marginTop: 16 }}>
        submit
      </Button>
    </div>
  )
}

export default UEditTable