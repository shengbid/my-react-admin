
const isFunction = (type) => typeof type === 'function'

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor (handle) {
    if (!isFunction(handle)) {
      return new Error('MyPromise required funtion parameter')
    }

    // 添加状态
    this._status = PENDING
    this._value = undefined

    // 添加成功回调函数队列
    this._fulfilledQueues = []
    // 添加失败回调函数队列
    this._rejectedQueues = []

    // 执行handle
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }

  }
  // 添加resolve执行的函数
  _resolve (val) {
    if (this._status !== PENDING) return

    const run = () => {
      this._status = FULFILLED
      // 依次执行成功队列中的函数,并清空队列
      const runFulfilled = (value) => {
        let cb = this._fulfilledQueues.shift()
        while (cb) {
          cb(value)
        }
      }
      // 依次执行失败队列中的函数,并清空队列
      const runRejected = (error) => {
        let cb = this._rejectedQueues.shift()
        while (cb) {
          cb(error)
        }
      }
      // 如果resolve的参数为Promise对象,则必须等待该Promise对象状态改变后,
      // 当前Promise的状态才会改变,且状态取决于参数Promise对象的状态
      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value
          runFulfilled(value)
        }, err => {
          this._value = err
          runRejected(err)
        })
      } else {
        this._value = val
        runFulfilled(val)
      }

    }
    setTimeout(() => {
      run()
    }, 0);
  }

  // 添加reject执行的函数
  _reject (val) {
    if (this._status !== PENDING) return
    const run = () => {
      this._status = REJECTED
      this._value = val
      let cb = this._rejectedQueues.shift()
      while (cb) {
        cb(val)
      }
    }

    setTimeout(run, 0);
  }

  // 添加then方法
  then (onFulfilled, onRejected) {
    const { _value, _status } = this
    // 返回一个新promise对象
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功执行的函数
      let fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            let res = onFulfilled(value)
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(res)
            }
          }
        } catch (error) {
          onRejectedNext(error)
        }
      }
      // 封装一个失败执行的函数
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
            let res = onRejected(error)
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onRejectedNext(res)
            }
          }
        } catch (error) {
          onRejectedNext(error)
        }
      }

      switch (_status) {
        case PENDING:
          this._fulfilledQueues.push(onFulfilled)
          this._rejectedQueues.push(onRejected)
          break
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break;
        default:
          break
      }
    })
  }
  // 添加catch方法
  catch (onRejected) {
    return this.then(undefined, onRejected)
  }
  // 添加静态resolve方法
  static resolve (value) {
    if (value instanceof  MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
  // 添加静态reject方法
  static reject (value) {
    return new MyPromise((resolve, reject) => reject(value))
  }
  // 添加静态all方法
  static all (list) {
    return new MyPromise((resolve, reject) => {
      let values = []
      let count = 0
      for (let [i, p] of list.entries()) {
        this.resolve(p).then(res => {
          values[i] = res
          count++
          // 所有状态都变成fulfilled时返回Promise
          if (count === list.length) {
            resolve(values)
          }
        }, err => {
          // 有一个被reject时promise状态变为rejected
          reject(err)
        })
        
      }
    })
  }
  // 添加静态race方法
  static race (list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态,新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }
  finally (cb) {
    return this.then(
      value => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    )
  }
}

export default MyPromise