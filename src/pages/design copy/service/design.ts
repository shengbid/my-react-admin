import request from '@/commons/request'

export function getAllDept() {
  return request({
    url: '/getAll/dept',
    method: 'get'
  })
}

export function getAllList(params: any) {
  return request({
    url: '/getAll/list',
    method: 'get',
    params,
  })
}

export function getAllRoleList() {
  return request({
    url: '/getAll/role/list',
    method: 'get'
  })
}

export function getUserById(data: any) {
  return request({
    url: '/get/user/id',
    method: 'post',
    data,
  })
}

export function deployBpmnByString() {
  return request({
    url: '/deploy/BpmnBy/String',
    method: 'post'
  })
}
