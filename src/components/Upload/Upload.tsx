import React, { useEffect, useState } from 'react'
import { Upload, Button, Modal, Popconfirm } from 'antd'
import { DeleteOutlined, PaperClipOutlined } from '@ant-design/icons'
import './style.less'

interface fileProps {
  action: string,
  // onChang: (file: any) => void,
  [propName: string]: any
}
interface uploadProps {
  prop: fileProps,
  fileList: any[],
  button?: string,
  handleChange: (file: any) => void,
  children: any
}
const UploadList = (props: uploadProps) => {
  const {prop, fileList, handleChange} = props
  const [fileLists, setFileList] = useState<any[]>([])
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [previewTitle, setPreviewTitle] = useState<string>('文件预览')
  const [previewImage, setPreviewImage] = useState<string>('')

  const newProp = {...prop}
  newProp.showUploadList = false

  // 上传文件
  const change = (info: any) => {
    let flag = true
    const newArr = [...fileLists]
    fileLists.some((item: any) => {
      if (item.uid === info.file.uid) {
        flag = false
      }
    })
    if (flag) {
      newArr.push(info.file)
    }
    setFileList(newArr)
    handleChange(fileLists)
    // console.log(fileLists)
  }

  // 点击删除
  const confirm = (i: number) => {
    onRemove(i)
  }
  // 删除文件
  const onRemove = (i: number) => {
    const newArr = [...fileLists]
    newArr.splice(i, 1)
    setFileList(newArr)
  }

  // 预览文件
  const onPreview = (item: any) => {
    const url = item.url ? item.url : item.response.data.url
    setPreviewTitle(item.name)
    setPreviewImage(url)
    setPreviewVisible(true)
  }

  // 关闭预览
  const handleCancel = () => {
    setPreviewVisible(false)
  }

  useEffect(() => {
    setFileList(fileList)
  }, [fileList])

  return (
    <div className="upload-list">
      <Upload {...newProp} onChange={(info) => change(info)}>
        <Button>
          {props.children}
        </Button>
      </Upload>
      <ul className="file-list">
        {fileLists.map((item, i) => {
        return <li className="upload-item" key={item.uid}>
          <span className="left-file" onClick={() => {onPreview(item)}}><PaperClipOutlined className="left-icon" />
            <span className="left-title" >{item.name}</span>
          </span>
          <Popconfirm placement="topLeft" title="是否确认删除文件" onConfirm={() => confirm(i)} okText="确定" cancelText="取消">
            <span className="right-file" title="删除文件"><DeleteOutlined /></span>
          </Popconfirm>
        </li>})}
      </ul>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default UploadList
