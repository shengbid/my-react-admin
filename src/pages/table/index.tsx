import React from 'react'
import { Row, Col } from 'antd'
import EditTable from './component/editTable'
import ShortTable from './component/uEditTable'

const Nest = () => {
  return (
    <div>
      <Row justify="space-between">
        <Col span={11}>
          <h3>官方可编辑单元格</h3>
         <EditTable />
         <span style={{color: '#ccc'}}>点击提交的时候不能对表格的编辑规则进行验证(可能有方法,不过我没找到),而且感觉写得很复杂</span>
        </Col>
        <Col span={11}>
          <h3>自定义简化可编辑表格</h3>
          <ShortTable />
        </Col>
      </Row>
    </div>
  )
}

export default Nest