const test = () => {
  // const promise1 = new Promise((resolve, reject) => {
  //   console.log('promise1')
  // })
  // console.log('1', promise1)

  // const promise = new Promise((resolve, reject) => {
  //   console.log(1);
  //   resolve('success')
  //   console.log(2);
  // });
  // promise.then(() => {
  //   console.log(3);
  // });
  // console.log(4)

  // const promise = new Promise((resolve, reject) => {
  //   console.log(1);
  //   console.log(2);
  // });
  // promise.then(() => {
  //   console.log(3);
  // });
  // console.log(4)

  // const promise1 = new Promise((resolve, reject) => {
  //   console.log('promise1')
  //   resolve('resolve1')
  // })
  // const promise2 = promise1.then(res => {
  //   console.log(res)
  // })
  // console.log('1', promise1);
  // console.log('2', promise2);

  // const fn = () => (new Promise((resolve, reject) => {
  //   console.log(1);
  //   resolve('success')
  // }))
  // fn().then(res => {
  //   console.log(res)
  // })
  // console.log('start')

  // console.log('start')
  // setTimeout(() => {
  //   console.log('time')
  // })
  // Promise.resolve().then(() => {
  //   console.log('resolve')
  // })
  // console.log('end')

  // const promise = new Promise((resolve, reject) => {
  //   console.log(1);
  //   setTimeout(() => {
  //     console.log("timerStart");
  //     resolve("success");
  //     console.log("timerEnd");
  //   }, 0);
  //   console.log(2);
  // });
  // promise.then((res) => {
  //   console.log(res);
  // });
  // console.log(4);

  // setTimeout(() => {
  //   console.log('timer1');
  //   setTimeout(() => {
  //     console.log('timer3')
  //   }, 0)
  // }, 0)
  // setTimeout(() => {
  //   console.log('timer2')
  // }, 0)
  // console.log('start')

  // setTimeout(() => {
  //   console.log('timer1');
  //   Promise.resolve().then(() => {
  //     console.log('promise')
  //   })
  // }, 0)
  // setTimeout(() => {
  //   console.log('timer2')
  // }, 0)
  // console.log('start')

  // Promise.resolve().then(() => {
  //   console.log('promise1');
  //   const timer2 = setTimeout(() => {
  //     console.log('timer2')
  //   }, 0)
  // });
  // const timer1 = setTimeout(() => {
  //   console.log('timer1')
  //   Promise.resolve().then(() => {
  //     console.log('promise2')
  //   })
  // }, 0)
  // console.log('start');

  // const promise1 = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve('success')
  //   }, 2000)
  // })
  // const promise2 = promise1.then(() => {
  //   throw new Error('error!!!')
  // })
  // console.log('promise1', promise1)
  // console.log('promise2', promise2)
  // setTimeout(() => {
  //   console.log('promise1', promise1)
  //   console.log('promise2', promise2)
  // }, 1000)

  // promise状态一经改变就不能再改变
  // const promise = new Promise((resolve, reject) => {
  //   resolve("success1");
  //   reject("error");
  //   resolve("success2");
  // });
  // promise
  // .then(res => {
  //     console.log("then: ", res);
  //   }).catch(err => {
  //     console.log("catch: ", err);
  //   })

  // catch不管在哪里,都能捕获上层的错误
  // const promise = new Promise((resolve, reject) => {
  //   reject("error");
  //   resolve("success2");
  // });
  // promise
  // .then(res => {
  //     console.log("then: ", res);
  //   }).catch(res => {
  //     console.log("then: ", res);
  //   }).then(err => {
  //     console.log("catch: ", err);
  //   }).then(res => {
  //     console.log("then4: ", res);
  //   })

  // Promise.resolve(1)
  // .then(res => {
  //   console.log(res);
  //   return 2;
  // })
  // .catch(err => {
  //   return 3;
  // })
  // .then(res => {
  //   console.log(res);
  // });

  // const promise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log('timer')
  //     resolve('success')
  //   }, 1000)
  // })
  // const start = Date.now();
  // promise.then(res => {
  //   console.log(res, Date.now() - start)
  // })
  // promise.then(res => {
  //   console.log(res, Date.now() - start)
  // })

  // 返回任意一个非Promise的值都会被包裹成promise对象
  // Promise.resolve().then(() => {
  //     // 抛出错误
  //     // throw new Error('xxxx')
  //     return Promise.reject(new Error('error'))
  //   // return new Error('error!!!')
  // }).then(res => {
  //   console.log("then: ", res)
  // }).catch(err => {
  //   console.log("catch: ", err)
  // })

  // .then或.catch返回的值不能是Promise本身,否则会造成死循环
  // const promise = Promise.resolve().then(() => {
  //   return promise;
  // })
  // promise.catch(console.err)

  // promise .then或.catch期待的值是函数,如果不是函数,会发生值穿透,第一个的值直接传到后一个
  // Promise.resolve(1)
  // .then(() => {
  //   return 2
  // })
  // .then(Promise.resolve(3))
  // .then(console.log)

  // .then的第二个参数和.catch有相同捕获错误,这里会进入error  没有第二个参数,会被catch捕获
  // Promise.reject('err!!!')
  // .then((res) => {
  //   console.log('success', res)
  // }, (err) => {
  //   console.log('error', err)
  // }).catch(err => {
  //   console.log('catch', err)
  // })

  // Promise.resolve()
  // .then(function success (res) {
  //   throw new Error('error!!!')
  // }, function fail1 (err) {
  //   console.log('fail1', err)
  // }).catch(function fail2 (err) {
  //   console.log('fail2', err)
  // })

  // finally不管promise最终的状态是什么都会执行
  // finally不接受任何参数,因此你无法知道promise的状态是resolved还是rejected
  // finally默认返回promise对象,如果抛出的是异常,则返回这个异常

//   Promise.resolve('1')
//   .then(res => {
//     console.log(res)
//   })
//   .finally(() => {
//     console.log('finally')
//   })
// Promise.resolve('2')
//   .finally(() => {
//     console.log('finally2')
//   	return '我是finally2返回的值'
//   })
//   .then(res => {
//     console.log('finally2后面的then函数', res)
//   })

// Promise.resolve('1')
//   .finally(() => {
//     console.log('finally1')
//     throw new Error('我是finally中抛出的异常')
//   })
//   .then(res => {
//     console.log('finally后面的then函数', res)
//   })
//   .catch(err => {
//     console.log('捕获错误', err)
//   })

// 链式调用的内容需要等前一个调用执行完成才会执行,这里会等.then()执行后再执行.finally()
// function promise1 () {
//   let p = new Promise((resolve) => {
//     console.log('promise1');
//     resolve('1')
//   })
//   return p;
// }
// function promise2 () {
//   return new Promise((resolve, reject) => {
//     reject('error')
//   })
// }
// promise1()
//   .then(res => console.log(res))
//   .catch(err => console.log(err))
//   .finally(() => console.log('finally1'))

// promise2()
//   .then(res => console.log(res))
//   .catch(err => console.log(err))
//   .finally(() => console.log('finally2'))

// function runAsync (x) {
// 	const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
// 	return p
// }
// runAsync(3)
  
// function runAsync (x) {
// 	const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
// 	return p
// }
// Promise.all([runAsync(1), runAsync(2), runAsync(3)])
//   .then(res => console.log(res))

// function runAsync (x) {
//   const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
//   return p
// }
// function runReject (x) {
//   const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x))
//   return p
// }
// Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

// function runAsync (x) {
//   const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
//   return p
// }
// Promise.race([runAsync(1), runAsync(2), runAsync(3)])
//   .then(res => console.log('result: ', res))
//   .catch(err => console.log(err))

  // function runAsync(x) {
  //   const p = new Promise(r =>
  //     setTimeout(() => r(x, console.log(x)), 1000)
  //   );
  //   return p;
  // }
  // function runReject(x) {
  //   const p = new Promise((res, rej) =>
  //     setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  //   );
  //   return p;
  // }
  // Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
  //   .then(res => console.log("result: ", res))
  //   .catch(err => console.log(err));

  // async function async1() {
  //   console.log("async1 start");
  //   await async2();
  //   console.log("async1 end");
  // }
  // async function async2() {
  //   console.log("async2");
  // }
  // async1();
  // console.log('start')

  // async function async1() {
  //   console.log("async1 start");
  //   new Promise(resolve => {
  //     console.log('promise')
  //   })
  //   console.log("async1 end");
  // }
  // async1();
  // console.log("start")

  // async function async1() {
  //   console.log("async1 start");
  //   await async2();
  //   console.log("async1 end");
  //   setTimeout(() => {
  //     console.log('timer1')
  //   }, 0)
  // }
  // async function async2() {
  //   setTimeout(() => {
  //     console.log('timer2')
  //   }, 0)
  //   console.log("async2");
  // }
  // async1();
  // setTimeout(() => {
  //   console.log('timer3')
  // }, 0)
  // console.log("start")

  // async function async1 () {
  //   console.log('async1 start');
  //   await new Promise(resolve => {
  //     console.log('promise1')
  //     resolve(1)
  //   })
  //   console.log('async1 success');
  //   return 'async1 end'
  // }
  // console.log('srcipt start')
  // async1().then(res => console.log(res))
  // console.log('srcipt end')

  // async function async1 () {
  //   console.log('async1 start'); //1
  //   await new Promise(resolve => {
  //     console.log('promise1') // 3
  //     resolve('promise1 resolve')
  //   }).then(res => console.log(33, res)) // 5
  //   console.log('async1 success'); // 6
  //   return 'async1 end'
  // }
  // console.log('srcipt start')  // 2
  // async1().then(res => console.log(12, res)) // 7
  // console.log('srcipt end') // 4

  // async function async1 () {
  //   console.log('async1 start');
  //   await new Promise(resolve => {
  //     console.log('promise1')
  //     resolve('promise resolve')
  //   })
  //   console.log('async1 success');
  //   return 'async1 end'
  // }
  // console.log('srcipt start')
  // async1().then(res => {
  //   console.log(res)
  // })
  // new Promise(resolve => {
  //   console.log('promise2')
  //   setTimeout(() => {
  //     console.log('timer')
  //   })
  // })

  // async function async1() {
  //   console.log("async1 start");  // 2
  //   await async2();
  //   console.log("async1 end"); // 6
  // }
  
  // async function async2() {
  //   console.log("async2"); // 3
  // }
  
  // console.log("script start"); // 1
  
  // setTimeout(function() {
  //   console.log("setTimeout");  // 8
  // }, 0);
  
  // async1();
  
  // new Promise(function(resolve) {
  //   console.log("promise1"); // 4
  //   resolve();
  // }).then(function() {
  //   console.log("promise2"); // 7
  // });
  // console.log('script end')  // 5

  // async function testSometing() {
  //   console.log("执行testSometing");
  //   return "testSometing";
  // }
  
  // async function testAsync() {
  //   console.log("执行testAsync");
  //   return Promise.resolve("hello async");
  // }
  
  // async function test() {
  //   console.log("test start...");
  //   const v1 = await testSometing();
  //   console.log(v1);
  //   const v2 = await testAsync();
  //   console.log(v2);
  //   console.log(v1, v2);
  // }
  
  // test();
  
  // var promise = new Promise(resolve => {
  //   console.log("promise start...");
  //   resolve("promise");
  // });
  // promise.then(val => console.log(val));
  
  // console.log("test end...");

  // async function async1 () {
  //   await async2();
  //   console.log('async1');
  //   return 'async1 success'
  // }
  // async function async2 () {
  //   // return new Promise((resolve, reject) => {
  //   //   console.log('async2')
  //   //   reject('error')
  //   // })
  //   console.log('async2')
  // }
  // async1().then(res => console.log(res))

  // async function async1 () {
  //   // try {
  //   //   await Promise.reject('error!!!')
  //   // } catch(e) {
  //   //   console.log(e)
  //   // }
  //   await Promise.reject('error!!!')
  //     .catch(e => console.log(e))
  //   console.log('async1');
  //   return Promise.resolve('async1 success')
  // }
  // async1().then(res => console.log(res))
  // console.log('script start')

//   const first = () => (new Promise((resolve, reject) => {
//     console.log(3);
//     let p = new Promise((resolve, reject) => {
//         console.log(7);
//         setTimeout(() => {
//             console.log(5);
//             resolve(6);
//           	console.log(p)
//         }, 0)
//         resolve(1);
//     });
//     resolve(2);
//     p.then((arg) => {
//         console.log(arg);
//     });

// }));

// first().then((arg) => {
//     console.log(arg);
// });
// console.log(4);

// const async1 = async () => {
//   console.log('async1');
//   setTimeout(() => {
//     console.log('timer1')
//   }, 2000)
//   await new Promise(resolve => {
//     console.log('promise1')
//   })
//   console.log('async1 end')
//   return 'async1 success'
// }
// console.log('script start');

// async1().then(res => console.log(res));

// console.log('script end');

// Promise.resolve(1)
//   .then(2)
//   .then(Promise.resolve(3))
//   .catch(4)
//   .then(res => console.log(res))

// setTimeout(() => {
//   console.log('timer2')
// }, 1000)

// .finally没有参数  p1没有return值
// const p1 = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve('resolve3');
//     console.log('timer1')
//   }, 0)
//   resolve('resovle1');
//   resolve('resolve2');
// }).then(res => {
//   console.log(res)
//   setTimeout(() => {
//     console.log(p1)
//   }, 1000)
// }).finally(res => {
//   console.log('finally', res)
// })

// 使用Promise实现每隔1秒输出1,2,3
// const arr = [1, 2, 3]
// arr.reduce((p, x) => {
//   return p.then(() => {
//     return new Promise(r => {
//       setTimeout(() => r(console.log(x)), 1000)
//     })
//   })
// }, Promise.resolve())


// 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次
// function red() {
//   console.log("red");
// }
// function green() {
//   console.log("green");
// }
// function yellow() {
//   console.log("yellow");
// }
// const light = function (timer, cb) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       cb()
//       resolve()
//     }, timer)
//   })
// }
// const step = function () {
//   Promise.resolve().then(() => {
//     return light(3000, red)
//   }).then(() => {
//     return light(2000, yellow)
//   }).then(() => {
//     return light(1000, green)
//   }).then(() => {
//     return step()
//   })
// }

// step();

// 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。
const time = (timer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () => time(2000).then(() => {
  console.log(1);
  return 1
})
const ajax2 = () => time(1000).then(() => {
  console.log(2);
  return 2
})
const ajax3 = () => time(1000).then(() => {
  console.log(3);
  return 3
})

function mergePromise (ajaxArray) {
  // 在这里写代码
  const data = []
  let promise = Promise.resolve()
  ajaxArray.forEach(ajax => {
    // 第一次的then是为了调用ajax
    // 第二次的then是为了获取ajax的结果
    promise = promise.then(ajax).then(res => {
      data.push(res)
      return data
    })
  })
  // 最后得到的promise的值就是data
  return promise
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

// 封装一个异步加载图片的方法
// var urls = [
//   "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
//   "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
//   "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
//   "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
//   "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
//   "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
//   "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
//   "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png",
// ]
// function loadImg(url) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = function() {
//       console.log("一张图片加载完成");
//       resolve(img);
//     };
//     img.onerror = function() {
//     	reject(new Error('Could not load image at' + url));
//     };
//     img.src = url;
//   });
// }

// // 限制异步操作的并发个数并尽可能快的完成全部,但有一个要求，任何时刻同时下载的链接数量不可以超过3个
// function limitLoad(urls, handler, limit) {
//   let sequence = [].concat(urls); // 复制urls
//   // 这一步是为了初始化 promises 这个"容器"
//   let promises = sequence.splice(0, limit).map((url, index) => {
//     return handler(url).then(() => {
//       // 返回下标是为了知道数组中是哪一项最先完成
//       return index;
//     });
//   });
//   // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
//   return sequence
//     .reduce((pCollect, url) => {
//       return pCollect
//         .then(() => {
//           return Promise.race(promises); // 返回已经完成的下标
//         })
//         .then(fastestIndex => { // 获取到已经完成的下标
//         	// 将"容器"内已经完成的那一项替换
//           promises[fastestIndex] = handler(url).then(
//             () => {
//               return fastestIndex; // 要继续将这个下标返回，以便下一次变量
//             }
//           )
//         })
//         .catch(err => {
//           console.error(err);
//         });
//     }, Promise.resolve()) // 初始化传入
//     .then(() => { // 最后三个用.all来调用
//       return Promise.all(promises);
//     });
// }
// limitLoad(urls, loadImg, 3)
//   .then(res => {
//     console.log("图片全部加载完毕");
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err);
//   });

    
}

export default test