// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { Collapse, Form, Input, Radio, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getAllRoleList, getUserById } from '../service/design'
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper'
import extensionElementsHelper from 'bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper'
import ImplementationTypeHelper from 'bpmn-js-properties-panel/lib/helper/ImplementationTypeHelper'
import Contact from './contact'
import { useForm } from 'antd/lib/form/util'

interface IProps {
  modeler: any
  changeModelerObj: (params: any) => void
}
const { Panel } = Collapse
const FormItem = Form.Item
const { TextArea } = Input
const { Option } = Select
const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const TableList: React.FC<IProps> = (props: any) => {
  const { modeler, changeModelerObj } = props

  const [baseForm] = Form.useForm()
  const [userForm] = Form.useForm()
  const [selectedAssignee, setSelectedAssignee] = useState('') // 代理人
  const [element, setElement] = useState(null as any)
  const [selectType, setSelectType] = useState('')
  const [selectedElements, setSelectedElements] = useState([])
  const [rootElement, setRootElement] = useState(null)
  const [isUserTask, setIsUserTask] = useState(null)
  const [isServiceTask, setIsServiceTask] = useState(null)
  const [sequenceFlow, setSequenceFlow] = useState(null)
  const [isGateway, setIsGateway] = useState(null)
  const [isExclusiveSequenceFlow, setIsExclusiveSequenceFlow] = useState(null)
  const [isStart, setIsStart] = useState(null)
  const [isTask, setIsTask] = useState(null)
  const [isEvent, setIsEvent] = useState(null)
  const [userModalVisible, setUserModalVisible] = useState(false)
  const [roleOptions, setRoleOptions] = useState([])
  const [contactValues, setContactValues] = useState({
    name: '',
    maxSelectNum: 1,
    selectedIds: [],
  })
  const [form, setForm] = useState({
    id: null,
    name: null,
    versionTag: null,
    taskPriority: null,
    jobPriority: null,
    candidateStarterGroups: null,
    candidateStarterUsersNames: null,
    candidateStarterUsers: null,
    historyTimeToLive: null,
    // 流程发起人
    initiator: null,
    description: null,
    targetNamespace: null,
    async: null,
    exclusive: null,
    isForCompensation: null,
    skipExpression: null,
  })
  const [listener, setListener] = useState({} as any) // 监听器
  const [taskListener, setTaskListener] = useState({} as any) // 任务监听器
  const [isTaskListener, setIsTaskListener] = useState(null) // 任务监听器
  const [saveButtonDatas, setSaveButtonDatas] = useState({} as any) // 任务监听器
  const [multiInstance, setMultiInstance] = useState({} as any) //
  const [saveProperties, setSaveProperties] = useState({} as any) //
  const [buttonsData, setButtonDatas] = useState([]) // 按钮
  const [listenerData, setListenerData] = useState([]) // 选中的监听器数组
  const [taskListenerData, setTaskListenerData] = useState([]) // 选中的监听器数组
  const [exclusiveSequence, setExclusiveSequence] = useState({ conditionExpression: undefined })
  const [userTask, setUserTask] = useState({
    assigneeType: 1,
    assigneeName: '',
    assignee: '',
    assigneeId: '',
    candidateUsersName: '',
    candidateUsers: '',
    candidateGroups: [],
    formKey: '',
    assigneeSelectedArr: [],
    candidateUsersSelectedArr: [],
  } as any)
  const [selectedMultiInstance, setSelectedMultiInstance] = useState({
    isSequential: '',
    loopCardinality: '',
    collection: '',
    elementVariable: '',
    completionCondition: '',
    asyncBefore: false,
    asyncAfter: false,
    failedJobRetryTimeCycle: '',
  })

  const setProcessUser = () => {
    let userIds = []
    if (form.candidateStarterUsers) {
      userIds = form.candidateStarterUsers.split(',')
    }
  }

  const setButton = businessExtension => {
    setSaveButtonDatas(saveButtonDatas[form.id] || {})
    const objValues = JSON.parse(JSON.stringify(saveButtonDatas[form.id] || {}))
    const Buttons = []
    const TaskListener = []
    const ExecutionListener = []
    const obj: any = {}
    const listenerType = ['class', 'expression', 'delegateExpression']
    businessExtension.filter(item => {
      if (item.$type === 'activiti:Button') {
        obj.eventType = item.event
        listenerType.some(key => {
          if (item[key]) {
            obj.value = item[key]
            obj.listenerType = key
            return
          }
        })
        Buttons.push(item)
      }
      if (item.$type === 'activiti:TaskListener') {
        obj.eventType = item.event
        listenerType.some(key => {
          if (item[key]) {
            obj.value = item[key]
            obj.listenerType = key
            return
          }
        })
        TaskListener.push(item)
      }
      if (item.$type === 'activiti:ExecutionListener') {
        obj.eventType = item.event
        listenerType.some(key => {
          if (item[key]) {
            obj.value = item[key]
            obj.listenerType = key
            return
          }
        })
        ExecutionListener.push(item)
      }
    })
    setButtonDatas(objValues.Button || Buttons)
    setListenerData(objValues.ExecutionListener || ExecutionListener)
    setTaskListenerData(objValues.TaskListener || TaskListener)
  }

  // 根据流程保存的信息的设置处理人
  const elsetUserTask = async(businessObject) => {
    // userForm.setFieldsValue({ ...userTask })

    if (businessObject.assignee) {
      const res = await getUserById(businessObject.assignee)
      userTask.assigneeName = res.data.name
      userTask.assignee = businessObject.assignee
      userTask.assigneeSelectedArr = [{ id: businessObject.assignee }]
    } else {
      userTask.assigneeName = ''
      userTask.assignee = ''
      userTask.assigneeSelectedArr = []
    }
    userTask.candidateUsersSelectedArr = []
    userTask.candidateUsersName = ''
    if (businessObject.candidateUsers) {
      const newArr = businessObject.candidateUsers.split(',')
      newArr.forEach(async(id, i, arr) => {
        userTask.candidateUsersSelectedArr.push({ id: Number(id) })
        const data = await getUserById(id)
        if (userTask.candidateUsersName.indexOf(data.data.name) < 0) {
          userTask.candidateUsersName += data.data.name
          if (i !== arr.length - 1) {
            userTask.candidateUsersName += ','
          }
        }
      })
    }
    userTask.candidateGroups = []
    if (businessObject.candidateGroups) {
      userTask.candidateGroups = businessObject.candidateGroups
    }
    setUserTask({
      ...userTask,
      assigneeType: 1,
    })
    if (userForm) {
      userForm.setFieldsValue({...userTask})
      const res = userForm.getFieldsValue()
      console.log(567, userTask, res)
    }
  }

  const setListenerFn = (elements, businessObject) => {
    // 执行监听器
    setListenerData(listener[elements.id] || [])
    if (listener[elements.id]?.length === 0) {
      const listeners =
        extensionElementsHelper.getExtensionElements(
          businessObject,
          'activiti:ExecutionListener',
        ) || []
      const mylistenerData = [...listenerData]
      for (let i = 0; i < listeners.length; i++) {
        const mylistener = listeners[i]
        const listenerType = ImplementationTypeHelper.getImplementationType(listener)
        mylistenerData.push({
          id: Math.random(16),
          eventType: mylistener.event || '',
          listenerType,
          value: mylistener[listenerType],
        })
        setListenerData(mylistenerData)
      }
      const ELlistener = { ...listener }
      ELlistener[element.id] = mylistenerData
      setListener(ELlistener)
    }
  }

  const setTaskListenerFn = (elements, businessObject) => {
    setTaskListenerData(taskListener[elements.id] || [])
    const mytaskListenerData = [...taskListenerData]
    if (taskListener[elements.id]?.length === 0) {
      const listeners =
        extensionElementsHelper.getExtensionElements(businessObject, 'activiti:TaskListener') || []
      for (let i = 0; i < listeners.length; i++) {
        const mylistener = listeners[i]
        const listenerType = ImplementationTypeHelper.getImplementationType(mylistener)
        mytaskListenerData.push({
          id: Math.random(16),
          eventType: mylistener.event || '',
          listenerType,
          value: mylistener[listenerType],
        })
      }
      const eltaskListener = { ...taskListener }
      eltaskListener[elements.id] = mytaskListenerData
      setTaskListener(eltaskListener)
    }
  }

  // 保存每个节点对应的数据
  const saveKeys = (obj, objkeys = 'saveProperties') => {
    // 保存右侧属性
    const myobj = eval(objkeys)
    const ownKeys = myobj?.[form.id]
    if (ownKeys) {
      myobj[form.id] = { ...myobj[form.id], ...obj }
    } else {
      myobj[form.id] = obj
    }
    const fnStr = objkeys.substring(1)
    const fnFirstStr = objkeys.substring(0, 1).toUpperCase()
    console.log(`set${fnFirstStr}${fnStr}`)
    eval(`set${fnFirstStr}${fnStr}`)({ ...myobj })
  }

  const updateProperties = properties => {
    const modeling = modeler.get('modeling')
    console.log(properties, rootElement)
    modeling.updateProperties(element || rootElement, properties)
  }

  // 保存处理人数据到流程上
  const changeField = (value, type, isUpdate) => {
    // const value = event.target.value
    // console.log(value, type)
    element[type] = value
    const properties = {}
    properties[type] = value
    saveKeys(properties)
    if (isUpdate) {
      updateProperties(properties)
      userTask.candidateGroups = value
      setUserTask({ ...userTask })
    }
  }

  // 保存处理人
  const setAssignee = (res) => {
    // console.log(res)
    setUserModalVisible(false)
    userTask.assignee = res[0].id
    userTask.assigneeName = res[0].name
    userTask.assigneeSelectedArr = [
      {
        id: res[0].id,
      },
    ]
    updateProperties({
      assignee: userTask.assignee,
    })
    setUserTask({ ...userTask })
    console.log(userTask)
    userForm.setFieldsValue({
      ...userTask,
    })
    saveKeys({
      assigneeName: userTask.assigneeName,
      assigneeSelectedArr: userTask.assigneeSelectedArr,
    })
  }

  // 保存处理人组
  const setCandidateUsers = (res) => {
    setUserModalVisible(false)
    const users = []
    const usersName = []
    const candidateUsersSelectedArr = []
    for (let i = 0; i < res.length; i++) {
      candidateUsersSelectedArr.push({ id: res[i].id })
      users.push(res[i].id)
      usersName.push(res[i].name)
    }
    userTask.candidateUsersSelectedArr = candidateUsersSelectedArr
    userTask.candidateUsers = users.join(',')
    userTask.candidateUsersName = usersName.join(',')
    setUserTask({ ...userTask })
    userForm.setFieldsValue({
      ...userTask,
    })
    updateProperties({
      candidateUsers: userTask.candidateUsers,
    })
    saveKeys({
      candidateUsersName: userTask.candidateUsersName,
      candidateUsersSelectedArr: userTask.candidateUsersSelectedArr,
    })
  }

  // 调用处理人选择弹框
  const selectAgent = (maxSelectNum, name) => {
    setUserModalVisible(true)
    setContactValues({
      name,
      maxSelectNum,
      selectedIds: name === 'assignee'
        ? userTask.assigneeSelectedArr
        : userTask.candidateUsersSelectedArr,
    })
  }

  const handleMultiInstance = val => {
    saveKeys({ isSequential: val }, 'multiInstance')
    let loopCharacteristics
    if (val === '') {
      loopCharacteristics = undefined
    } else {
      const moddle = modeler.get('moddle')
      loopCharacteristics = moddle.create('bpmn:MultiInstanceLoopCharacteristics')
      if (val === 'Sequential') {
        loopCharacteristics.isSequential = true
      }
    }
    updateProperties({
      loopCharacteristics,
    })
  }

  const setMultiInstanceFn = businessObject => {
    setMultiInstance(multiInstance[form.id] || {})
    const objValues = JSON.parse(JSON.stringify(multiInstance[form.id] || {}))
    const keys = [
      'isSequential',
      'loopCardinality',
      'collection',
      'elementVariable',
      'completionCondition',
    ]
    keys.forEach(v => {
      selectedMultiInstance[v] = objValues[v]
    })
    const loopCharacteristics = businessObject.loopCharacteristics
      ? businessObject.loopCharacteristics
      : {}

    const myselectedMultiInstance = { ...selectedMultiInstance }

    myselectedMultiInstance.collection = objValues.collection || loopCharacteristics.collection
    myselectedMultiInstance.elementVariable =
      objValues.elementVariable || loopCharacteristics.elementVariable

    if (!myselectedMultiInstance.isSequential) {
      if (objValues.isSequential) {
        myselectedMultiInstance.isSequential = objValues.isSequential
      } else if (loopCharacteristics.loopCardinality) {
        myselectedMultiInstance.isSequential = loopCharacteristics.isSequential
          ? 'Sequential'
          : 'Parallel'
        if (!businessObject.loopCharacteristics) {
          handleMultiInstance(myselectedMultiInstance.isSequential)
        }
      }
    }
    if (
      myselectedMultiInstance.loopCardinality === undefined &&
      loopCharacteristics.loopCardinality
    ) {
      myselectedMultiInstance.loopCardinality = loopCharacteristics.loopCardinality.body
    }
    if (
      myselectedMultiInstance.completionCondition === undefined &&
      loopCharacteristics.completionCondition
    ) {
      myselectedMultiInstance.completionCondition = loopCharacteristics.completionCondition.body
    }
    setSelectedMultiInstance(myselectedMultiInstance)
  }

  const setDefaultProperties = elelement => {
    if (elelement) {
      console.log(99, elelement, isUserTask)
      const { businessObject } = elelement
      // setUserTask({
      //   ...businessObject,
      //   ...businessObject?.$attrs,
      // })
      setForm({
        ...businessObject,
        ...businessObject?.$attrs,
        targetNamespace: businessObject?.$parent?.targetNamespace,
        name: businessObject?.name,
      })
      baseForm.setFieldsValue({
        ...businessObject,
        ...businessObject?.$attrs,
        targetNamespace: businessObject?.$parent?.targetNamespace,
        name: businessObject?.name,
      })
      if (elelement.type === 'bpmn:Process') {
        setProcessUser()
        setIsUserTask(false)
        setIsStart(false)
        setIsTask(false)
      } else if (isUserTask || elelement.type === 'bpmn:UserTask') {
        // 设置流程人
        elsetUserTask(businessObject)
        // 设置多实例配置的值
        setMultiInstanceFn(businessObject)
        const businessExtension = businessObject.extensionElements
          ? businessObject.extensionElements.values
          : []
        setButton(businessExtension)
      }
      if (elelement.type === 'bpmn:SequenceFlow' && businessObject.conditionExpression) {
        setExclusiveSequence({
          ...exclusiveSequence,
          conditionExpression: businessObject.conditionExpression.body,
        })
      }
      setListenerFn(elelement, businessObject)
      setTaskListenerFn(elelement, businessObject)
      if (businessObject?.documentation) {
        // this.form.description = businessObject.documentation[0].text
      }
    }
  }

  const executeCommand = command => {
    const commandStack = modeler.get('commandStack')
    console.log(command)
    commandStack.execute(command.cmd, command.context)
  }

  const updateDocumentation = value => {
    const bpmnFactory = modeler.get('bpmnFactory')
    if (value) {
      const newObjectList = []
      newObjectList.push(
        bpmnFactory.create('bpmn:Documentation', {
          text: value,
        }),
      )
      const elements = rootElement
      const command = cmdHelper.setList(
        elements,
        elements.businessObject,
        'documentation',
        newObjectList,
      )
      executeCommand(command)
    }
  }

  const handleChangeAssignee = e => {
    const { value } = e.target
    userTask.assigneeType = value
    let assignee = selectedAssignee
    if (value === 2) {
      assignee = '$INITIATOR'
      setSelectedAssignee(userTask.assignee)
    }
    setUserTask({ ...userTask, assignee })
    updateProperties({ assignee })
    saveKeys({ assigneeType: value })
  }

  const elementChangeEvent = e => {
    if (!element) {
      return
    }
    if (e.element.id === element.id) {
      setElement(e.element)
      setDefaultProperties(e.element)
    }
  }
  const elementClickEvent = e => {
    const type = e.element?.type
    if (type === 'bpmn:Process') setRootElement(e.element)
    if (!element) {
      setDefaultProperties(e.element)
    }
  }

  // 获取所有角色列表
  const getUserList = async() => {
    const result = await getAllRoleList()
    if (result.data) {
      setRoleOptions(result.data)
    } else setRoleOptions([])
  }
  const initFn = () => {
    modeler.on('selection.changed', e => {
      const { newSelection } = e
      setSelectedElements(newSelection)
      setElement(newSelection[0])
      setRootElement(null)
      setDefaultProperties(newSelection[0])
      // console.log(element, 'change')
    })
    modeler.on('element.changed', e => {
      elementChangeEvent(e)
    })
    modeler.on('element.click', e => {
      elementClickEvent(e)
    })
    modeler.on('root.added', e => {
      elementClickEvent(e)
    })
  }

  // 基本设置
  const renderContent = () => {
    return (
      <>
        <FormItem
          name='id'
          label='定义KEY'
          rules={[{ required: false, message: '请输入key！' }]}
        >
          <Input placeholder='请输入' onChange={(e) => {
            updateProperties({ id: e.currentTarget.value })
          }} />
        </FormItem>
        <FormItem
          name='name'
          label='名称'
          rules={[{ required: false, message: '请输入名称！' }]}
        >
          <Input placeholder='请输入' onChange={(e) => {
            updateProperties({ name: e.currentTarget.value })
          }} />
        </FormItem>
        {rootElement ? <div>
          <FormItem
            name='targetNamespace'
            label='命名空间'
            rules={[{ required: false, message: '请输入命名空间！' }]}
          >
            <Input placeholder='请输入' onChange={(e) => {
              updateProperties({ targetNamespace: e.currentTarget.value })
            }} />
          </FormItem>
          <FormItem
            name='taskPriority'
            label='任务级别'
            rules={[{ required: false, message: '请输入任务级别！' }]}
          >
            <Input placeholder='请输入' onChange={(e) => {
              updateProperties({ taskPriority: e.currentTarget.value })
            }} />
          </FormItem>
          <FormItem
            name='jobPriority'
            label='工作级别'
            rules={[{ required: false, message: '请输入工作级别！' }]}
          >
            <Input placeholder='请输入' onChange={(e) => {
              updateProperties({ jobPriority: e.currentTarget.value })
            }} />
          </FormItem>
          <FormItem
            name='historyTimeToLive'
            label='保留时间'
            rules={[{ required: false, message: '请输入保留时间！' }]}
          >
            <Input placeholder='请输入' onChange={(e) => {
              updateProperties({ historyTimeToLive: e.currentTarget.value })
            }} />
          </FormItem>
          <FormItem
            name='description'
            label='流程描述'
            rules={[{ required: false, message: '请输入描述！' }]}
          >
            <TextArea rows={3} placeholder='请输入' onChange={e => {
              updateDocumentation(e.currentTarget.value)
            }} />
          </FormItem>
        </div> : null}
      </>
    )
  }
  // 处理人设置
  const userTaskContent = () => {
    return (
      <>
        <FormItem
          name='assigneeType'
          label='处理人'
          rules={[{ required: false, message: '请选择处理人！' }]}
        >
          <Radio.Group onChange={handleChangeAssignee}>
            <Radio value={1}>指定用户</Radio>
            <Radio value={2}>流程发起人</Radio>
          </Radio.Group>
        </FormItem>
        {userTask.assigneeType === 1 ? <FormItem
          name='assigneeName'
          label='处理人'
          rules={[{ required: false, message: '请选择处理人！' }]}
        >
          <Input placeholder='请选择'
            readOnly
            onChange={(e) => {
              changeField(e.currentTarget.value, 'assigneeName')
            }}
            addonAfter={<PlusOutlined onClick={() => { selectAgent(1, 'assignee') }} />}
          />
        </FormItem> : null}
        <FormItem
          name='candidateUsersName'
          label='处理人组'
          rules={[{ required: false, message: '请选择处理人组！' }]}
        >
          <Input placeholder='请选择'
            readOnly
            onChange={(e) => {
              changeField(e.currentTarget.value, 'candidateUsersName')
            }}
            addonAfter={<PlusOutlined onClick={() => { selectAgent(100, 'candidateUsersName') }} />}
          />
        </FormItem>
        <FormItem
          name='candidateGroups'
          label='处理角色'
          rules={[{ required: false, message: '请选择处理角色！' }]}
        >
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='请选择'
            onChange={(values) => {
              changeField(values, 'candidateGroups', 1)
            }}
          >
            {roleOptions.map(item => {
              return <Option key={item.id}>{item.name}</Option>
            })}
          </Select>
        </FormItem>
      </>
    )
  }

  useEffect(() => {
    if (modeler) initFn()
  }, [modeler])
  useEffect(() => {
    const { id, name } = form
    if (name) changeModelerObj(state => ({ ...state, name }))
    if (id) changeModelerObj(state => ({ ...state, id }))
    // console.log(form, 'form')
  }, [form.id, form.name])

  useEffect(() => {
    getUserList()
  }, [])

  useEffect(() => {
    if (element) {
      const myType = element?.type
      setIsUserTask(myType === 'bpmn:UserTask')
      setIsServiceTask(myType === 'bpmn:ServiceTask')
      setIsStart(myType === 'bpmn:StartEvent')
      setSequenceFlow(myType === 'bpmn:SequenceFlow')
      setIsGateway(myType.includes('Gateway'))
      setIsTask(myType.includes('Task'))
      setIsEvent(myType.includes('Event'))
      setIsExclusiveSequenceFlow(
        element?.businessObject?.sourceRef?.$type === 'bpmn:ExclusiveGateway',
      )
    }
  }, [element])
  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header='基本设置' key='1'>
          <Form
            {...formLayout}
            form={baseForm}
            initialValues={{ ...form }}
          >
            {renderContent()}
          </Form>
        </Panel>
        {isUserTask ? <Panel header='处理人设置' key='2'>
          <Form
            {...formLayout}
            form={userForm}
            initialValues={{ ...userTask }}
          >
            {userTaskContent()}
          </Form>
        </Panel> : null}
        {(isStart || isTask) ? <Panel header='表单设置' key='3'>
          <p>{isUserTask} {isStart} {isTask}</p>
        </Panel> : null}
        {isUserTask ? <Panel header='按钮设置' key='4'>
          <p>3</p>
        </Panel> : null}
        {isUserTask ? <Panel header='多实例设置' key='5'>
          <p>3</p>
        </Panel> : null}
        {isExclusiveSequenceFlow ? <Panel header='流转条件' key='9'>
          <p>3</p>
        </Panel> : null}
        {!isGateway ? <Panel header='执行监听' key='6'>
          <p>执行监听</p>
        </Panel> : null}
        {!isGateway && rootElement ? <Panel header='权限设置' key='7'>
          <p>3</p>
        </Panel> : null}
        {isUserTask ? <Panel header='任务监听' key='8'>
          <p>3</p>
        </Panel> : null}
      </Collapse>
      <Contact
        userModalVisible={userModalVisible}
        values={contactValues}
        setCandidateUsers={setCandidateUsers}
        setAssignee={setAssignee}
        onCancel={() => {
          setUserModalVisible(false)
        }}
      />
    </div>
  )
}

export default TableList
