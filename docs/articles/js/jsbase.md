# js基础

## instanceof原理，手动实现

```javascript
let person = function () {
}
let no = new person()
no instanceof person //true
```

原理：

```javascript
function new_instace_of（leftValue，rightValue）{
    let rightProto = rightValue.prototype  //取右表达式的prototype值
    leftValue = leftValue.__proto__   //取左表达式的__proto__值
    while(true){
        if(leftValue === null){
            return false
        }
        if(leftValue === rightProto){
            return true
        }
        leftValue = leftValue.__proto__
    }
}
```

其实 instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。

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

### 数组和伪数组

数组是一个特殊对象，与常规对象的区别：

- 当有新元素添加到列表中时，自动更新length属性
- 设置length属性，可以截断数组
- 从Array.prototype中继承了方法
- 属性为‘Array’

伪数组是一个拥有length属性，并且属性为非负整数的普通对象，伪数组不能直接调用数组方法

伪数组转换为数组

转换方法：

- 使用Array.from()
- 使用Array.prototype.slice.call()
- 使用Array.prototype.forEach()进行属性遍历并组成新的数组

### 手写发布订阅

```javascript
//发布订阅中心，on订阅，off取消订阅，emit发布，内部需要一个单独事件中心caches进行存储
interface CacheProps {
    [key:string]:Array<((data?:unknown)=>void)>
}
class Oberver{
    private caches:CacheProps = {}  //事件中心
  on(eventName:string,fn:(data?:unknown)=>void){ // eventName事件名独一无二，fn订阅后执行的自定义行为
        this.caches[eventName] = this.caches[eventName] || []
        this.cahces[eventName].push(fn)
    }
  emit(eventName:string,data?:unknown){// 发布 => 将订阅的事件进行统一执行
        if(this.caches[eventName]){
            this.caches[eventName].forEach((fn:(data?:unknown)=>void)=>fn(data))
        }
    }
  off(eventName:string,f?:(data?:unknown)=>void){// 取消订阅 => 若fn不传, 直接取消该事件所有订阅信息
        if(this.caches[eventName]){
            const newCaches = fn ? this.caches[eventName].filter(e => e != fn) : []
            this.caches[eventName] = newCaches
        }
    }
}
```

## Set、Map、WeakSet和WeakMap的区别

Set：

1. 成员不能重复
2. 只有键值，没有键名，有点类似数组
3. 可以遍历，方法有add、delete、has

WeakSet：

1. 成员都是对象
2. 成员都是弱引用，随时可以消失。可以用来保存Dom节点
3. 不能遍历，方法有add、delete、has

Map

1. 本质上是键值对的集合，类似集合
2. 可以遍历，方法很多，可以跟各种数据格式转换

WeakMap

1. 只接受对象为键名（null除外）,不接受其他类型的值作为键名
2. 键名指向的对象，不计入垃圾回收机制
3. 不能遍历，方法有get、set、has、delete

## js中内存泄漏的情况

1. 意外的全局遍历
2. 闭包
3. 未被清空的定时器
4. 未被销毁的事件监听
5. DOM引用

## json和xml数据的区别

1. 数据体积方面：xml是重量级的，json是轻量级的，传递的速度更快些
2. 数据传输方面：xml在传输过程中比较占宽带，json占宽带少，易于压缩
3. 数据交互方面：json与JavaScript的交互更加方便，更容易解析处理，更好的进行数据交互
4. 数据描述方面：json对数据的描述性比xml较差
5. xml和json都用于项目交互下，xml多用于做配置文件，json用于数据交互

## Math.min() 为什么大于Math.max()

- Math.min 的参数是 0 个或者多个，如果多个参数很容易理解，返回参数中最小的。如果没有参数，则返回 Infinity，无穷大。
- 而 Math.max 没有传递参数时返回的是-Infinity.所以输出 false
