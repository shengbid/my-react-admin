import Mock from 'mockjs'

const Random = Mock.Random

export default [
  {
    url: '/upload/file',
    type: 'post',
    response: config => {

      return {
        code: 200,
        data: {
          name: 'file',
          url: Random.image('200x100', '#50B347', '#FFF', 'Mfile')
        }
      }
    }
  },
  {
    url: '/getList/file',
    type: 'get',
    response: () => {

      let fileList = []
      for (let i = 0; i < 6; i++) {
        let file = {}
        file.uid = Random.id()
        file.name = Random.title(3, 5)
        file.url = Random.image('200x100', '#50B347', '#FFF', Random.title(1))
        fileList.push(file)
      }
      return {
        code: 200,
        data: {
          fileList
        }
      }
    }
  }
]