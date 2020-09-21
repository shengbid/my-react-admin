import React, { useState, useEffect } from 'react'
import { Modal, Button, Tree, Avatar, Checkbox, Row, Col, Tag, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getAllDept, getAllList } from '../../service/design'
import styles from '../style.module.scss'

interface UpdateFormProps {
  onCancel: () => void
  setCandidateUsers: (values: any) => void
  setAssignee: (values: any) => void
  userModalVisible: boolean
  values: any
}

const TableList: React.FC<UpdateFormProps> = (props: any) => {
  const [count, setCount] = useState(0)
  const [treeData, setTreeData] = useState<any>([])
  const [userData, setUserData] = useState<any>([])
  const [selectUsers, setSelectUsers] = useState<any>([])
  const [selectIds, setSelectIds] = useState<any>([])

  const {
    setCandidateUsers,
    setAssignee,
    userModalVisible,
    onCancel,
  } = props

  const {
    name,
    selectedIds,
  } = props.values

  const maxCount = props.values.maxSelectNum ? props.values.maxSelectNum : 1000

  const onSelect = async(expandedKeys: any, update = 0) => {
    const result = await getAllList({
      deptId: Number(expandedKeys[0]),
    })
    if (result.data && result.data.userList) {
      setUserData(result.data.userList)
      if (update === 1) {
        let ids: any[] = []
        ids = selectedIds.map((item: any) => { return item.id })
        setSelectIds([...ids])
        const users = result.data.userList.filter((item: any) => {
          return ids.includes(item.id)
        })
        setSelectUsers(users)
        setCount(users.length)
        console.log(selectedIds, treeData, selectIds, users)
      }
    } else setUserData([])
  }

  const initFn = () => {
    if (treeData.length) {
      onSelect([treeData[0].id], 1)
    }
  }

  const handleSubmit = () => {
    if (!selectUsers.length) {
      message.warning('请选择成员后再提交')
      return
    }
    if (name === 'assignee') {
      setAssignee(selectUsers)
    } else setCandidateUsers(selectUsers)
    setSelectIds([])
    setSelectUsers([])
    setCount(0)
  }

  const getRoleList = async() => {
    const result = await getAllDept()
    if (result.data && result.data.deptList) {
      setTreeData(result.data.deptList)
      onSelect([result.data.deptList[0].id])
    } else setTreeData([])
  }

  // 选择成员
  const onCheckUser = (e: any, item: any) => {
    if (e.target.checked) {
      selectUsers.push(item)
      setCount((pre: number) => {
        return pre + 1
      })
    } else {
      selectUsers.some((sub: any, i: number) => {
        if (sub.id === item.id) {
          selectUsers.splice(i, 1)
          return
        }
      })
      setCount((pre: number) => {
        return pre - 1
      })
    }
    const selectId = selectUsers.map((sub: any) => {
      return sub.id
    })
    console.log(4, selectId, selectUsers)
    setSelectIds(selectId)
    setSelectUsers(selectUsers)
  }

  const renderFooter = () => {
    return (
      <>
        <Button type='primary' onClick={handleSubmit}>确定</Button>
      </>
    )
  }

  useEffect(() => {
    if (userModalVisible) {
      getRoleList()
    }
  }, [userModalVisible])

  useEffect(() => {
    initFn()
  }, [selectedIds])

  return (
    <Modal
      width={800}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title='选择成员'
      visible={userModalVisible}
      footer={renderFooter()}
      onCancel={() => onCancel()}
    >
      <div className={styles.userContainer}>
        <div className={styles.userList}>
          <div className={styles.userLeft}>
            <p>组织架构</p>
            {
              treeData.length > 0 &&
                <Tree
                  checkStrictly
                  defaultExpandAll
                  onSelect={(v) => { onSelect(v) }}
                  treeData={treeData}
                />
            }
          </div>
          <div className={styles.userRight}>
            <p>成员列表(写死数据)</p>
            <Row>
              {userData.length && userData.map((item: any) => {
                return <Col span='24' key={item.id}>
                  <Checkbox value={item.id}
                    checked={selectIds.includes(item.id)}
                    disabled={selectIds.length >= maxCount && !selectIds.includes(item.id)}
                    onChange={(values) => onCheckUser(values, item)}>
                    <Avatar icon={<UserOutlined />} style={{ marginTop: '-12px' }} />
                    <div className={styles.userInfo}>
                      <div>
                        <span>{item.name}</span>
                        {item.status === '2' && <Tag style={{ marginLeft: '20px' }} color='red'>冻结</Tag>}
                      </div>
                      <div>{item.deptName}</div>
                    </div>
                  </Checkbox>
                </Col>
              })}
            </Row>
          </div>
        </div>
        <div className={styles.selectList}>
          {selectUsers.map((item: any) => {
            return <div key={item.id} className={styles.selectItem}>
              <Avatar icon={<UserOutlined />} />
              <div>{item.name}</div>
            </div>
          })}
        </div>
        <div style={{ marginTop: '10px', color: '#ccc' }}>已选: {count}/{maxCount} 位</div>
      </div>
    </Modal>
  )
}

export default TableList
