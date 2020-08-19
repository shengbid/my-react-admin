import Mock from 'mockjs'

import file from './file'

const mocks = [
  ...file
]

for (const i of mocks) {
  Mock.mock(i.url, i.type, i.response)
}
