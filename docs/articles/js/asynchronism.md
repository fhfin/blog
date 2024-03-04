# 异步相关

## 同步和异步

同步

- 指在 **主线程**上排队执行的任务，只有前一个任务执行完毕，才能继续执行下一个任务。
- 也就是调用一旦开始，必须这个调用 **返回结果**(划重点——）才能继续往后执行。程序的执行顺序和任务排列顺序是一致的。

异步

- 异步任务是指不进入主线程，而进入 **任务队列**的任务，只有任务队列通知主线程，某个异步任务可以执行了，该任务才会进入主线程。
- 每一个任务有一个或多个 **回调函数**。前一个任务结束后，不是执行后一个任务,而是执行回调函数，后一个任务则是不等前一个任务结束就执行。
- 程序的执行顺序和任务的排列顺序是**不一致**的，异步的。
- 我们常用的setTimeout和setInterval函数，Ajax都是异步操作。

## Promise

Promise本意是承诺，在程序中的意思就是承诺我过一段时间后会给你一个结果。 什么时候会用到过一段时间？答案是异步操作，异步是指可能比较长时间才有结果的才做，例如网络请求、读取本地文件等

### Promise的三种状态

- Pending----Promise对象实例创建时候的初始状态
- Fulfilled----可以理解为成功的状态
- Rejected----可以理解为失败的状态

**这个承诺一旦从等待状态变成为其他状态就永远不能更改状态了**，比如说一旦状态变为 resolved 后，就不能 再次改变为Fulfilled

```javascript
let p = new Promise((resolve, reject) => {
  reject('reject')
  resolve('success')//无效代码不会执行
})
p.then(
  value => {
    console.log(value)
  },
  reason => {
    console.log(reason)//reject
  }
)
```

当我们在构造 Promise 的时候，构造函数内部的代码是立即执行的

```javascript
new Promise((resolve, reject) => {
  console.log('new Promise')
  resolve('success')
})
console.log('end')
// new Promise => end
```

### Promise的链式调用

- 每次调用返回的都是一个新的Promise实例(这就是then可用链式调用的原因)
- 如果then中返回的是一个结果的话会把这个结果传递下一次then中的成功回调
- 如果then中出现异常,会走下一个then的失败回调
- 在 then中使用了return，那么 return 的值会被Promise.resolve() 包装(见例1，2)
- then中可以不传递参数，如果不传递会透到下一个then中(见例3)
- catch 会捕获到没有捕获的异常

```javascript
// 例1
Promise.resolve(1)
.then(res => {
  console.log(res)
  return 2 //包装成 Promise.resolve(2)
})
.catch(err => 3)
.then(res => console.log(res))
复制代码
// 例2
Promise.resolve(1)
.then(x => x + 1)
.then(x => {
  throw new Error('My Error')
})
.catch(() => 1)
.then(x => x + 1)
.then(x => console.log(x)) //2
.catch(console.error)
复制代码
// 例3
let fs = require('fs')
function read(url) {
return new Promise((resolve, reject) => {
  fs.readFile(url, 'utf8', (err, data) => {
    if (err) reject(err)
    resolve(data)
  })
})
}
read('./name.txt')
.then(function(data) {
  throw new Error() //then中出现异常,会走下一个then的失败回调
}) //由于下一个then没有失败回调，就会继续往下找，如果都没有，就会被catch捕获到
.then(function(data) {
  console.log('data')
})
.then()
.then(null, function(err) {
  console.log('then', err)// then error
})
.catch(function(err) {
  console.log('error')
})
```
