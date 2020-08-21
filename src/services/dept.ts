import request from '@/commons/request'

export function getDeptList() {
  return request({
    url: '/getList/dept',
    method: 'get'
  })
}
