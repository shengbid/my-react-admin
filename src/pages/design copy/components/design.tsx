// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import { Tooltip, Button, message, Modal } from 'antd'
import {
  FolderAddOutlined,
  DownloadOutlined,
  FileImageOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  ToolOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
import { deployBpmnByString } from '../service/design'
import FileSaver from 'file-saver'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import BpmnModeler from './CustomModeler/index'
import activitiModdleDescriptor from './activiti.json'
import PropertiesPanel from './PropertiesPanel'
import { initXML } from './initXMLData'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import transLateGerman from './translationsGerman'
import styles from './style.module.scss'
import './style2.less'

const { confirm } = Modal
interface IProps {
  hidden: boolean
  setXml: any
}
const TableList: React.FC<IProps> = (props: any) => {
  const { setXml, hidden } = props
  const action = 'create'
  const [modeler, setModeler] = useState()
  const [modelerInfo, setModelerInfo] = useState({
    name: 'My process',
    key: 'myProcess',
  })
  const [scale, setScale] = useState(1)
  const fileEl = useRef(null)

  const initProcess = () => {
    const modelers = new BpmnModeler({
      container: '#modeler-container',
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule,
        {
          translate: ['value', transLateGerman],
        },
      ],
      moddleExtensions: {
        activiti: activitiModdleDescriptor,
      },
    })
    if (action === 'create') {
      modelers.importXML(initXML, (error: any) => {
        if (error) {
          message.info('fail import xml')
        } else {
          const canvas = modelers.get('canvas')

          canvas.zoom('fit-viewport')
        }
      })
    }

    setModeler(modelers)
  }

  const openFile = () => {
    fileEl.current.click()
  }

  const openDiagram = (xml: any) => {
    modeler.importXML(xml, (err: any) => {
      if (err) {
        message.error('加载流程数据失败！')
      } else {
        setXml(xml)
      }
    })
  }

  const showRealPath = () => {
    const selectedFile = fileEl.current.files[0]
    // 后缀获取
    let suffix = ''
    try {
      const fileArr = selectedFile.name.split('.')
      suffix = fileArr[fileArr.length - 1]
    } catch (err) {
      suffix = ''
    }
    if (suffix === '' || (suffix !== 'xml' && suffix !== 'bpmn')) {
      message.error('不是有效的流程文件！')
      return
    }
    const reader = new FileReader()
    reader.readAsText(selectedFile)
    reader.onload = e => {
      openDiagram(e.target?.result)
    }
    // 防止选择同一个文件不执行此方法
    fileEl.current.value = null
  }

  const saveDiagram = () => {
    modeler.saveXML({ format: true }, (err: any, xml: any) => {
      if (!err) {
        FileSaver.saveAs(
          new Blob([xml], { type: 'application/octet-stream' }),
          `${modelerInfo.name}.bpmn`,
        )
      }
    })
  }
  const saveSVG = () => {
    modeler.saveSVG({ format: true }, (err: any, svg: any) => {
      if (!err) {
        FileSaver.saveAs(
          new Blob([svg], { type: 'application/octet-stream' }),
          `${modelerInfo.name}.svg`,
        )
      }
    })
  }
  const handleTabClick = () => {
    modeler.saveXML({ format: true }, (err: any, xml: any) => {
      if (!err) {
        if (setXml) setXml(xml)
      }
    })
  }

  const undo = () => {
    modeler.get('commandStack').undo()
  }
  const redo = () => {
    modeler.get('commandStack').redo()
  }
  const reset = () => {
    confirm({
      title: '提示',
      content: '是否确定重置画布到初始状态，重置后将无法还原',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        // todo 打开初始文件
        openDiagram(initXML)
      },
    })
  }
  const handleZoom = (radio: any) => {
    let newScale = 1.0
    if (radio) {
      if (scale + radio <= 0.2) {
        newScale = 0.2
      } else newScale = scale + radio
    }

    modeler.get('canvas').zoom(newScale)
    setScale(newScale)
  }
  const resetView = () => {
    modeler.get('canvas').zoom('fit-viewport')
  }

  const deployBpmn = () => {
    /* eslint-disable */
    modeler.saveXML(async(err, xml) => {
      const result = await deployBpmnByString({
        fileName: modeler.key + '.bpmn20.xml',
        processXml: xml,
      })
      if (result.responseCode === '000000') {
        message.success('流程部署成功！')
      }
    })
  }

  const deployConfirm = () => {
    confirm({
      title: '提示',
      content: `是否确定部署${modelerInfo.name}流程`,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deployBpmn()
      },
    })
  }

  useEffect(() => {
    initProcess()
  }, [])

  useEffect(() => {
    if (modeler) {
      handleTabClick()
    }
  }, [modeler, hidden])

  return (
    <div className={styles.processContanier}>
      <div className={styles.ModelerContainer} id='modeler-container' />
      <div id='properties-container' className={styles.propertyContanier}>
        <PropertiesPanel modeler={modeler} changeModelerObj={setModelerInfo} />
      </div>
      <ul className={styles.processUl}>
        <li>
          <Tooltip title='打开流程文件'>
            <Button onClick={openFile}>
              <FolderAddOutlined />
              <input ref={fileEl} type='file' hidden onChange={showRealPath} />
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip title='下载文件'>
            <Button onClick={saveDiagram}>
              <DownloadOutlined />
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip title='下载图片'>
            <Button onClick={saveSVG}>
              <FileImageOutlined />
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip title='撤消'>
            <Button onClick={undo}>
              <ArrowLeftOutlined />
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip title='还原'>
            <Button onClick={redo}>
              <ArrowRightOutlined />
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip title='重置'>
            <Button onClick={reset}>
              <ReloadOutlined />
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip title='放大'>
            <Button onClick={() => handleZoom(0.1)}>
              <PlusCircleOutlined />
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip title='缩小'>
            <Button onClick={() => handleZoom(-0.1)}>
              <MinusCircleOutlined />
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip title='复位'>
            <Button onClick={resetView}>
              <ToolOutlined />
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip title='部署流程'>
            <Button onClick={deployConfirm}>
              <PlayCircleOutlined />
            </Button>
          </Tooltip>
        </li>
      </ul>
    </div>
  )
}

export default TableList
