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

/**
 * 根据已知的key值查找匹配项的另一个key值
 * @param data 匹配的原始数据
 * @param id 已知的值
 * @param props 数据匹配的key
 * @param key 需要返回的key
 */
export function getKeysByProps(data: any[], id: string | number, props: string | number, key = props) {
  const selectKeys: any[] = []

  // 获取匹配的key
  const render = (data: any[]) => {
    data.some((item: any) => {
      if (item[props] === id) {
        selectKeys.push(item[key])
        return true
      } else if (item.children && item.children.length) {
        render(item.children)
      }
    })
  }
  render(data)
  return selectKeys
}

// antd tree树形匹配方法
export function getParentKey( key: number | string, tree: any): any {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item: any) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
}