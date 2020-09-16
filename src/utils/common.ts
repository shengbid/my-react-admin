// 处理树形数据
export const handleTreeData = (data: any[]) => {
  const item: any[] = []
  data.map((list) => {
    interface dataProps {
      [propName: string]: any
  }
    const newData: dataProps = { ...list }
    newData.key = String(list.id)
    newData.value = list.id
    newData.title = list.fullName
    newData.children = list.children ? handleTreeData(list.children) : [] // 如果还有子集，就再次调用自己
    item.push(newData)
    return 1
  })
  return item
}

/**
 * 根据子级类型查找所有匹配的父级类型
 * id: 子级ID
 * data: 匹配数据
 * prop: 匹配的类型,默认用ID匹配
 * name: 返回的数据,默认返回ID数组
 */
export function getFathersById(datas: any, id: string | number, prop = 'id', name = prop) {
  const arrRes: any[] = []
  const rev = (data: any, nodeId: string | number) => {
    for (let i = 0, { length } = data; i < length; i++) {
      const node = data[i]
      if (node[prop] === nodeId) {
        arrRes.unshift(node[name])
        return true
      }
      if (node.children && node.children.length) {
        if (rev(node.children, nodeId)) {
          arrRes.unshift(node[name])
          return true
        }
      }
    }
    return false
  }
  rev(datas, id)
  return arrRes
}

export function getFathersArr(datas: any, id: string | number, prop = 'id') {
  // const newArr: any[] = []
  const judge = (data: any, nodeId: string | number) => {
    let flag = false
    data.some((item: any) => {
      if (item[prop] === nodeId) {
        flag = true
        return
      }
      if (item.children && item.children.length) {
        if (judge(item.children, nodeId)) {
          flag = true
        }
      }
    })
    return flag
  }
  const loop = (data: any, nodeId: string | number, newArr: any[]) => {
    data.some((item: any) => {
      let obj = {}
      if (item[prop] === nodeId) {
        obj = {
          key: item.id,
          id: item.id,
          title: item.fullName,
        }
        newArr.push(obj)
      }
      if (item.children && item.children.length) {
        if (judge(item.children, nodeId)) {
          obj = {
            key: item.id,
            id: item.id,
            title: item.fullName,
            children: loop(item.children, nodeId, []),
          }
          newArr.push(obj)
        }
      }
    })
    return newArr
  }
  // loop(datas, id)
  // loop(datas, id, [])
  console.log(123, loop(datas, id, []))
  return loop(datas, id, [])
}

// antd tree树形匹配方法
export function getParentKey(key: number | string, tree: any): any {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children && node.children.length) {
      if (node.children.some((item: any) => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return String(parentKey)
}
