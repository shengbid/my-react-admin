import React, { useEffect, useState } from 'react'
import { getFiles } from '@/services/upload'
import { UploadOutlined } from '@ant-design/icons'
import UploadList from '@/components/Upload/Upload'
import './style.less'

const Nest = () => {
  const [fileList, setFileList] = useState<any[]>([])

  const getFileList = async() => {
    const res = await getFiles()
    if (res.data) {
      setFileList(res.data.fileList)
    }
  }

  const handleChange = (info: any) => {
    console.log(22, info)
  }
  const props = {
    name: 'file',
    action: '/upload/file',
    headers: {
      authorization: 'authorization-text',
    },
    multiple: true,
  }

  useEffect(() => {
    getFileList()
  }, [])

  return (
    <div className="upload-contanier">
      <p className="title">
      文件列表上传
      </p>
      <p className="tip">
        二次封装antd upload组件,解决初始页面需要展示文件列表,指定fileList后上传status一直uploading状态.
        舍弃了原有的文件列表展示,重新封装文件列表
      </p>
      <div className="upload-files">
          <UploadList prop={props} handleChange={(info: any) => handleChange(info)} fileList={fileList}>
            <UploadOutlined /> Click to Upload
          </UploadList>
      </div>
    </div>
  )
}

export default Nest