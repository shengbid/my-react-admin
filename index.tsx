import React, { useState } from 'react'
import { Tabs } from 'antd'
import ProcessInit from './components/design'
import SourceXML from './components/sourceXml'

const TableList: React.FC<{}> = () => {
  const [tab, setTab] = useState('0')
  const [xml, setXml] = useState(null)

  const { TabPane } = Tabs
  const setXmls = (l: any) => {
    setXml(l)
  }

  return (
    <div>
      <div style={{ padding: '20px', background: '#fff' }}>
        <Tabs defaultActiveKey='0' onChange={(key: string) => { setTab(key) }}>
          {['流程设计器', 'XML 源码'].map((v, i) => {
            return <TabPane tab={v} key={String(i)}>
              {tab === '0'
                ? <ProcessInit setXml={setXmls} hidden={(tab === '0')} />
                : <SourceXML data={xml} />}
            </TabPane>
          })}
        </Tabs>
      </div>
    </div>
  )
}

export default TableList
