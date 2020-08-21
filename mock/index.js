import Mock from 'mockjs'

import file from './file'
import role from './role'

const mocks = [
  ...file,
  ...role
]

for (const i of mocks) {
  Mock.mock(i.url, i.type, i.response)
}
