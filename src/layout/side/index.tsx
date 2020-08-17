import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import {Link as RLink} from 'react-router-dom';
import * as Icon from '@ant-design/icons'
import { getKeysByProps, getFathersById } from '@/commons/utils'
import menus from './menus'
import './style.less'
// const styles = require ('./style.less')

const SubMenu = Menu.SubMenu;
interface menuProp {
  key: string
  title: string
  pathname?: string
  isMenu: boolean
  icon?: string
  children?: menuProp[]
}

export default function SideMenu (props: any) {
  const [selectKeys, setSelectKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  let pathname = props.route.location ? props.route.location.pathname : '/home'
  const {onTab, selectedKey} = props

  const handleClick = ( e: any )=> {
    const { key } = e
    // console.log('click ', key);
    setSelectKeys([key])
  };
  const handlePen = (keyPath: any )=> {
    // console.log('7 ', keyPath);
    setOpenKeys(keyPath)
  };
  const handleActive = (item: any) => {
    // console.log(item, props)
    props.route.history.push(item.pathname)
    onTab(item)
  }

  const renderMenus = (data: any) => {
    return data.map((item: menuProp) => {
      const {
          key,
          // pathname,
          icon,
          title,
          children
      } = item
      const iconEle = icon ? Icon[icon] : Icon.TableOutlined
      const titleNode = <span>{React.createElement(iconEle)}<span>{title}</span> </span>
      if (children && children.length) {
        return (
          <SubMenu key={key} title={titleNode}>
            {renderMenus(children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={key} onClick={() => handleActive(item)}>
          <span className="hovername">
            {/* <RLink to={{pathname: pathname}}> */}
              <span>{React.createElement(iconEle)}</span>{title}
              {/* </RLink> */}
            </span>
        </Menu.Item>
      )
    })
  }

  const getSelectedKeys = () => {
    let selectKey: string[] = []
    let openKey: string[] = []

    if (pathname === '/') {
      pathname = '/home'
    }
    selectKey = getKeysByProps(menus, pathname, 'pathname', 'key')
    openKey = getFathersById(menus, pathname, 'pathname', 'key')
    setSelectKeys(selectKey)
    setOpenKeys(openKey)
    // console.log(selectKey, selectKeys, openKeys)
  }
  useEffect(() => {
    // console.log(99, selectedKey)
    
    if (selectedKey.length) {
      setSelectKeys(selectedKey)
    } else {
      getSelectedKeys()
    }
  }, [selectedKey])

  return (
    <Menu
      onClick={handleClick}
      onOpenChange={handlePen}
      selectedKeys={selectKeys}
      openKeys={openKeys}
      theme="dark"
      mode="inline"
    >
      {renderMenus(menus)}
    </Menu>
  )
}