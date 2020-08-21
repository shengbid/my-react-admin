import React, { useEffect, useState } from 'react';
import { Tree, Input } from 'antd'
import { getDeptList } from '@/services/dept'
import { getFathersById } from '@/commons/utils'
import { DeleteOutlined } from '@ant-design/icons'
import './style.less'

const Detail = () => {
  const [expandedKeys, setExpandedKeys] = useState([])
  const [treeData, setTreeData] = useState<any[]>([])
  const [selectdKeys, setSelectdKeys] = useState<any[]>([])
  const [checkedKeys, setCheckedKeys] = useState<any[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [searchValue, setSearchValue] = useState('')

  // 将树形节点改为一维数组
  const generateList = (data: any, dataList: any[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key } = node;
      dataList.push({ key, title: key });
      if (node.children) {
        generateList(node.children, dataList);
      }
    }
    return dataList
  }

  // 获取树形节点数据
  const getList = async() => {
    const res = await getDeptList()
    console.log(11, res)
    setTreeData(res.data)
    // handleTree(res.data)
  }
  // 搜索节点
  const onChange = (e: any) => {
    
    let { value } = e.target
    value = String(value).trim()
    if (!value) {
      return
    }
    const dataList: any[] = generateList(treeData, [])
    let expandedKeys: any = dataList
      .map((item: any) => {
        if (item.title.indexOf(value) > -1) {
          return getFathersById(treeData, item.key, 'key')
        }
        return null;
      })
      .filter((item: any, i: number, self: any) => item && self.indexOf(item) === i)

    expandedKeys = expandedKeys.length ? expandedKeys[0] : []
    // console.log(22, dataList, value, expandedKeys)
    setExpandedKeys(expandedKeys)
    setAutoExpandParent(true)
    setSearchValue(value)
  }

  // 树节点展开/收缩
  const onExpand = (expandedKeys: any) => {
    setExpandedKeys(expandedKeys)
    setAutoExpandParent(false)
  }

  // 选择节点
  const checkDep = (val: any, data: any) => {
    if (data && data.checkedNodes && data.checkedNodes.length) {
      let checkedNodes = [...data.checkedNodes]
      // console.log(1, val, data)

      setSelectdKeys(checkedNodes)
      setCheckedKeys(
        checkedNodes.map((subItem: any) => {
          return subItem.key
        }),
      )
    } else {
      setSelectdKeys([])
      setCheckedKeys([])
    }
  }

  // 删除节点
  const removeDep = (i: number) => {
    const checkedNodes = [...selectdKeys]
    checkedNodes.splice(i, 1)
    setSelectdKeys(checkedNodes)
    setCheckedKeys(
      checkedNodes.map((subItem: any) => {
        return subItem.key
      }),
    )
  }

  // 处理搜索时树形数据高亮
  const loop = (data: any) =>
    data.map((item: any) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    })

  useEffect(() => {
    getList()
  }, [])

  return (
      <div>
        <div className="tree-contanier">
          <div className="left-content">
            <span>可搜索可控制选择的树形组件</span>
            <Input style={{ marginBottom: 8 }} allowClear placeholder="Search" onChange={onChange} />
            <Tree
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              checkable
              onCheck={checkDep}
              checkedKeys={checkedKeys}
              checkStrictly
              treeData={loop(treeData)}
            />
          </div>
          <div className="right-content">
            <span>已选择列表</span>
            <ul>
              {selectdKeys.map((item: any, i: number) => {
                return <li key={item.key} className="select-item">
                  {item.title}
                  <span className="remove" title="删除" onClick={() => removeDep(i)}><DeleteOutlined /></span>
                </li>
              })}
            </ul>
          </div>
        </div>
      </div>
  )
}

export default Detail