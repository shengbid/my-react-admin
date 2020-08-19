import request from '@/commons/request'

export function getFiles() {
  return request({
    url: '/getList/file',
    method: 'get'
  })
}

export function uploadFile(data: any) {
  return request({
    url: '/upload/file',
    data,
    method: 'post'
  })
}
