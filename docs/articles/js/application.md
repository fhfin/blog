# 应用

## 数组去重

### ES6 Set去重

```javascript
function uniqe(arr){
    return Array.from(new Set(arr))
}

var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
 //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
```

这种方法无法去掉{}空对象

### 利用for嵌套for，然后splice去重

```javascript
function unique(arr){            
        for(let i=0; i<arr.length; i++){
            for(let j=i+1; j<arr.length; j++){
                if(arr[i]==arr[j]){         //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j,1);
                    j--;
                }
            }
        }
return arr;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
    console.log(unique(arr))
    //[1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {}, {}]   
    //NaN和{}没有去重，两个null直接消失了
```

双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。

### 利用indexOf去重

```javascript
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array .indexOf(arr[i]) === -1) {  
            //或者includes，判断array.includes(arr[i]),返回true或false
            array .push(arr[i])
        }
    }
    return array;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
   // [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}]      //NaN、{}没有去重
```

新建一个空的结果数组，for 循环原数组，判断结果数组是否存在当前元素，如果有相同的值则跳过，不相同则push进数组。

## 防抖和节流的原理和使用场景

函数防抖和函数节流：优化高频率执行js代码的一种手段，js中的一些事件如浏览器的resize、scroll，鼠标的mousemove、mouseover，input输入框的keypress等事件在触发时，会不断地调用绑定在事件上的回调函数，极大地浪费资源，降低前端性能。为了优化体验，需要对这类事件进行调用次数的限制。

**防抖：**

在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

```javascript
function debounce(fn, delay) {
    var timer; // 维护一个 timer
    return function () {
        var _this = this; // 取debounce执行作用域的this
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fn.apply(_this, args); // 用apply指向调用debounce的对象，相当于_this.fn(args);
        }, delay);
    };
}
```

**节流：**

每隔一段时间，只执行一次函数。

```javascript
function throttle(fn, delay) {
    var timer;
    return function () {
        var _this = this;
        var args = arguments;
        if (timer) {
            return;
        }
        timer = setTimeout(function () {
            fn.apply(_this, args);
            timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
        }, delay)
    }
}
```

相同点：

- 都可以通过使用 setTimeout 实现。
- 目的都是，降低回调执行频率。节省计算资源。

不同点：

- 函数防抖，在一段连续操作结束后，处理回调，**利用clearTimeout 和 setTimeout实现**。函数节流，在一段连续操作中，**每一段时间只执行一次**，频率较高的事件中使用来提高性能。
- 函数防抖关注一定时间连续触发的事件只在最后执行一次，而函数节流侧重于一段时间内只执行一次。

常见应用场景

**函数防抖的应用场景:**

连续的事件，只需触发一次回调的场景有：

- 搜索框搜索输入。只需用户最后一次输入完，再发送请求
- 手机号、邮箱验证输入检测
- 窗口大小Resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。

**函数节流的应用场景:**

间隔一段时间执行一次回调的场景有：

- 滚动加载，加载更多或滚到底部监听
- 谷歌搜索框，搜索联想功能
- 高频点击提交，表单重复提交

## 浅拷贝、深拷贝

浅拷贝和深拷贝都只针对于引用数据类型，浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存；但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象；

区别：浅拷贝只复制对象的第一层属性、深拷贝可以对对象的属性进行递归复制；

### 实现浅拷贝的方法

1. Object.assign方法

   ```javascript
   var obj = {
       a:1,
       b:2
   }
   var obj1 = Object.assign({},obj)
   obj1.a = 3
   console.log(obj.a)  // 3
   ```

2. 扩展运算符...

   ```javascript
   const source = {
     name: 'nordon',
     info: {
       age: 18
     }
   };
   const obj = {...source};
   
   Object.assign(obj, source);
   source.info.age = 20;
   console.log(obj);
   console.log(source);
   ```

3. Array.prototype.concat

   ```javascript
   const arr = [1, 2, {name: 'nordon'}];
   const newArr = arr.concat();
   newArr[2].name = 'wy';
   console.log(arr); 
   console.log(newArr);
   ```

### 实现深拷贝的方法

1. 采用递归去拷贝所有层级属性

   ```javascript
   function deepClone(obj){
       let objClone = Array.isArray(obj)?[]:{};
       if(obj && typeof obj==="object"){
           for(key in obj){
               if(obj.hasOwnProperty(key)){
                   //判断ojb子元素是否为对象，如果是，递归复制
                   if(obj[key]&&typeof obj[key] ==="object"){
                       objClone[key] = deepClone(obj[key]);
                   }else{
                       //如果不是，简单复制
                       objClone[key] = obj[key];
                   }
               }
           }
       }
       return objClone;
   }    
   let a=[1,2,3,4],
       b=deepClone(a);
   a[0]=2;
   console.log(a,b);
   ```

2. 使用JSON.stringify和JSON.parse实现深拷贝：JSON.stringify把对象转成字符串，再用JSON.parse把字符串转成新的对象；

   ```javascript
   function deepCopy(obj1){
       let _obj = JSON.stringify(obj1);
       let obj2 = JSON.parse(_obj);
       return obj2;
     }
       var a = [1, [1, 2], 3, 4];
       var b = deepCopy(a);
       b[1][0] = 2;
       alert(a); // 1,1,2,3,4
       alert(b); // 2,2,2,3,4
   ```

3. 热门的函数库lodash，也有提供_.cloneDeep用来做深拷贝；

   ```javascript
   var _ = require('lodash');
   var obj1 = {
       a: 1,
       b: { f: { g: 1 } },
       c: [1, 2, 3]
   };
   var obj2 = _.cloneDeep(obj1);
   console.log(obj1.b.f === obj2.b.f);
   // false
   ```

## 闭包

闭包：

一个函数和对其周围状态（**lexical environment，词法环境**）的引用捆绑在一起（或者说函数被引用包围）， 这样的组合就是**闭包**（**closure**）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

闭包的特点：

让外部访问函数内部变量成为可能；
可以避免使用全局变量，防止全局变量污染；
可以让局部变量常驻在内存中；
会造成内存泄漏（有一块内存空间被长期占用，而不被释放）
